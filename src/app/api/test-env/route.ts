import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_raw: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_first_10: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 10),
    STRIPE_SECRET_KEY_first_10: process.env.STRIPE_SECRET_KEY?.substring(0, 10),
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    all_NEXT_PUBLIC_keys: Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_')),
    all_STRIPE_keys: Object.keys(process.env).filter(k => k.includes('STRIPE')),
  })
}
