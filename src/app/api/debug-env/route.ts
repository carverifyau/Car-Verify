import { NextResponse } from 'next/server'

export async function GET() {
  // Only expose this in development or if a debug flag is set
  const isDev = process.env.NODE_ENV === 'development'

  if (!isDev) {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  const envCheck = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'MISSING',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY ? 'SET' : 'MISSING',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ? 'SET' : 'MISSING',
    nodeEnv: process.env.NODE_ENV
  }

  return NextResponse.json(envCheck)
}