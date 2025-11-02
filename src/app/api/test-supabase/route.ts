import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('🟢 TESTING SUPABASE CONNECTION')
    console.log('🟢 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...')
    console.log('🟢 Service Key Available:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

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

    console.log('🟢 Attempting to insert test data...')
    const { data, error } = await supabaseAdmin
      .from('reports')
      .insert(testData)
      .select()

    if (error) {
      console.error('🔴 Supabase error:', error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error,
          envCheck: {
            supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            serviceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
          }
        },
        { status: 500 }
      )
    }

    console.log('🟢 Test report created successfully:', data[0]?.id)

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful!',
      reportId: data[0]?.id,
      data: data[0]
    })

  } catch (error) {
    console.error('🔴 Test error:', error)
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

export async function GET() {
  try {
    console.log('🟢 TESTING SUPABASE READ')

    // Test reading from reports table
    const { data, error } = await supabaseAdmin
      .from('reports')
      .select('*')
      .limit(5)

    if (error) {
      console.error('🔴 Supabase read error:', error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error
        },
        { status: 500 }
      )
    }

    console.log('🟢 Successfully read from reports table:', data?.length, 'records')

    return NextResponse.json({
      success: true,
      message: 'Supabase read successful!',
      recordCount: data?.length || 0,
      records: data
    })

  } catch (error) {
    console.error('🔴 Read test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Read test failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}