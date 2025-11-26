import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    console.log('🔍 Checking subscription for email:', email)

    // Find customer by email
    const { data: customer, error: customerError } = await supabaseAdmin
      .from('customers')
      .select('id, email, name')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (customerError || !customer) {
      console.log('❌ No customer found for email:', email)
      return NextResponse.json({
        hasSubscription: false,
        message: 'No account found'
      })
    }

    console.log('👤 Customer found:', customer.id, customer.email)

    // Check for active subscription - get the most recent one
    const { data: subscriptions, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .select('id, status, checks_used, checks_limit, current_period_end')
      .eq('customer_id', customer.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)

    console.log('📊 Subscription query result:', { subscriptions, error: subError })

    const subscription = subscriptions?.[0]

    if (subError || !subscription) {
      console.log('❌ No subscription found for customer:', customer.id, 'Error:', subError)
      return NextResponse.json({
        hasSubscription: false,
        message: 'No subscription found'
      })
    }

    if (subscription.status !== 'active') {
      console.log('⚠️ Subscription not active:', subscription.status)
      return NextResponse.json({
        hasSubscription: false,
        subscriptionStatus: subscription.status,
        message: `Subscription is ${subscription.status}`
      })
    }

    const checksUsed = subscription.checks_used || 0
    const checksLimit = subscription.checks_limit || 10
    const checksRemaining = checksLimit - checksUsed

    if (checksRemaining <= 0) {
      console.log('⚠️ No checks remaining')
      return NextResponse.json({
        hasSubscription: true,
        hasChecksRemaining: false,
        checksUsed,
        checksLimit,
        message: 'No checks remaining this month'
      })
    }

    console.log('✅ Active subscription found with checks remaining:', checksRemaining)

    return NextResponse.json({
      hasSubscription: true,
      hasChecksRemaining: true,
      customerId: customer.id,
      customerName: customer.name,
      checksRemaining,
      checksUsed,
      checksLimit,
      message: 'Active subscription found'
    })

  } catch (error) {
    console.error('❌ Error checking subscription:', error)
    return NextResponse.json(
      {
        error: 'Failed to check subscription',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
