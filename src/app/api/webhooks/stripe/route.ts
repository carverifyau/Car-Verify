import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import Stripe from 'stripe'
import { ppsrCloudClient } from '@/lib/ppsr-cloud'

// Configure function timeout for PPSR processing (takes ~26 seconds)
export const maxDuration = 60 // seconds (Vercel Pro/Team plans support up to 300s)

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
    console.log('🚗 PPSR PROCESSING STARTED')
    console.log('🚗 Report ID:', params.reportId)
    console.log('🚗 Customer:', params.customerEmail)
    console.log('🚗 Vehicle:', params.rego, params.state)
    console.log('🚗 Timestamp:', new Date().toISOString())

    // IDEMPOTENCY CHECK: See if PPSR has already been processed for this report
    const { data: existingReport } = await supabaseAdmin
      .from('reports')
      .select('status, ppsr_pdf_data, ppsr_pdf_filename, report_data')
      .eq('id', params.reportId)
      .single()

    if (existingReport?.status === 'completed' && existingReport?.ppsr_pdf_data) {
      console.log('⛔ IDEMPOTENCY CHECK 1: PPSR certificate already exists for this report')
      console.log('⛔ Report ID:', params.reportId)
      console.log('⛔ Status:', existingReport.status)
      console.log('⛔ SKIPPING DUPLICATE PPSR FETCH - NO CHARGE')
      return { success: true, skipped: true, reason: 'already_processed' }
    }

    // IDEMPOTENCY CHECK: See if another report exists for the same customer/vehicle that was recently completed
    const { data: recentReports } = await supabaseAdmin
      .from('reports')
      .select('id, status, ppsr_pdf_data, created_at')
      .eq('customer_email', params.customerEmail)
      .eq('vehicle_identifier->rego', params.rego)
      .eq('vehicle_identifier->state', params.state)
      .eq('status', 'completed')
      .not('ppsr_pdf_data', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1)

    if (recentReports && recentReports.length > 0) {
      const recentReport = recentReports[0]
      const recentReportTime = new Date(recentReport.created_at).getTime()
      const now = new Date().getTime()
      const timeDiffMinutes = (now - recentReportTime) / (1000 * 60)

      // If a report was completed in the last 24 hours, skip this one
      if (timeDiffMinutes < 1440) { // 24 hours = 1440 minutes
        console.log('⛔ IDEMPOTENCY CHECK 2: Recent report found for same customer/vehicle')
        console.log('⛔ Recent report ID:', recentReport.id)
        console.log(`⛔ Created ${timeDiffMinutes.toFixed(1)} minutes ago`)
        console.log('⛔ Customer:', params.customerEmail)
        console.log('⛔ Vehicle:', params.rego, params.state)
        console.log('⛔ SKIPPING DUPLICATE PPSR FETCH - NO CHARGE')

        // Mark this report as completed without re-processing
        await supabaseAdmin
          .from('reports')
          .update({
            status: 'completed',
            report_data: {
              ...existingReport?.report_data,
              skipped_duplicate: true,
              duplicate_of_report_id: recentReport.id,
              updated_at: new Date().toISOString()
            }
          })
          .eq('id', params.reportId)

        return { success: true, skipped: true, reason: 'recent_duplicate' }
      }
    }

    // Step 1: Fetch PPSR certificate from PPSR Cloud
    console.log('💰 ABOUT TO FETCH PPSR CERTIFICATE - THIS WILL CHARGE PPSR CLOUD')
    console.log('💰 Customer:', params.customerEmail)
    console.log('💰 Vehicle:', params.rego, params.state)
    console.log('💰 Timestamp:', new Date().toISOString())

    const ppsrResult = await ppsrCloudClient.performPPSRCheck({
      vin: params.vin,
      registrationPlate: params.rego,
      registrationState: params.state
    })

    console.log('✅ PPSR CERTIFICATE FETCHED - PPSR CLOUD CHARGED')
    console.log('✅ Filename:', ppsrResult.filename)
    console.log('✅ Timestamp:', new Date().toISOString())

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

    // Step 3: Save PPSR certificate data and update report status to completed
    const { error: updateError } = await supabaseAdmin
      .from('reports')
      .update({
        status: 'completed',
        ppsr_pdf_data: ppsrResult.pdfBase64,
        ppsr_pdf_filename: ppsrResult.filename,
        ppsr_certificate_url: ppsrResult.certificateUrl || null,
        ppsr_search_result: ppsrResult.searchResult || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.reportId)

    if (updateError) {
      console.error('⚠️ Failed to update report status:', updateError)
    } else {
      console.log('✅ Report marked as completed with PPSR data:', params.reportId)
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
      console.log('💳 Payment status:', session.payment_status)

      // CRITICAL: Only process if payment is actually paid
      if (session.payment_status !== 'paid') {
        console.log('⚠️ Payment not completed yet, skipping PPSR processing')
        console.log('⚠️ Payment status:', session.payment_status)
        return NextResponse.json({
          received: true,
          message: 'Checkout completed but payment not yet paid - waiting for payment_intent.succeeded event'
        })
      }

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
      console.log('💳 Invoice:', paymentIntent.invoice)

      // Get invoice ID - try from invoice field first, fallback to metadata
      let invoiceId = typeof paymentIntent.invoice === 'string'
        ? paymentIntent.invoice
        : paymentIntent.invoice?.id || paymentIntent.metadata?.invoice_id

      if (!invoiceId) {
        console.log('⚠️ No invoice found on payment intent')
        return NextResponse.json({
          received: true,
          type: event.type,
          message: 'No invoice found - likely not a subscription payment'
        })
      }

      console.log('📄 Invoice ID:', invoiceId)

      // Get the invoice to find the subscription
      const invoice = await stripe.invoices.retrieve(invoiceId)
      console.log('📄 Invoice retrieved:', invoice.id)
      console.log('📄 Invoice status:', invoice.status)
      console.log('📄 Invoice subscription:', invoice.subscription)

      const subscriptionId = typeof invoice.subscription === 'string'
        ? invoice.subscription
        : invoice.subscription?.id || paymentIntent.metadata?.subscription_id

      if (!subscriptionId) {
        console.log('⚠️ No subscription found on invoice')
        return NextResponse.json({
          received: true,
          type: event.type,
          message: 'No subscription found - likely a one-time payment'
        })
      }

      console.log('🔄 Subscription ID:', subscriptionId)
      console.log('🔄 About to retrieve subscription details...')

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
      console.log('🔄 Subscription metadata:', JSON.stringify(subscription.metadata, null, 2))

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

      console.log('🚗 Vehicle info constructed:', JSON.stringify(vehicleInfo, null, 2))

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

      // 🚀 AUTOMATIC PPSR CERTIFICATE FETCHING FROM PAYMENT INTENT
      // Get report ID - use order_id to fetch if data is empty
      let reportId = data[0]?.id

      if (!reportId) {
        console.log('⚠️ No report ID from upsert, fetching by order_id...')
        const { data: fetchedReport } = await supabaseAdmin
          .from('reports')
          .select('id, report_data')
          .eq('order_id', paymentIntent.id)
          .single()

        reportId = fetchedReport?.id

        if (fetchedReport) {
          // Store breadcrumb on fetched report
          await supabaseAdmin
            .from('reports')
            .update({
              report_data: {
                ...fetchedReport.report_data,
                webhook_reached_ppsr_check: true,
                webhook_timestamp: new Date().toISOString()
              }
            })
            .eq('id', reportId)
        }
      } else {
        // Store breadcrumb on newly created report
        await supabaseAdmin
          .from('reports')
          .update({
            report_data: {
              ...data[0].report_data,
              webhook_reached_ppsr_check: true,
              webhook_timestamp: new Date().toISOString()
            }
          })
          .eq('id', reportId)
      }
      console.log('🔍 PPSR Check conditions:', {
        reportId: !!reportId,
        hasRego: !!vehicleInfo.rego,
        hasVin: !!vehicleInfo.vin,
        rego: vehicleInfo.rego,
        vin: vehicleInfo.vin
      })

      if (!reportId) {
        console.error('❌ No report ID, cannot process PPSR')
        return NextResponse.json({ success: false, error: 'No report ID' }, { status: 500 })
      }

      if (!vehicleInfo.rego && !vehicleInfo.vin) {
        console.error('❌ No vehicle info (rego or VIN), cannot process PPSR')
        await supabaseAdmin
          .from('reports')
          .update({
            report_data: {
              ...data[0]?.report_data,
              ppsr_error: {
                message: 'No vehicle identifier (rego or VIN) available',
                vehicleInfo: vehicleInfo,
                timestamp: new Date().toISOString()
              }
            }
          })
          .eq('id', reportId)
        return NextResponse.json({ success: true, id: reportId, warning: 'No vehicle info for PPSR' })
      }

      // Process PPSR synchronously - wait for completion before responding
      // With maxDuration=60, we have time to complete the ~26 second PPSR process
      try {
        console.log('🔄 Starting PPSR certificate fetch from payment_intent.succeeded...')
        await processPPSRCertificate({
          reportId,
          customerEmail,
          customerName,
          rego: vehicleInfo.rego || 'UNKNOWN',
          state: vehicleInfo.state,
          vin: vehicleInfo.vin
        })
        console.log('✅ PPSR certificate fetched and email sent successfully from payment_intent')
      } catch (ppsrError) {
        console.error('❌ PPSR processing failed from payment_intent:', ppsrError)
        // Store error in database for debugging
        await supabaseAdmin
          .from('reports')
          .update({
            report_data: {
              ...data[0]?.report_data,
              ppsr_error: {
                message: ppsrError instanceof Error ? ppsrError.message : 'Unknown error',
                stack: ppsrError instanceof Error ? ppsrError.stack : undefined,
                timestamp: new Date().toISOString()
              }
            }
          })
          .eq('id', reportId)
        // Report stays in 'pending' status for manual processing
      }

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

      // Note: We now accept all Stripe statuses including 'incomplete_expired' and 'unpaid'
      // These are tracked in the database but won't give users access (status !== 'active')

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

        // 🚀 AUTOMATIC PPSR CERTIFICATE FETCHING FOR NEW SUBSCRIPTIONS
        // Only trigger for 'customer.subscription.created', not updates
        if (event.type === 'customer.subscription.created') {
          console.log('🔍 Checking for vehicle metadata to trigger PPSR automation...')
          console.log('🔍 Subscription status:', subscription.status)

          // CRITICAL: Only process PPSR if subscription is active or trialing (payment successful)
          if (subscription.status !== 'active' && subscription.status !== 'trialing') {
            console.log('⚠️ Subscription not active/trialing, skipping PPSR processing')
            console.log('⚠️ Current status:', subscription.status)
            return NextResponse.json({ success: true, customer_id: customerId, message: 'Subscription created but not active yet' })
          }

          // Extract vehicle details from subscription metadata
          const metadata = subscription.metadata
          const vehicleInfo = {
            type: metadata?.vehicleType === 'vin' ? 'vin' : 'rego',
            vin: metadata?.vehicleVin || undefined,
            rego: metadata?.vehicleRego || undefined,
            state: metadata?.vehicleState || 'QLD'
          }

          console.log('🚗 Vehicle info from subscription metadata:', vehicleInfo)

          // Only proceed if we have vehicle details
          if (vehicleInfo.rego || vehicleInfo.vin) {
            // Create report in database
            const reportData = {
              order_id: `sub_${subscription.id}`,
              customer_id: customerId,
              customer_email: customerEmail,
              customer_name: customerName,
              vehicle_identifier: vehicleInfo,
              report_type: metadata?.reportType === 'comprehensive' ? 'PREMIUM' : 'STANDARD',
              status: 'pending',
              report_data: {
                stripe_subscription_id: subscription.id,
                subscription_mode: true,
                created_at: new Date().toISOString(),
                webhook_processed: true,
                event_type: 'customer.subscription.created'
              }
            }

            console.log('💾 Creating report from subscription:', reportData)

            const { data, error: reportError } = await supabaseAdmin
              .from('reports')
              .upsert(reportData, { onConflict: 'order_id' })
              .select()

            if (reportError) {
              console.error('❌ Failed to create report:', reportError)
            } else {
              const reportId = data[0]?.id
              console.log('✅ REPORT CREATED:', reportId)

              // Trigger PPSR automation
              if (reportId && (vehicleInfo.rego || vehicleInfo.vin)) {
                try {
                  console.log('🔄 Starting PPSR certificate fetch from subscription event...')
                  await processPPSRCertificate({
                    reportId,
                    customerEmail,
                    customerName,
                    rego: vehicleInfo.rego || 'UNKNOWN',
                    state: vehicleInfo.state,
                    vin: vehicleInfo.vin
                  })
                  console.log('✅ PPSR certificate fetched and email sent successfully from subscription event')
                } catch (ppsrError) {
                  console.error('❌ PPSR processing failed from subscription event:', ppsrError)
                  // Report stays in 'pending' status for manual processing
                }
              }
            }
          } else {
            console.log('⚠️ No vehicle details in subscription metadata - skipping PPSR automation')
          }
        }

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

    // Handle invoice finalization - ensure payment intent has setup_future_usage
    if (event.type === 'invoice.finalized') {
      const invoice = event.data.object
      console.log('📄 Invoice finalized:', invoice.id)

      // If this invoice has a payment intent, ensure it's set up for future usage
      if (invoice.payment_intent && typeof invoice.payment_intent === 'string') {
        try {
          await stripe.paymentIntents.update(invoice.payment_intent, {
            setup_future_usage: 'off_session',
          })
          console.log('✅ Updated payment intent with setup_future_usage')
        } catch (error) {
          console.error('⚠️ Failed to update payment intent:', error)
        }
      }

      return NextResponse.json({
        received: true,
        type: event.type,
        message: 'Invoice finalized'
      })
    }

    // Handle recurring payment failures
    if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object
      console.log('💳❌ Invoice payment failed:', invoice.id)
      console.log('💳❌ Subscription:', invoice.subscription)
      console.log('💳❌ Customer:', invoice.customer)
      console.log('💳❌ Amount:', invoice.amount_due / 100)
      console.log('💳❌ Attempt count:', invoice.attempt_count)

      // Notify customer about payment failure
      // You could send an email here or update database status

      return NextResponse.json({
        received: true,
        type: event.type,
        message: 'Payment failure logged'
      })
    }

    // Handle when payment requires action (3D Secure, etc.)
    if (event.type === 'invoice.payment_action_required') {
      const invoice = event.data.object
      console.log('💳⚠️ Invoice requires payment action:', invoice.id)
      console.log('💳⚠️ Subscription:', invoice.subscription)
      console.log('💳⚠️ Customer:', invoice.customer)

      // Send email to customer with payment link
      // invoice.hosted_invoice_url contains the link

      return NextResponse.json({
        received: true,
        type: event.type,
        message: 'Payment action required notification sent'
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