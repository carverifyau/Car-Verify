import { NextRequest, NextResponse } from 'next/server'
import { ppsrCloudClient } from '@/lib/ppsr-cloud'

/**
 * Validate vehicle details before checkout
 * POST /api/validate-vehicle
 */
export async function POST(request: NextRequest) {
  try {
    const { rego, state, vin } = await request.json()

    // Validate VIN if provided
    if (vin) {
      // VIN must be exactly 17 characters
      if (vin.length !== 17) {
        return NextResponse.json(
          {
            valid: false,
            error: 'VIN must be exactly 17 characters',
            field: 'vin'
          },
          { status: 400 }
        )
      }

      // Check if VIN contains only valid characters (alphanumeric, no I, O, Q)
      if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
        return NextResponse.json(
          {
            valid: false,
            error: 'Invalid VIN format. VINs cannot contain I, O, or Q',
            field: 'vin'
          },
          { status: 400 }
        )
      }

      return NextResponse.json({
        valid: true,
        message: 'VIN format is valid'
      })
    }

    // Validate rego if provided
    if (rego && state) {
      // Basic format validation
      if (rego.length < 3 || rego.length > 8) {
        return NextResponse.json(
          {
            valid: false,
            error: 'Registration number must be between 3 and 8 characters',
            field: 'rego'
          },
          { status: 400 }
        )
      }

      console.log(`🔍 Validating rego: ${rego} (${state})`)

      // Basic format validation passed - allow the rego through
      // Note: PPSR Cloud VIN lookup doesn't contain all vehicles,
      // only those previously searched. We'll validate during actual PPSR check.
      console.log(`✅ Rego format valid: ${rego} (${state})`)

      return NextResponse.json({
        valid: true,
        message: 'Registration format valid'
      })
    }

    return NextResponse.json(
      {
        valid: false,
        error: 'Please provide either VIN or registration details'
      },
      { status: 400 }
    )

  } catch (error) {
    console.error('Validation error:', error)
    return NextResponse.json(
      {
        valid: false,
        error: 'Validation failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
