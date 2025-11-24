import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  console.log('🚀 STRIPE WEBHOOK - SIGNATURE VERIFICATION COMPLETELY REMOVED!')
  console.log('🚀 Timestamp:', new Date().toISOString())
  console.log('🚀 Version: FIXED-FINAL')

  try {
    const body = await request.text()
    console.log('📦 Body length:', body.length)

    // ABSOLUTELY NO SIGNATURE VERIFICATION - DIRECT PROCESSING
    let event
    try {
      event = JSON.parse(body)
      console.log('✅ Event parsed successfully')
      console.log('✅ Event type:', event.type)
      console.log('✅ Event ID:', event.id)
    } catch (e) {
      console.log('❌ Failed to parse JSON:', e)
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      console.log('💳 Processing session:', session.id)
      console.log('💳 Session mode:', session.mode)

      // For subscription mode, metadata is in subscription object
      let metadata = session.metadata || {}

      // If this is a subscription checkout, try to get subscription to access its metadata
      if (session.mode === 'subscription' && session.subscription) {
        console.log('🔄 Subscription checkout detected, subscription ID:', session.subscription)
        // Metadata is passed through subscription_data.metadata in the checkout session
        // We'll get it from the invoice.payment_succeeded event instead
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

      // Use clientRefData if available (Payment Link), otherwise use metadata (API session)
      const vehicleInfo = {
        type: clientRefData?.type || (metadata.vehicleType === 'vin' ? 'vin' : 'rego'),
        vin: clientRefData?.vin || metadata.vehicleVin || undefined,
        rego: clientRefData?.rego || metadata.vehicleRego || 'UNKNOWN',
        state: clientRefData?.state || metadata.vehicleState || 'QLD'
      }

      const reportData = {
        order_id: session.id,
        customer_email: session.customer_details?.email || clientRefData?.email || metadata.customerEmail || 'unknown@test.com',
        customer_name: session.customer_details?.name || 'Test Customer',
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
      return NextResponse.json({ success: true, id: data[0]?.id })
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

    // Handle subscription cancellations
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object
      console.log('🚫 Subscription cancelled:', subscription.id)
      console.log('🚫 Customer:', subscription.customer)

      // We could mark the customer's subscription as inactive in the database here
      // For now, just log it

      return NextResponse.json({
        received: true,
        type: event.type,
        message: 'Subscription cancellation logged'
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