import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    // Stripe Keys
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_exists: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_first_10: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 10),
    STRIPE_SECRET_KEY_exists: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_SECRET_KEY_first_10: process.env.STRIPE_SECRET_KEY?.substring(0, 10),

    // OpenAI Key
    OPENAI_API_KEY_exists: !!process.env.OPENAI_API_KEY,
    OPENAI_API_KEY_first_10: process.env.OPENAI_API_KEY?.substring(0, 10),

    // App URL
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,

    // All Keys Overview
    all_NEXT_PUBLIC_keys: Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_')),
    all_STRIPE_keys: Object.keys(process.env).filter(k => k.includes('STRIPE')),
    all_OPENAI_keys: Object.keys(process.env).filter(k => k.includes('OPENAI')),

    // Environment
    NODE_ENV: process.env.NODE_ENV,
  })
}
