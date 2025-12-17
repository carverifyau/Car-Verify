import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import Stripe from 'stripe'
import { ppsrCloudClient } from '@/lib/ppsr-cloud'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Helper function to safely convert Unix timestamp to ISO string
function toISOStringOrNull(unixTimestamp: number | null | undefined): string | null {
  if (!unixTimestamp || unixTimestamp <= 0) return null
  try {
    const date = new Date(unixTimestamp * 1000)
    return date.toISOString()
  } catch (e) {
    console.warn('⚠️ Invalid timestamp:', unixTimestamp)
    return null
  }
}

// Helper function to automatically fetch PPSR certificate and send email
async function processPPSRCertificate(params: {
  reportId: string
  customerEmail: string
  customerName: string
  rego: string
  state: string
  vin?: string
}) {
  try {
    console.log('🚗 Auto-fetching PPSR certificate for', params.rego, params.state)

    // Step 1: Fetch PPSR certificate from PPSR Cloud
    const ppsrResult = await ppsrCloudClient.performPPSRCheck({
      vin: params.vin,
      registrationPlate: params.rego,
      registrationState: params.state
    })

    console.log('✅ PPSR certificate fetched:', ppsrResult.filename)

    // Step 2: Send email with certificate and welcome message
    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-report-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerEmail: params.customerEmail,
        customerName: params.customerName,
        reportData: {
          ppsrCertificateData: ppsrResult.pdfBase64,
          ppsrCertificateFilename: ppsrResult.filename,
          ppsrStatus: 'completed', // We'll parse the actual status from searchResult later
          year: '', // Can be extracted from NEVDIS data
          make: '', // Can be extracted from NEVDIS data
          model: '' // Can be extracted from NEVDIS data
        },
        rego: params.rego,
        state: params.state,
        vin: params.vin,
        reportId: params.reportId
      }),
    })

    if (!emailResponse.ok) {
      throw new Error('Failed to send email')
    }

    console.log('✅ Welcome email sent to:', params.customerEmail)

    // Step 3: Update report status to completed
    const { error: updateError } = await supabaseAdmin
      .from('reports')
      .update({
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', params.reportId)

    if (updateError) {
      console.error('⚠️ Failed to update report status:', updateError)
    } else {
      console.log('✅ Report marked as completed:', params.reportId)
    }

    return { success: true }

  } catch (error) {
    console.error('❌ Auto PPSR processing failed:', error)
    // Report stays in 'pending' status for manual processing
    throw error
  }
}

