import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import Stripe from 'stripe'
import { isPPSRMaintenanceWindow, formatTimeRemaining, getTimeUntilMaintenanceEnds } from '@/lib/ppsr-maintenance'

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

    // Check if PPSR Cloud is in maintenance window
    const maintenanceStatus = isPPSRMaintenanceWindow()
    if (maintenanceStatus.isInMaintenance) {
      console.log('[SUBSCRIPTION INTENT] Blocked - PPSR maintenance window active')
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

    // No trial coupon needed for Casual plan

    // Create or get product
    const products = await stripe.products.list({
      limit: 1,
    })

    let product
    if (products.data.length > 0 && products.data[0].name === 'Car Verify Casual Plan') {
      product = products.data[0]
    } else {
      product = await stripe.products.create({
        name: 'Car Verify Casual Plan',
        description: 'Unlimited PPSR reports with full online access and PDF downloads',
      })
    }

    // Create or get price for the product
    const prices = await stripe.prices.list({
      product: product.id,
      limit: 1,
    })

    let price
    if (prices.data.length > 0) {
      price = prices.data[0]
    } else {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: 50, // $0.50
        currency: 'aud',
        recurring: {
          interval: 'month',
        },
      })
    }

    // Create subscription with payment collection (no trial for Casual plan)
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: price.id,
        },
      ],
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
        planName: 'Casual',
        checksPerMonth: 'unlimited',
        pdfDownload: 'true',
        fullOnlineAccess: 'true',
        marketValuations: 'coming_soon',
      },
    })

    console.log('[SUBSCRIPTION INTENT] Subscription created:', subscription.id)

    // Get the latest invoice
    const latestInvoice = subscription.latest_invoice
    const invoiceId = typeof latestInvoice === 'string' ? latestInvoice : latestInvoice?.id

    if (!invoiceId) {
      throw new Error('No invoice created with subscription')
    }

    // Retrieve the invoice with payment_intent expanded
    const invoice = await stripe.invoices.retrieve(invoiceId, {
      expand: ['payment_intent'],
    })

    console.log('[SUBSCRIPTION INTENT] Invoice ID:', invoice.id)
    console.log('[SUBSCRIPTION INTENT] Invoice status:', invoice.status)
    console.log('[SUBSCRIPTION INTENT] Payment intent:', invoice.payment_intent)

    // If no payment intent exists, create one manually
    if (!invoice.payment_intent) {
      console.log('[SUBSCRIPTION INTENT] No payment intent, creating one manually')
      const paymentIntent = await stripe.paymentIntents.create({
        amount: invoice.amount_due,
        currency: invoice.currency,
        customer: customer.id,
        setup_future_usage: 'off_session', // Save payment method for recurring charges
        metadata: {
          invoice_id: invoice.id,
          subscription_id: subscription.id,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      })

      console.log('[SUBSCRIPTION INTENT] Payment Intent created:', paymentIntent.id)

      return NextResponse.json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
        customerId: customer.id,
      })
    }

    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent

    if (!paymentIntent.client_secret) {
      throw new Error('Payment intent missing client secret')
    }

    console.log('[SUBSCRIPTION INTENT] Payment Intent ID:', paymentIntent.id)

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
