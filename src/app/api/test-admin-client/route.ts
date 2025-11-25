import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    // Test if we can query customers table
    const { data, error } = await supabaseAdmin
      .from('customers')
      .select('email')
      .limit(1)

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        serviceKeyPrefix: process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 10)
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Admin client working',
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      canQuery: true,
      sampleData: data
    })
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: e instanceof Error ? e.message : 'Unknown error',
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    })
  }
}
