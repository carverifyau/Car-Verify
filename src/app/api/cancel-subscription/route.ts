import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/supabase-auth'
import { supabaseAdmin } from '@/lib/supabase'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { subscriptionId } = await request.json()

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      )
    }

    // Verify that this subscription belongs to the current user
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('stripe_subscription_id', subscriptionId)
      .eq('customer_id', user.id)
      .single()

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Cancel the subscription in Stripe
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })

    // Update the subscription in the database
    await supabaseAdmin
      .from('subscriptions')
      .update({
        cancel_at: new Date(updatedSubscription.cancel_at! * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscriptionId)

    return NextResponse.json({
      success: true,
      message: 'Subscription will be canceled at the end of the billing period',
    })
  } catch (error) {
    console.error('Cancel subscription error:', error)
    return NextResponse.json(
      {
        error: 'Failed to cancel subscription',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
