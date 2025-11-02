import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Testing Supabase connection...')

    // Test creating a report entry
    const testData = {
      order_id: `test_${Date.now()}`,
      customer_email: 'test@example.com',
      customer_name: 'Test User',
      vehicle_identifier: {
        type: 'rego',
        rego: 'TEST123',
        state: 'QLD'
      },
      report_type: 'STANDARD',
      status: 'pending',
      report_data: {
        test: true,
        created_at: new Date().toISOString()
      }
    }

    const { data, error } = await supabaseAdmin
      .from('reports')
      .insert(testData)
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error
        },
        { status: 500 }
      )
    }

    console.log('✅ Test report created:', data[0]?.id)

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      reportId: data[0]?.id,
      data: data[0]
    })

  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Test failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}