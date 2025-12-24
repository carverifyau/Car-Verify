import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan, email, vehicleData } = body

    // Validate required fields
    if (!plan || !email || !vehicleData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate plan
    if (plan !== 'casual' && plan !== 'plus') {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      )
    }

    // Validate email
    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Validate vehicle data
    if (!vehicleData.rego || !vehicleData.state || !vehicleData.make || !vehicleData.model) {
      return NextResponse.json(
        { error: 'Invalid vehicle data' },
        { status: 400 }
      )
    }

    // Get the base URL for success/cancel redirects
    const baseUrl = request.headers.get('origin') || 'http://localhost:3000'

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      plan,
      email,
      vehicleData: {
        rego: vehicleData.rego,
        state: vehicleData.state,
        make: vehicleData.make,
        model: vehicleData.model,
        year: vehicleData.year,
        vin: vehicleData.vin,
      },
      successUrl: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/vehicle-search?rego=${vehicleData.rego}&state=${vehicleData.state}&vehicle_vin=${vehicleData.vin}&vehicle_make=${vehicleData.make}&vehicle_model=${vehicleData.model}&vehicle_year=${vehicleData.year}`,
    })

    console.log('✅ Stripe checkout session created:', session.id)

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error('❌ Error creating checkout session:', error)
    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
