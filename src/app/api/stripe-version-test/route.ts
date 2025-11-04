import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const getStripeClient = () => {
  const apiKey = process.env.STRIPE_SECRET_KEY || 'sk_placeholder_key'
  return new Stripe(apiKey, {
    apiVersion: '2024-12-18.acacia',
  })
}

export async function GET() {
  try {
    const stripe = getStripeClient()

    // Try to make a simple API call to test the version
    const account = await stripe.accounts.retrieve()

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Stripe API version is working correctly',
      apiVersion: '2024-12-18.acacia',
      accountId: account.id,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      status: 'ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
      apiVersion: '2024-12-18.acacia',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}