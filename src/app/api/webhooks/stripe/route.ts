import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  console.log('🚀 WEBHOOK HIT!')

  try {
    // Just create a test report - no signature verification
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
      console.error('❌ DB Error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ REPORT CREATED:', data[0]?.id)
    return NextResponse.json({ success: true, id: data[0]?.id })

  } catch (error) {
    console.error('❌ ERROR:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'OK', time: new Date().toISOString() })
}