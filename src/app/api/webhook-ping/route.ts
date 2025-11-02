import { NextRequest, NextResponse } from 'next/server'

// Simple webhook endpoint to test if Stripe can reach us
export async function POST(request: NextRequest) {
  console.log('🟢 WEBHOOK PING RECEIVED:', new Date().toISOString())
  console.log('🟢 Headers:', Object.fromEntries(request.headers.entries()))

  const body = await request.text()
  console.log('🟢 Body length:', body.length)
  console.log('🟢 Body preview:', body.substring(0, 200))

  return NextResponse.json({
    received: true,
    timestamp: new Date().toISOString(),
    message: 'Webhook ping successful'
  })
}

export async function GET() {
  return NextResponse.json({
    status: 'Webhook ping endpoint is ready',
    timestamp: new Date().toISOString()
  })
}