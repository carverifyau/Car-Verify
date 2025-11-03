import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  console.log('🚀 WEBHOOK HIT!')

  try {
    const body = await request.text()
    console.log('📦 Body received, length:', body.length)

    // Parse the Stripe event
    let event
    try {
      event = JSON.parse(body)
    } catch (e) {
      console.log('❌ Failed to parse JSON, creating test report instead')
      return await createTestReport()
    }

    console.log('✅ Event type:', event.type)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      console.log('💳 Processing checkout session:', session.id)
      console.log('📧 Customer email:', session.customer_details?.email)
      console.log('🚗 Metadata:', session.metadata)

      // Extract data from the real Stripe event
      const metadata = session.metadata || {}
      let vehicleInfo

      if (metadata.vehicleType === 'vin') {
        vehicleInfo = {
          type: 'vin',
          vin: metadata.vehicleVin,
        }
      } else {
        vehicleInfo = {
          type: 'rego',
          rego: metadata.vehicleRego || 'UNKNOWN',
          state: metadata.vehicleState || 'QLD',
        }
      }

      // Map report type
      const reportTypeMap = {
        'standard': 'STANDARD',
        'premium': 'PREMIUM',
        'comprehensive': 'PREMIUM', // Map comprehensive to premium
      }
      const reportType = reportTypeMap[metadata.reportType] || 'STANDARD'

      const reportData = {
        order_id: session.id,
        customer_email: session.customer_details?.email || session.customer_email || 'unknown@email.com',
        customer_name: session.customer_details?.name || 'Customer',
        vehicle_identifier: vehicleInfo,
        report_type: reportType,
        status: 'pending',
        report_data: {
          stripe_session_id: session.id,
          amount_paid: session.amount_total,
          currency: session.currency,
          payment_status: session.payment_status,
          created_at: new Date().toISOString(),
          webhook_processed: true,
          metadata: metadata
        }
      }

      console.log('💾 Saving report:', reportData)

      const { data, error } = await supabaseAdmin
        .from('reports')
        .upsert(reportData, { onConflict: 'order_id' })
        .select()

      if (error) {
        console.error('❌ DB Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      console.log('✅ REPORT CREATED:', data[0]?.id)
      return NextResponse.json({
        success: true,
        id: data[0]?.id,
        customer: session.customer_details?.email,
        vehicle: vehicleInfo
      })
    }

    // For other event types, just acknowledge
    return NextResponse.json({ received: true, type: event.type })

  } catch (error) {
    console.error('❌ ERROR:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

async function createTestReport() {
  const testData = {
    order_id: `test_${Date.now()}`,
    customer_email: 'test@stripe.com',
    customer_name: 'Test Customer',
    vehicle_identifier: {
      type: 'rego',
      rego: 'TEST123',
      state: 'QLD'
    },
    report_type: 'STANDARD',
    status: 'pending',
    report_data: {
      webhook_test: true,
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
  return NextResponse.json({ status: 'OK', time: new Date().toISOString() })
}