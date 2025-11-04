import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import Stripe from 'stripe'

const getStripeClient = () => {
  const apiKey = process.env.STRIPE_SECRET_KEY
  if (!apiKey) {
    console.error('[STRIPE ERROR] STRIPE_SECRET_KEY is not set in environment variables')
    throw new Error('Stripe configuration error: Missing API key')
  }

  // Validate key format
  if (!apiKey.startsWith('sk_')) {
    console.error('[STRIPE ERROR] STRIPE_SECRET_KEY has invalid format')
    throw new Error('Stripe configuration error: Invalid API key format')
  }

  console.log('[STRIPE] Initializing Stripe with key:', apiKey.substring(0, 10) + '...')

  return new Stripe(apiKey, {
    apiVersion: '2023-10-16',
  })
}

const createCheckoutSessionSchema = z.object({
  customerEmail: z.string().email('Valid email address is required'),
  vehicleInfo: z.object({
    type: z.enum(['vin', 'rego']),
    vin: z.string().optional(),
    rego: z.string().optional(),
    state: z.string().optional(),
  }),
  reportType: z.enum(['standard', 'premium', 'comprehensive']),
})

export async function POST(request: NextRequest) {
  try {
    console.log('[CHECKOUT] Received checkout session request')

    const body = await request.json()
    console.log('[CHECKOUT] Request body:', JSON.stringify(body, null, 2))

    const validatedData = createCheckoutSessionSchema.parse(body)
    console.log('[CHECKOUT] Validation successful')

    // Check NEXT_PUBLIC_APP_URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL
    console.log('[CHECKOUT] NEXT_PUBLIC_APP_URL:', appUrl)

    if (!appUrl) {
      console.error('[CHECKOUT ERROR] NEXT_PUBLIC_APP_URL is not set!')
      throw new Error('Configuration error: NEXT_PUBLIC_APP_URL is not set')
    }

    const stripe = getStripeClient()
    console.log('[CHECKOUT] Stripe client initialized, creating session...')

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: 'Comprehensive Vehicle Report',
              description: 'Complete vehicle history including PPSR, write-off history, market valuation and more',
            },
            unit_amount: 3499, // $34.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: validatedData.customerEmail,
      metadata: {
        customerEmail: validatedData.customerEmail,
        vehicleType: validatedData.vehicleInfo.type,
        vehicleVin: validatedData.vehicleInfo.vin || '',
        vehicleRego: validatedData.vehicleInfo.rego || '',
        vehicleState: validatedData.vehicleInfo.state || '',
        reportType: validatedData.reportType,
      },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout?${new URLSearchParams({
        ...(validatedData.vehicleInfo.type === 'vin'
          ? { vin: validatedData.vehicleInfo.vin || '' }
          : {
              rego: validatedData.vehicleInfo.rego || '',
              state: validatedData.vehicleInfo.state || ''
            }
        )
      }).toString()}`,
    })

    console.log('[CHECKOUT] Session created successfully:', session.id)
    console.log('[CHECKOUT] Checkout URL:', session.url)

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    })

  } catch (error) {
    console.error('[CHECKOUT ERROR] Full error details:', error)

    if (error instanceof z.ZodError) {
      console.error('[CHECKOUT ERROR] Validation failed:', error.issues)
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[CHECKOUT ERROR] Error message:', errorMessage)

    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        message: errorMessage,
      },
      { status: 500 }
    )
  }
}