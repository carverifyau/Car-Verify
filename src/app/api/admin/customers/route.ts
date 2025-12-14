import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    // Fetch all customers from Supabase
    const { data: customers, error } = await supabaseAdmin
      .from('customers')
      .select('id, email, name')
      .order('email', { ascending: true })

    if (error) {
      console.error('Error fetching customers:', error)
      return NextResponse.json(
        { error: 'Failed to fetch customers' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      customers: customers || []
    })
  } catch (error) {
    console.error('Error in GET /api/admin/customers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
