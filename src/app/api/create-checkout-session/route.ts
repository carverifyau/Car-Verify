import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

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
    const body = await request.json()
    const validatedData = createCheckoutSessionSchema.parse(body)

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
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?${new URLSearchParams({
        ...(validatedData.vehicleInfo.type === 'vin'
          ? { vin: validatedData.vehicleInfo.vin || '' }
          : {
              rego: validatedData.vehicleInfo.rego || '',
              state: validatedData.vehicleInfo.state || ''
            }
        )
      }).toString()}`,
    })

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    })

  } catch (error) {
    console.error('Checkout session creation error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}