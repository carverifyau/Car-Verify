import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import Stripe from 'stripe'
import { isPPSRMaintenanceWindow, formatTimeRemaining, getTimeUntilMaintenanceEnds } from '@/lib/ppsr-maintenance'

const getStripeClient = () => {
  const apiKey = process.env.STRIPE_SECRET_KEY
  if (!apiKey) {
    throw new Error('Stripe configuration error: Missing API key')
  }
  return new Stripe(apiKey, {
    apiVersion: '2025-08-27.basil',
  })
}

const createPaymentIntentSchema = z.object({
  customerEmail: z.string().email('Valid email address is required'),
  customerName: z.string().optional(),
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
    console.log('[PAYMENT INTENT] Received request')

    // Check if PPSR Cloud is in maintenance window
    const maintenanceStatus = isPPSRMaintenanceWindow()
    if (maintenanceStatus.isInMaintenance) {
      console.log('[PAYMENT INTENT] Blocked - PPSR maintenance window active')
      const timeRemaining = getTimeUntilMaintenanceEnds()
      const timeMessage = timeRemaining ? ` Service will be available in ${formatTimeRemaining(timeRemaining)}.` : ''

      return NextResponse.json(
        {
          error: 'Service temporarily unavailable',
          message: maintenanceStatus.message + timeMessage,
          maintenanceWindow: {
            start: maintenanceStatus.maintenanceWindow?.start,
            end: maintenanceStatus.maintenanceWindow?.end,
          },
        },
        { status: 503 }
      )
    }

    const body = await request.json()
    const validatedData = createPaymentIntentSchema.parse(body)

    const stripe = getStripeClient()

    // Create or retrieve customer
    const customers = await stripe.customers.list({
      email: validatedData.customerEmail,
      limit: 1,
    })

    let customer
    if (customers.data.length > 0) {
      customer = customers.data[0]
      console.log('[PAYMENT INTENT] Existing customer found:', customer.id)
    } else {
      customer = await stripe.customers.create({
        email: validatedData.customerEmail,
        name: validatedData.customerName,
        metadata: {
          vehicleType: validatedData.vehicleInfo.type,
          vehicleVin: validatedData.vehicleInfo.vin || '',
          vehicleRego: validatedData.vehicleInfo.rego || '',
          vehicleState: validatedData.vehicleInfo.state || '',
        },
      })
      console.log('[PAYMENT INTENT] New customer created:', customer.id)
    }

    // Create payment intent for one-time payment ($19.99 AUD)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999, // $19.99 in cents
      currency: 'aud',
      customer: customer.id,
      receipt_email: validatedData.customerEmail,
      metadata: {
        customerEmail: validatedData.customerEmail,
        customerName: validatedData.customerName || '',
        vehicleType: validatedData.vehicleInfo.type,
        vehicleVin: validatedData.vehicleInfo.vin || '',
        vehicleRego: validatedData.vehicleInfo.rego || '',
        vehicleState: validatedData.vehicleInfo.state || '',
        reportType: validatedData.reportType,
        productType: 'single_report',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    console.log('[PAYMENT INTENT] Payment Intent created:', paymentIntent.id)

    if (!paymentIntent.client_secret) {
      throw new Error('Payment intent missing client secret')
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      customerId: customer.id,
    })

  } catch (error) {
    console.error('Payment intent creation error:', error)

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
        error: 'Failed to create payment intent',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}