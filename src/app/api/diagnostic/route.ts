import { NextResponse } from 'next/server'

export async function GET() {
  // Safe diagnostic - shows if vars are set without exposing values
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,

    criticalIssues: [] as string[],

    envVars: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
        ? `✅ Set (${process.env.STRIPE_SECRET_KEY.substring(0, 7)}...${process.env.STRIPE_SECRET_KEY.length} chars)`
        : '❌ NOT SET - Payment API will fail!',
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        ? `✅ Set (${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.substring(0, 7)}...${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.length} chars)`
        : '❌ NOT SET - Stripe cannot initialize on client!',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
        ? `✅ Set: ${process.env.NEXT_PUBLIC_APP_URL}`
        : '❌ NOT SET - Checkout redirect URLs will fail!',
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET
        ? `✅ Set (${process.env.STRIPE_WEBHOOK_SECRET.length} chars)`
        : '⚠️ NOT SET - Webhooks will not work',
    },

    stripeKeyValidation: {
      secretKeyFormat: process.env.STRIPE_SECRET_KEY?.startsWith('sk_') ? '✅ Valid format' : '❌ Invalid format',
      publishableKeyFormat: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_') ? '✅ Valid format' : '❌ Invalid format or not set',
      secretKeyType: process.env.STRIPE_SECRET_KEY?.includes('test') ? 'TEST MODE' : process.env.STRIPE_SECRET_KEY?.includes('live') ? 'LIVE MODE' : 'Unknown',
      publishableKeyType: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.includes('test') ? 'TEST MODE' : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.includes('live') ? 'LIVE MODE' : 'Unknown',
      keysMatch: process.env.STRIPE_SECRET_KEY?.includes('test') === process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.includes('test')
        ? '✅ Keys are both test or both live'
        : '❌ Keys mismatch - one is test, one is live!',
    }
  }

  // Identify critical issues
  if (!process.env.STRIPE_SECRET_KEY) {
    diagnostics.criticalIssues.push('STRIPE_SECRET_KEY is missing')
  }
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    diagnostics.criticalIssues.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing - THIS IS WHY PAYMENT FAILS')
  }
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    diagnostics.criticalIssues.push('NEXT_PUBLIC_APP_URL is missing')
  }

  console.log('[DIAGNOSTIC] Full diagnostics:', JSON.stringify(diagnostics, null, 2))

  return NextResponse.json(diagnostics)
}
