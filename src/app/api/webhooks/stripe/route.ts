import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendAccountAccessEmail } from '@/lib/email'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Helper function to create or update customer account
async function createOrUpdateCustomerAccount(
  email: string,
  name: string | null,
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  subscription: Stripe.Subscription
) {
  console.log('👤 Creating/updating customer account for:', email)

  // Check if user already exists in Supabase Auth
  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
  let user = existingUsers?.users.find(u => u.email === email)

  // Create user if doesn't exist
  if (!user) {
    console.log('👤 Creating new user account')
    const { data: newUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {
        name: name || '',
      },
    })

    if (authError) {
      console.error('❌ Auth error:', authError)
      throw authError
    }

    user = newUser.user
    console.log('✅ User created:', user.id)
  } else {
    console.log('✅ Existing user found:', user.id)
  }

  // Create or update customer record
  const { error: customerError } = await supabaseAdmin
    .from('customers')
    .upsert({
      id: user.id,
      email,
      name: name || null,
      stripe_customer_id: stripeCustomerId,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'id',
    })

  if (customerError) {
    console.error('❌ Customer error:', customerError)
    throw customerError
  }

  console.log('✅ Customer record created/updated')

  // Create or update subscription record
  const { error: subscriptionError } = await supabaseAdmin
    .from('subscriptions')
    .upsert({
      customer_id: user.id,
      stripe_subscription_id: stripeSubscriptionId,
      stripe_price_id: subscription.items.data[0]?.price.id || null,
      status: subscription.status as any,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
      canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
      checks_used: 0,
      checks_limit: 10,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'stripe_subscription_id',
    })

  if (subscriptionError) {
    console.error('❌ Subscription error:', subscriptionError)
    throw subscriptionError
  }

  console.log('✅ Subscription record created/updated')

  // Generate magic link for account access
  console.log('📧 Generating magic link for:', email)
  const { data: linkData, error: magicLinkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/account`,
    },
  })

  if (magicLinkError || !linkData) {
    console.error('❌ Magic link generation error:', magicLinkError)
    throw new Error('Failed to generate magic link')
  }

  console.log('✅ Magic link generated successfully')

  // Send welcome email with magic link
  try {
    const firstPaymentAmount = subscription.items.data[0]?.price.unit_amount
      ? `$${(subscription.items.data[0].price.unit_amount / 100).toFixed(2)}`
      : '$1.00'

    await sendAccountAccessEmail({
      to: email,
      name: name || 'Customer',
      magicLink: linkData.properties.action_link,
      subscriptionAmount: firstPaymentAmount,
    })

    console.log('✅ Welcome email sent to:', email)
  } catch (emailError) {
    console.error('⚠️ Email send error (non-fatal):', emailError)
    // Don't throw - account is created, email is not critical
  }

  return user.id
}

export async function POST(request: NextRequest) {
  console.log('🚀 STRIPE WEBHOOK - Processing payment')
  console.log('🚀 Timestamp:', new Date().toISOString())
  console.log('🚀 Version: WITH-ACCOUNT-CREATION-AND-SIGNATURE-VERIFICATION')

  try {
    const body = await request.text()
    console.log('📦 Body length:', body.length)

    // Verify webhook signature
    const signature = request.headers.get('stripe-signature')
    if (!signature) {
      console.log('❌ No signature header found')
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
      console.log('✅ Webhook signature verified')
      console.log('✅ Event type:', event.type)
      console.log('✅ Event ID:', event.id)
    } catch (e) {
      console.log('❌ Webhook signature verification failed:', e)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      console.log('💳 Processing session:', session.id)
      console.log('💳 Session mode:', session.mode)

      // For subscription mode, metadata is in subscription object
      let metadata = session.metadata || {}

      // Get subscription details if this is a subscription checkout
      let subscription: Stripe.Subscription | null = null
      if (session.mode === 'subscription' && session.subscription) {
        console.log('🔄 Subscription checkout detected, subscription ID:', session.subscription)
        const subscriptionId = typeof session.subscription === 'string'
          ? session.subscription
          : session.subscription.id

        subscription = await stripe.subscriptions.retrieve(subscriptionId, {
          expand: ['items.data.price'],
        })
        console.log('🔄 Subscription retrieved:', subscription.id)
      }

      console.log('🏷️ Metadata:', metadata)

      // Also try to parse client_reference_id (from Payment Links)
      let clientRefData = null
      if (session.client_reference_id) {
        try {
          clientRefData = JSON.parse(session.client_reference_id)
          console.log('🔗 Client Reference Data:', clientRefData)
        } catch (e) {
          console.log('⚠️ Could not parse client_reference_id')
        }
      }

      const customerEmail = session.customer_details?.email || clientRefData?.email || metadata.customerEmail || 'unknown@test.com'
      const customerName = session.customer_details?.name || 'Customer'
      const stripeCustomerId = typeof session.customer === 'string' ? session.customer : session.customer?.id || ''

      // Create or update customer account
      let customerId: string | null = null
      if (subscription && stripeCustomerId) {
        try {
          customerId = await createOrUpdateCustomerAccount(
            customerEmail,
            customerName,
            stripeCustomerId,
            subscription.id,
            subscription
          )
        } catch (error) {
          console.error('⚠️ Failed to create customer account (non-fatal):', error)
        }
      }

      // Use clientRefData if available (Payment Link), otherwise use metadata (API session)
      const vehicleInfo = {
        type: clientRefData?.type || (metadata.vehicleType === 'vin' ? 'vin' : 'rego'),
        vin: clientRefData?.vin || metadata.vehicleVin || undefined,
        rego: clientRefData?.rego || metadata.vehicleRego || 'UNKNOWN',
        state: clientRefData?.state || metadata.vehicleState || 'QLD'
      }

      const reportData = {
        order_id: session.id,
        customer_id: customerId,
        customer_email: customerEmail,
        customer_name: customerName,
        vehicle_identifier: vehicleInfo,
        report_type: metadata.reportType === 'comprehensive' ? 'PREMIUM' : 'STANDARD',
        status: 'pending',
        report_data: {
          stripe_session_id: session.id,
          stripe_subscription_id: session.subscription || null,
          subscription_mode: session.mode === 'subscription',
          amount_paid: session.amount_total,
          currency: session.currency,
          payment_status: session.payment_status,
          created_at: new Date().toISOString(),
          webhook_processed: true
        }
      }

      console.log('💾 Creating report:', reportData)

      const { data, error } = await supabaseAdmin
        .from('reports')
        .upsert(reportData, { onConflict: 'order_id' })
        .select()

      if (error) {
        console.error('❌ DB Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      console.log('✅ REPORT CREATED:', data[0]?.id)
      return NextResponse.json({ success: true, id: data[0]?.id, customer_id: customerId })
    }

    // Handle recurring subscription payments
    if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object
      console.log('💰 Processing recurring payment, invoice:', invoice.id)
      console.log('💰 Subscription:', invoice.subscription)
      console.log('💰 Customer:', invoice.customer)

      // For recurring payments, we don't create a new report
      // The customer already has access through their subscription
      // We could update a subscription usage table here if needed

      return NextResponse.json({
        received: true,
        type: event.type,
        message: 'Recurring payment processed - no report creation needed'
      })
    }

    // Handle initial payment success (Payment Intent flow)
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object
      console.log('💳 Payment Intent succeeded:', paymentIntent.id)
      console.log('💳 Customer:', paymentIntent.customer)
      console.log('💳 Amount:', paymentIntent.amount)
      console.log('💳 Metadata:', paymentIntent.metadata)

      // Get invoice ID from metadata (Payment Elements flow)
      const invoiceId = paymentIntent.metadata?.invoice_id

      if (!invoiceId) {
        console.log('⚠️ No invoice_id in payment intent metadata')
        return NextResponse.json({
          received: true,
          type: event.type,
          message: 'No invoice_id in metadata - skipping account creation'
        })
      }

      console.log('📄 Invoice ID from metadata:', invoiceId)

      // Get subscription ID from metadata (more reliable than invoice)
      const subscriptionId = paymentIntent.metadata?.subscription_id

      if (!subscriptionId) {
        console.log('⚠️ No subscription_id in payment intent metadata')
        return NextResponse.json({
          received: true,
          type: event.type,
          message: 'No subscription_id in metadata - skipping account creation'
        })
      }

      console.log('🔄 Subscription ID from metadata:', subscriptionId)

      const invoice = await stripe.invoices.retrieve(invoiceId)
      console.log('📄 Invoice retrieved:', invoice.id)
      console.log('📄 Invoice status:', invoice.status)

      // Mark invoice as paid (Payment Elements flow requires this)
      if (invoice.status === 'open') {
        console.log('💰 Marking invoice as paid')
        try {
          await stripe.invoices.pay(invoiceId, {
            paid_out_of_band: true,
          })
          console.log('✅ Invoice marked as paid')
        } catch (error) {
          console.error('⚠️ Failed to mark invoice as paid:', error)
          // Continue anyway - payment succeeded
        }
      }

      // Get full subscription details
      const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['items.data.price'],
      })

      console.log('🔄 Subscription retrieved:', subscription.id)
      console.log('🔄 Subscription metadata:', subscription.metadata)

      const customerEmail = invoice.customer_email || 'unknown@test.com'
      const customerName = invoice.customer_name || 'Customer'
      const stripeCustomerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id || ''

      // Create or update customer account
      let customerId: string | null = null
      if (stripeCustomerId) {
        try {
          customerId = await createOrUpdateCustomerAccount(
            customerEmail,
            customerName,
            stripeCustomerId,
            subscription.id,
            subscription
          )
        } catch (error) {
          console.error('⚠️ Failed to create customer account (non-fatal):', error)
        }
      }

      // Create report record
      const metadata = subscription.metadata
      const vehicleInfo = {
        type: metadata.vehicleType === 'vin' ? 'vin' : 'rego',
        vin: metadata.vehicleVin || undefined,
        rego: metadata.vehicleRego || 'UNKNOWN',
        state: metadata.vehicleState || 'QLD'
      }

      const reportData = {
        order_id: paymentIntent.id,
        customer_id: customerId,
        customer_email: customerEmail,
        customer_name: customerName,
        vehicle_identifier: vehicleInfo,
        report_type: metadata.reportType === 'comprehensive' ? 'PREMIUM' : 'STANDARD',
        status: 'pending',
        report_data: {
          stripe_payment_intent_id: paymentIntent.id,
          stripe_invoice_id: invoice.id,
          stripe_subscription_id: subscription.id,
          amount_paid: paymentIntent.amount,
          currency: paymentIntent.currency,
          payment_status: 'paid',
          created_at: new Date().toISOString(),
          webhook_processed: true
        }
      }

      console.log('💾 Creating report from payment intent:', reportData)

      const { data, error } = await supabaseAdmin
        .from('reports')
        .upsert(reportData, { onConflict: 'order_id' })
        .select()

      if (error) {
        console.error('❌ DB Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      console.log('✅ REPORT CREATED FROM PAYMENT INTENT:', data[0]?.id)
      return NextResponse.json({ success: true, id: data[0]?.id, customer_id: customerId })
    }

    // Handle subscription cancellations
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object
      console.log('🚫 Subscription cancelled:', subscription.id)
      console.log('🚫 Customer:', subscription.customer)

      // Update subscription status in database
      const { error } = await supabaseAdmin
        .from('subscriptions')
        .update({
          status: 'canceled',
          canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id)

      if (error) {
        console.error('⚠️ Failed to update subscription status:', error)
      } else {
        console.log('✅ Subscription status updated to canceled')
      }

      return NextResponse.json({
        received: true,
        type: event.type,
        message: 'Subscription cancellation processed'
      })
    }

    // Handle subscription updates
    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object
      console.log('🔄 Subscription updated:', subscription.id)
      console.log('🔄 New status:', subscription.status)

      // Check if subscription exists in database first
      const { data: existing } = await supabaseAdmin
        .from('subscriptions')
        .select('id')
        .eq('stripe_subscription_id', subscription.id)
        .single()

      if (!existing) {
        console.log('⚠️ Subscription not in database yet, skipping update')
        return NextResponse.json({
          received: true,
          type: event.type,
          message: 'Subscription not in database yet'
        })
      }

      // Update subscription in database
      const { error } = await supabaseAdmin
        .from('subscriptions')
        .update({
          status: subscription.status as any,
          current_period_start: subscription.current_period_start ? new Date(subscription.current_period_start * 1000).toISOString() : null,
          current_period_end: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
          cancel_at: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
          canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id)

      if (error) {
        console.error('⚠️ Failed to update subscription:', error)
      } else {
        console.log('✅ Subscription updated in database')
      }

      return NextResponse.json({
        received: true,
        type: event.type,
        message: 'Subscription update processed'
      })
    }

    // For other events
    return NextResponse.json({ received: true, type: event.type })

  } catch (error) {
    console.error('❌ ERROR:', error)
    return NextResponse.json({ error: 'Failed', message: error.message }, { status: 500 })
  }
}

async function createTestReport() {
  console.log('🧪 Creating test report')

  const testData = {
    order_id: `fallback_${Date.now()}`,
    customer_email: 'sloshedau@gmail.com',
    customer_name: 'connor rawiri',
    vehicle_identifier: {
      type: 'rego',
      rego: 'ZZM991',
      state: 'QLD'
    },
    report_type: 'PREMIUM',
    status: 'pending',
    report_data: {
      fallback_creation: true,
      timestamp: new Date().toISOString()
    }
  }

  const { data, error } = await supabaseAdmin
    .from('reports')
    .insert(testData)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, id: data[0]?.id, test: true })
}

export async function GET() {
  console.log('🔍 Webhook GET request')
  return NextResponse.json({
    status: 'Webhook ready',
    time: new Date().toISOString(),
    version: 'simplified'
  })
}