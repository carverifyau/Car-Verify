import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, paymentIntentId } = await request.json()

    if (!sessionId && !paymentIntentId) {
      return NextResponse.json(
        { error: 'Missing session ID or payment intent ID' },
        { status: 400 }
      )
    }

    console.log('[VERIFY-PAYMENT] Received sessionId:', sessionId, 'paymentIntentId:', paymentIntentId)

    // Handle PaymentIntent verification (one-time payments)
    if (paymentIntentId) {
      console.log('[VERIFY-PAYMENT] Detected payment intent ID, retrieving payment intent...')
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

      console.log('[VERIFY-PAYMENT] PaymentIntent status:', paymentIntent.status)
      console.log('[VERIFY-PAYMENT] PaymentIntent metadata:', paymentIntent.metadata)

      // Verify payment succeeded
      if (paymentIntent.status !== 'succeeded') {
        return NextResponse.json(
          { error: 'Payment not completed' },
          { status: 400 }
        )
      }

      // Get customer email
      let customerEmail = paymentIntent.receipt_email || null
      if (!customerEmail && paymentIntent.customer) {
        const customer = await stripe.customers.retrieve(paymentIntent.customer as string)
        customerEmail = customer && !customer.deleted ? customer.email : null
      }

      // Return payment intent data including metadata
      return NextResponse.json({
        success: true,
        metadata: paymentIntent.metadata,
        customerEmail,
        amountTotal: paymentIntent.amount,
        currency: paymentIntent.currency,
      })
    }

    // Check if it's a subscription ID (starts with 'sub_') or checkout session (starts with 'cs_')
    if (sessionId && sessionId.startsWith('sub_')) {
      // Handle subscription verification
      console.log('[VERIFY-PAYMENT] Detected subscription ID, retrieving subscription...')
      const subscription = await stripe.subscriptions.retrieve(sessionId, {
        expand: ['latest_invoice', 'customer']
      })

      console.log('[VERIFY-PAYMENT] Subscription status:', subscription.status)
      console.log('[VERIFY-PAYMENT] Subscription metadata:', subscription.metadata)

      // Verify subscription is active or trialing
      if (subscription.status !== 'active' && subscription.status !== 'trialing') {
        return NextResponse.json(
          { error: 'Subscription not active' },
          { status: 400 }
        )
      }

      // Get customer email
      const customer = typeof subscription.customer === 'string'
        ? await stripe.customers.retrieve(subscription.customer)
        : subscription.customer

      const customerEmail = customer && !customer.deleted ? customer.email : null

      // Return subscription data including metadata
      return NextResponse.json({
        success: true,
        metadata: subscription.metadata,
        customerEmail,
        amountTotal: null, // Subscriptions don't have a single amount
        currency: subscription.currency,
      })

    } else if (sessionId.startsWith('cs_')) {
      // Handle checkout session verification (legacy flow)
      console.log('[VERIFY-PAYMENT] Detected checkout session ID, retrieving session...')
      const session = await stripe.checkout.sessions.retrieve(sessionId)

      // Verify payment was successful
      if (session.payment_status !== 'paid') {
        return NextResponse.json(
          { error: 'Payment not completed' },
          { status: 400 }
        )
      }

      // Return session data including metadata
      return NextResponse.json({
        success: true,
        metadata: session.metadata,
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total,
        currency: session.currency,
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid session ID format' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('❌ Error verifying payment:', error)
    return NextResponse.json(
      {
        error: 'Payment verification failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