// Helper function to create or update customer account
async function createOrUpdateCustomerAccount(
  email: string,
  name: string | null,
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  subscription: Stripe.Subscription
) {
  console.log('👤 Creating/updating customer account for:', email)
  console.log('🔑 Service role key configured:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
  console.log('🔑 Service role key prefix:', process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20))

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
  const subscriptionData = {
    customer_id: user.id,
    stripe_subscription_id: stripeSubscriptionId,
    stripe_price_id: subscription.items.data[0]?.price.id || null,
    status: subscription.status as any,
    current_period_start: toISOStringOrNull(subscription.current_period_start),
    current_period_end: toISOStringOrNull(subscription.current_period_end),
    cancel_at: toISOStringOrNull(subscription.cancel_at),
    canceled_at: toISOStringOrNull(subscription.canceled_at),
    checks_used: 0,
    checks_limit: 10,
    updated_at: new Date().toISOString(),
  }

  console.log('📝 Attempting to upsert subscription with data:', JSON.stringify(subscriptionData, null, 2))

  const { error: subscriptionError, data: subscriptionResult } = await supabaseAdmin
    .from('subscriptions')
    .upsert(subscriptionData, {
      onConflict: 'stripe_subscription_id',
    })
    .select()

  if (subscriptionError) {
    console.error('❌ Subscription upsert failed!')
    console.error('❌ Error code:', subscriptionError.code)
    console.error('❌ Error message:', subscriptionError.message)
    console.error('❌ Error details:', subscriptionError.details)
    console.error('❌ Error hint:', subscriptionError.hint)
    console.error('❌ Full error object:', JSON.stringify(subscriptionError, null, 2))
    throw new Error(`Subscription creation failed: ${subscriptionError.message} (${subscriptionError.code}) - ${subscriptionError.details || subscriptionError.hint || 'No additional details'}`)
  }

  console.log('✅ Subscription upsert result:', subscriptionResult)

  console.log('✅ Subscription record created/updated')

  // NOTE: Login instructions will be sent manually with the PPSR report
  // This ensures customers receive their report and account access at the same time
  // Admin will include login instructions when sending the completed report via email

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

        try {
          subscription = await stripe.subscriptions.retrieve(subscriptionId, {
            expand: ['items.data.price'],
          })
          console.log('🔄 Subscription retrieved:', subscription.id)
          console.log('🔄 Subscription status:', subscription.status)
        } catch (error) {
          console.error('❌ Failed to retrieve subscription:', error)
          // Continue anyway, we might be able to create account without full subscription details
        }
      } else {
        console.log('⚠️ Not a subscription checkout or no subscription ID')
        console.log('⚠️ Session mode:', session.mode)
        console.log('⚠️ Session subscription:', session.subscription)
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
        console.log('✅ Both subscription and customer ID present, creating account')
        try {
          customerId = await createOrUpdateCustomerAccount(
            customerEmail,
            customerName,
            stripeCustomerId,
            subscription.id,
            subscription
          )
          console.log('✅ Customer account created successfully, ID:', customerId)
        } catch (error) {
          console.error('❌ Failed to create customer account:', error)
          // Log the full error for debugging
          if (error instanceof Error) {
            console.error('❌ Error message:', error.message)
            console.error('❌ Error stack:', error.stack)
          }
        }
      } else {
        console.log('⚠️ Skipping customer account creation')
        console.log('⚠️ Has subscription?', !!subscription)
        console.log('⚠️ Has stripe customer ID?', !!stripeCustomerId)
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

      // 🚀 AUTOMATIC PPSR CERTIFICATE FETCHING
      // Process synchronously to ensure completion in serverless environment
      const reportId = data[0]?.id
      if (reportId && vehicleInfo.rego) {
        try {
          console.log('🔄 Starting PPSR certificate fetch...')
          await processPPSRCertificate({
            reportId,
            customerEmail,
            customerName,
            rego: vehicleInfo.rego,
            state: vehicleInfo.state,
            vin: vehicleInfo.vin
          })
          console.log('✅ PPSR certificate fetched and email sent successfully')
        } catch (error) {
          console.error('❌ PPSR processing failed:', error)
          // Report stays in 'pending' status for manual processing via admin panel
        }
      }

      return NextResponse.json({ success: true, id: reportId, customer_id: customerId })
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

    // Handle subscription creation (backup in case checkout.session.completed doesn't have it)
    if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
      const subscription = event.data.object
      console.log(`🔄 Subscription ${event.type}:`, subscription.id)
      console.log('🔄 Subscription status:', subscription.status)
      console.log('🔄 Customer:', subscription.customer)
      console.log('🔄 Subscription metadata:', subscription.metadata)

      // Filter out non-Car Verify subscriptions (e.g., Self Assess)
      if (subscription.metadata?.source === 'self_assess_platform') {
        console.log('⚠️ Ignoring Self Assess subscription event')
        return NextResponse.json({ received: true, message: 'Ignoring non-Car Verify subscription' })
      }

      // Skip incomplete_expired subscriptions (payment failed and retry period expired)
      if (subscription.status === 'incomplete_expired') {
        console.log('⚠️ Ignoring incomplete_expired subscription - payment failed')
        return NextResponse.json({ received: true, message: 'Ignoring incomplete_expired subscription' })
      }

      const stripeCustomerId = typeof subscription.customer === 'string'
        ? subscription.customer
        : subscription.customer?.id

      if (!stripeCustomerId) {
        console.log('⚠️ No customer ID in subscription event')
        return NextResponse.json({ received: true, message: 'No customer ID' })
      }

      // Get customer details from Stripe
      const customer = await stripe.customers.retrieve(stripeCustomerId)
      const customerEmail = (customer as any).email || 'unknown@test.com'
      const customerName = (customer as any).name || 'Customer'

      console.log('👤 Customer email:', customerEmail)
      console.log('👤 Customer name:', customerName)

      // Create or update customer account with subscription
      try {
        const customerId = await createOrUpdateCustomerAccount(
          customerEmail,
          customerName,
          stripeCustomerId,
          subscription.id,
          subscription
        )
        console.log('✅ Customer account created/updated from subscription event, ID:', customerId)
        return NextResponse.json({ success: true, customer_id: customerId })
      } catch (error) {
        console.error('❌ Failed to create customer account from subscription event:', error)
        const errorDetails = {
          error: 'Failed to create account',
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          subscription_id: subscription.id,
          customer_email: customerEmail,
          timestamp: new Date().toISOString()
        }
        console.error('❌ Full error details:', JSON.stringify(errorDetails, null, 2))
        return NextResponse.json(errorDetails, { status: 500 })
      }
    }

    // Handle subscription cancellations
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object
      console.log('🚫 Subscription cancelled:', subscription.id)
      console.log('🚫 Customer:', subscription.customer)

      // Filter out non-Car Verify subscriptions
      if (subscription.metadata?.source === 'self_assess_platform') {
        console.log('⚠️ Ignoring Self Assess subscription cancellation')
        return NextResponse.json({ received: true, message: 'Ignoring non-Car Verify subscription' })
      }

      // Skip incomplete_expired subscriptions
      if (subscription.status === 'incomplete_expired') {
        console.log('⚠️ Ignoring incomplete_expired subscription cancellation')
        return NextResponse.json({ received: true, message: 'Ignoring incomplete_expired subscription' })
      }

      // Update subscription status in database
      const { error } = await supabaseAdmin
        .from('subscriptions')
        .update({
          status: 'canceled',
          canceled_at: toISOStringOrNull(subscription.canceled_at),
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

      // Filter out non-Car Verify subscriptions
      if (subscription.metadata?.source === 'self_assess_platform') {
        console.log('⚠️ Ignoring Self Assess subscription update (second handler)')
        return NextResponse.json({ received: true, message: 'Ignoring non-Car Verify subscription' })
      }

      // Skip incomplete_expired subscriptions
      if (subscription.status === 'incomplete_expired') {
        console.log('⚠️ Ignoring incomplete_expired subscription update')
        return NextResponse.json({ received: true, message: 'Ignoring incomplete_expired subscription' })
      }

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
          current_period_start: toISOStringOrNull(subscription.current_period_start),
          current_period_end: toISOStringOrNull(subscription.current_period_end),
          cancel_at: toISOStringOrNull(subscription.cancel_at),
          canceled_at: toISOStringOrNull(subscription.canceled_at),
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