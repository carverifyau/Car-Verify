import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  console.log('🚀 TEST WEBHOOK HIT!')

  try {
    // Create a test report immediately - no questions asked
    const testData = {
      order_id: `manual_${Date.now()}`,
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
        manual_creation: true,
        amount_paid: 3499,
        currency: 'aud',
        created_at: new Date().toISOString(),
        note: 'Manual report creation for webhook testing'
      }
    }

    console.log('💾 Creating manual report for ZZM991...')

    const { data, error } = await supabaseAdmin
      .from('reports')
      .insert(testData)
      .select()

    if (error) {
      console.error('❌ DB Error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ MANUAL REPORT CREATED:', data[0]?.id)
    return NextResponse.json({
      success: true,
      id: data[0]?.id,
      message: 'Manual report created for ZZM991',
      customer: 'sloshedau@gmail.com'
    })

  } catch (error) {
    console.error('❌ ERROR:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Test webhook ready',
    time: new Date().toISOString(),
    purpose: 'Manual report creation for ZZM991'
  })
}