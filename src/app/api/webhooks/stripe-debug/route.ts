import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headers = Object.fromEntries(request.headers.entries())

    console.log('🔍 DEBUG WEBHOOK RECEIVED')
    console.log('Headers:', headers)
    console.log('Body preview:', body.substring(0, 500))

    // Try to parse as JSON if possible
    try {
      const parsed = JSON.parse(body)
      console.log('Parsed webhook type:', parsed.type)
      console.log('Parsed object ID:', parsed.data?.object?.id)
    } catch (e) {
      console.log('Body is not JSON, probably raw webhook payload')
    }

    return NextResponse.json({
      received: true,
      message: 'Debug webhook received',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Debug webhook error:', error)
    return NextResponse.json(
      { error: 'Debug webhook failed' },
      { status: 500 }
    )
  }
}