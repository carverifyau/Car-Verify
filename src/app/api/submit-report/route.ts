import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { supabaseAdmin } from '@/lib/supabase'
import { cookies } from 'next/headers'

interface SubmitReportRequest {
  rego?: string
  state?: string
  vin?: string
  email?: string  // Optional email for non-authenticated submissions
}

export async function POST(request: NextRequest) {
  try {
    const { rego, state, vin, email }: SubmitReportRequest = await request.json()

    // Validate input
    if (!vin && (!rego || !state)) {
      return NextResponse.json(
        { error: 'Please provide either VIN or registration + state' },
        { status: 400 }
      )
    }

    let userId: string
    let userEmail: string

    // Check if email is provided (email-based submission)
    if (email) {
      console.log('📧 Email-based submission for:', email)

      // Find customer by email
      const { data: customer, error: customerError } = await supabaseAdmin
        .from('customers')
        .select('id, email')
        .eq('email', email.toLowerCase().trim())
        .single()

      if (customerError || !customer) {
        return NextResponse.json(
          { error: 'No account found with this email' },
          { status: 404 }
        )
      }

      userId = customer.id
      userEmail = customer.email
      console.log('✅ Customer found:', userId)
    } else {
      // Authenticated user submission
      const cookieStore = await cookies()
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            },
          },
        }
      )

      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.json(
          { error: 'Please log in or provide email to submit reports' },
          { status: 401 }
        )
      }

      userId = user.id
      userEmail = user.email!
      console.log('👤 Authenticated submission for:', userId, userEmail)
    }

    console.log('📋 Submitting report for user:', userId, userEmail)

    // Get user's subscription using admin client - get most recent active one
    const { data: subscriptions, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('customer_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)

    const subscription = subscriptions?.[0]

    if (subError || !subscription) {
      return NextResponse.json(
        { error: 'No active subscription found. Please subscribe to submit reports.' },
        { status: 403 }
      )
    }

    // Check subscription status
    if (subscription.status !== 'active') {
      return NextResponse.json(
        { error: `Your subscription is ${subscription.status}. Please reactivate to submit reports.` },
        { status: 403 }
      )
    }

    // Check if user has checks remaining
    const checksUsed = subscription.checks_used || 0
    const checksLimit = subscription.checks_limit || 10

    if (checksUsed >= checksLimit) {
      return NextResponse.json(
        {
          error: 'You have used all your monthly checks. Your limit will reset on your next billing date.',
          checksUsed,
          checksLimit,
          nextResetDate: subscription.current_period_end
        },
        { status: 403 }
      )
    }

    console.log('✅ Subscription valid. Checks used:', checksUsed, '/', checksLimit)

    // Get customer details
    const { data: customer } = await supabaseAdmin
      .from('customers')
      .select('email, name')
      .eq('id', userId)
      .single()

    // Create report in database
    const vehicleIdentifier = vin
      ? { type: 'vin', vin }
      : { type: 'rego', rego, state }

    const reportData = {
      customer_id: userId,
      customer_email: customer?.email || userEmail,
      customer_name: customer?.name || 'Customer',
      vehicle_identifier: vehicleIdentifier,
      report_type: 'STANDARD',
      status: 'pending',
      order_id: `sub_report_${Date.now()}`,
      report_data: {
        subscription_report: true,
        subscription_id: subscription.stripe_subscription_id,
        created_at: new Date().toISOString()
      }
    }

    console.log('📝 Creating report:', reportData)

    const { data: newReport, error: reportError } = await supabaseAdmin
      .from('reports')
      .insert(reportData)
      .select()
      .single()

    if (reportError) {
      console.error('❌ Failed to create report:', reportError)
      return NextResponse.json(
        { error: 'Failed to create report', details: reportError.message },
        { status: 500 }
      )
    }

    console.log('✅ Report created:', newReport.id)

    // Increment checks_used
    const { error: updateError } = await supabaseAdmin
      .from('subscriptions')
      .update({
        checks_used: checksUsed + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscription.id)

    if (updateError) {
      console.error('⚠️ Failed to increment checks_used:', updateError)
      // Don't fail the request - report was created
    } else {
      console.log('✅ Checks used incremented to:', checksUsed + 1)
    }

    return NextResponse.json({
      success: true,
      reportId: newReport.id,
      checksRemaining: checksLimit - (checksUsed + 1),
      message: 'Report submitted successfully! We will process it within 2 hours during business hours.'
    })

  } catch (error) {
    console.error('❌ Error submitting report:', error)
    return NextResponse.json(
      {
        error: 'Failed to submit report',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
