import { NextResponse } from 'next/server'

export async function GET() {
  // Debug environment variables access in production
  console.log('🔍 DEBUG ENV ACCESS:')
  console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY?.substring(0, 20) + '...')
  console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...')

  const envCheck = {
    nodeEnv: process.env.NODE_ENV,

    // Raw values (first 20 chars for debugging)
    stripeSecretKeyRaw: process.env.STRIPE_SECRET_KEY?.substring(0, 20) || 'NOT_FOUND',
    supabaseUrlRaw: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) || 'NOT_FOUND',
    supabaseAnonKeyRaw: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 30) || 'NOT_FOUND',

    // Boolean checks
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET ✅' : 'MISSING ❌',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET ✅' : 'MISSING ❌',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET ✅' : 'MISSING ❌',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY ? 'SET ✅' : 'MISSING ❌',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ? 'SET ✅' : 'MISSING ❌',

    // Check if they're placeholder values
    isStripePlaceholder: process.env.STRIPE_SECRET_KEY === 'sk_placeholder_key',
    isSupabaseUrlPlaceholder: process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co',

    timestamp: new Date().toISOString(),

    // All environment variables (for debugging)
    allEnvKeys: Object.keys(process.env).filter(key =>
      key.includes('STRIPE') || key.includes('SUPABASE')
    )
  }

  return NextResponse.json(envCheck)
}