import { NextRequest, NextResponse } from 'next/server'
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
      }
    }

    if (!user) {
      console.log('❌ No valid authentication found')
      return NextResponse.json(
        { error: 'Unauthorized - Please log in to manage your subscription' },
        { status: 401 }
      )
    }

    // Get customer's Stripe ID
    const { data: customer } = await supabaseAdmin
      .from('customers')
      .select('stripe_customer_id, email')
      .eq('id', user.id)
      .single()

    if (!customer?.stripe_customer_id) {
      console.log('❌ No Stripe customer ID found for user:', user.id)
      return NextResponse.json(
        { error: 'No subscription found. Please contact support.' },
        { status: 404 }
      )
    }

    console.log('📋 Creating portal session for customer:', customer.stripe_customer_id, customer.email)

    // Verify customer exists in Stripe first
    try {
      const stripeCustomer = await stripe.customers.retrieve(customer.stripe_customer_id)
      console.log('✅ Stripe customer verified:', stripeCustomer.id)
    } catch (verifyError) {
      console.error('❌ Customer not found in Stripe:', customer.stripe_customer_id, verifyError)
      return NextResponse.json(
        {
          error: 'Subscription data mismatch. Please contact support.',
          details: `Customer ${customer.stripe_customer_id} not found in Stripe`
        },
        { status: 404 }
      )
    }

    // Create a Stripe Customer Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://carverify.com.au'}/account`,
    })

    console.log('✅ Portal session created:', session.id)

    return NextResponse.json({
      url: session.url,
    })
  } catch (error) {
    console.error('❌ Error creating portal session:', error)
    return NextResponse.json(
      {
        error: 'Failed to create portal session',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
