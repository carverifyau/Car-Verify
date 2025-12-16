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

      // Try to lookup VIN from PPSR Cloud - this confirms the rego exists
      try {
        const vinResult = await ppsrCloudClient.lookupVIN(rego, state)

        if (vinResult) {
          console.log(`✅ Rego validated - VIN found: ${vinResult}`)
          return NextResponse.json({
            valid: true,
            message: 'Registration number verified',
            vin: vinResult
          })
        } else {
          // VIN not found, but registration might still be valid
          // (PPSR Cloud VIN lookup doesn't cover all vehicles)
          console.log(`⚠️ VIN not found, but allowing rego`)
          return NextResponse.json({
            valid: true,
            message: 'Registration number format valid',
            warning: 'Could not verify registration in database'
          })
        }
      } catch (error) {
        console.error('Error validating rego:', error)
        // On error, allow the rego but warn
        return NextResponse.json({
          valid: true,
          message: 'Registration number format valid',
          warning: 'Could not verify registration in database'
        })
      }
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
