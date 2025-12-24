import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

// Initialize Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

// Stripe Price IDs (you'll need to create these in Stripe Dashboard)
export const STRIPE_PLANS = {
  casual: {
    priceId: process.env.STRIPE_CASUAL_PRICE_ID || 'price_casual_placeholder',
    trialAmount: 100, // $1 in cents
    recurringAmount: 1999, // $19.99 in cents
    interval: 'month' as const,
    trialDays: 7,
    name: 'Casual',
  },
  plus: {
    priceId: process.env.STRIPE_PLUS_PRICE_ID || 'price_plus_placeholder',
    trialAmount: 500, // $5 in cents
    recurringAmount: 1499, // $14.99 in cents
    interval: 'month' as const,
    intervalCount: 3, // Billed every 3 months
    trialDays: 7,
    name: 'Plus',
  },
}

/**
 * Create a Stripe checkout session for subscription with trial
 */
export async function createCheckoutSession({
  plan,
  email,
  vehicleData,
  successUrl,
  cancelUrl,
}: {
  plan: 'casual' | 'plus'
  email: string
  vehicleData: {
    rego: string
    state: string
    make: string
    model: string
    year: string
    vin: string
  }
  successUrl: string
  cancelUrl: string
}) {
  const planConfig = STRIPE_PLANS[plan]

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: `Car Verify ${planConfig.name} Plan`,
              description: `${planConfig.trialDays}-day trial, then ${
                plan === 'casual' ? '$19.99/month' : '$14.99/month (billed quarterly)'
              }`,
            },
            recurring: {
              interval: planConfig.interval,
              interval_count: planConfig.intervalCount || 1,
            },
            unit_amount: planConfig.recurringAmount,
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: planConfig.trialDays,
        metadata: {
          plan,
          rego: vehicleData.rego,
          state: vehicleData.state,
          make: vehicleData.make,
          model: vehicleData.model,
          year: vehicleData.year,
          vin: vehicleData.vin,
        },
      },
      metadata: {
        plan,
        email,
        rego: vehicleData.rego,
        state: vehicleData.state,
        make: vehicleData.make,
        model: vehicleData.model,
        year: vehicleData.year,
        vin: vehicleData.vin,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: false,
    })

    return session
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error)
    throw error
  }
}

/**
 * Get subscription details
 */
export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return subscription
  } catch (error) {
    console.error('Error retrieving subscription:', error)
    throw error
  }
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
    return subscription
  } catch (error) {
    console.error('Error canceling subscription:', error)
    throw error
  }
}
