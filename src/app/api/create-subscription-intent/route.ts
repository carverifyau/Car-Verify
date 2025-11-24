import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import Stripe from 'stripe'

const getStripeClient = () => {
  const apiKey = process.env.STRIPE_SECRET_KEY
  if (!apiKey) {
    throw new Error('Stripe configuration error: Missing API key')
  }
  return new Stripe(apiKey)
}

const createSubscriptionIntentSchema = z.object({
  customerEmail: z.string().email('Valid email address is required'),
  vehicleInfo: z.object({
    type: z.enum(['vin', 'rego']),
    vin: z.string().optional(),
    rego: z.string().optional(),
    state: z.string().optional(),
  }).refine(
    (data) => {
      if (data.type === 'rego') {
        return data.rego && data.rego.trim() !== '' && data.state && data.state.trim() !== ''
      }
      if (data.type === 'vin') {
        return data.vin && data.vin.trim() !== ''
      }
      return false
    },
    {
      message: 'For rego lookups, both registration and state are required. For VIN lookups, VIN is required.',
    }
  ),
  reportType: z.enum(['standard', 'premium', 'comprehensive']),
})

export async function POST(request: NextRequest) {
  try {
    console.log('[SUBSCRIPTION INTENT] Received request')

    const body = await request.json()
    const validatedData = createSubscriptionIntentSchema.parse(body)

    const stripe = getStripeClient()

    // Create or retrieve customer
    const customers = await stripe.customers.list({
      email: validatedData.customerEmail,
      limit: 1,
    })

    let customer
    if (customers.data.length > 0) {
      customer = customers.data[0]
      console.log('[SUBSCRIPTION INTENT] Existing customer found:', customer.id)
    } else {
      customer = await stripe.customers.create({
        email: validatedData.customerEmail,
        metadata: {
          vehicleType: validatedData.vehicleInfo.type,
          vehicleVin: validatedData.vehicleInfo.vin || '',
          vehicleRego: validatedData.vehicleInfo.rego || '',
          vehicleState: validatedData.vehicleInfo.state || '',
        },
      })
      console.log('[SUBSCRIPTION INTENT] New customer created:', customer.id)
    }

    // Create or get the coupon for $19 off
    let couponId = 'first-check-discount'
    try {
      await stripe.coupons.retrieve(couponId)
    } catch (error) {
      await stripe.coupons.create({
        id: couponId,
        amount_off: 1900,
        currency: 'aud',
        duration: 'once',
        name: 'First PPSR Check - $1 Trial',
      })
    }

    // Create subscription with payment collection
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: 'Car Verify PPSR Subscription',
              description: '10 PPSR certificate checks per month',
            },
            unit_amount: 2000, // $20
            recurring: {
              interval: 'month',
            },
          },
        },
      ],
      discounts: [{
        coupon: couponId,
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        customerEmail: validatedData.customerEmail,
        vehicleType: validatedData.vehicleInfo.type,
        vehicleVin: validatedData.vehicleInfo.vin || '',
        vehicleRego: validatedData.vehicleInfo.rego || '',
        vehicleState: validatedData.vehicleInfo.state || '',
        reportType: validatedData.reportType,
        checksPerMonth: '10',
      },
    })

    const invoice = subscription.latest_invoice as Stripe.Invoice
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent

    console.log('[SUBSCRIPTION INTENT] Subscription created:', subscription.id)
    console.log('[SUBSCRIPTION INTENT] Payment Intent:', paymentIntent.id)

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
    })

  } catch (error) {
    console.error('[SUBSCRIPTION INTENT ERROR]:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        error: 'Failed to create subscription intent',
        message: errorMessage,
      },
      { status: 500 }
    )
  }
}
