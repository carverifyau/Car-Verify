import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    let user = null

    // Try to get user from Authorization header first (client-side auth)
    const authHeader = request.headers.get('authorization')
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      console.log('🔑 Using Bearer token from Authorization header')

      const { data, error } = await supabaseAdmin.auth.getUser(token)
      if (!error && data.user) {
        user = data.user
        console.log('✅ User authenticated via token:', user.id, user.email)
      } else {
        console.log('❌ Token validation failed:', error)
      }
    }

    // Fallback to cookie-based auth (server-side)
    if (!user) {
      console.log('🍪 Trying cookie-based authentication')
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

      const { data: { user: cookieUser } } = await supabase.auth.getUser()
      if (cookieUser) {
        user = cookieUser
        console.log('✅ User authenticated via cookies:', user.id, user.email)
      }
    }

    if (!user) {
      console.log('❌ No valid authentication found')
      return NextResponse.json(
        { error: 'Unauthorized - Please log in to cancel your subscription' },
        { status: 401 }
      )
    }

    console.log('🔐 User authenticated for cancellation:', user.id, user.email)

    const { subscriptionId } = await request.json()

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      )
    }

    // Verify that this subscription belongs to the current user
    console.log('🔍 Looking for subscription:', subscriptionId, 'for user:', user.id)

    const { data: subscription, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('stripe_subscription_id', subscriptionId)
      .eq('customer_id', user.id)
      .single()

    if (subError) {
      console.error('❌ Subscription lookup error:', subError)
    }

    if (!subscription) {
      console.error('❌ Subscription not found or does not belong to user')
      return NextResponse.json(
        { error: 'Subscription not found or you do not have permission to cancel it' },
        { status: 404 }
      )
    }

    console.log('✅ Subscription found:', subscription.id, subscription.status)

    // Cancel the subscription in Stripe
    console.log('🔄 Canceling subscription in Stripe...')
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })

    console.log('✅ Stripe subscription updated, cancel_at:', new Date(updatedSubscription.cancel_at! * 1000))

    // Update the subscription in the database
    const { error: updateError } = await supabaseAdmin
      .from('subscriptions')
      .update({
        cancel_at: new Date(updatedSubscription.cancel_at! * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscriptionId)

    if (updateError) {
      console.error('⚠️ Failed to update subscription in database:', updateError)
    } else {
      console.log('✅ Subscription updated in database')
    }

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
