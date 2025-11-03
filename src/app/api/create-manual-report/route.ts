import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  console.log('🚀 MANUAL REPORT CREATION')

  try {
    // Create the report for ZZM991 that you paid for
    const reportData = {
      order_id: `manual_test_${Date.now()}`,
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
        test_purchase: true,
        note: 'Manual report creation - your $34.99 purchase'
      }
    }

    console.log('💾 Creating report for ZZM991...')
    console.log('📧 Customer:', reportData.customer_email)
    console.log('🚗 Vehicle:', reportData.vehicle_identifier)

    const { data, error } = await supabaseAdmin
      .from('reports')
      .insert(reportData)
      .select()

    if (error) {
      console.error('❌ Supabase Error:', error)
      return NextResponse.json({
        error: 'Database error',
        details: error.message,
        hint: error.hint
      }, { status: 500 })
    }

    console.log('✅ REPORT CREATED SUCCESSFULLY:', data[0]?.id)

    return NextResponse.json({
      success: true,
      id: data[0]?.id,
      message: 'Report created for ZZM991 QLD',
      customer: 'sloshedau@gmail.com',
      data: data[0]
    })

  } catch (error) {
    console.error('❌ CRITICAL ERROR:', error)
    return NextResponse.json({
      error: 'Failed to create report',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Manual report creator ready',
    purpose: 'Create report for ZZM991 QLD purchase'
  })
}