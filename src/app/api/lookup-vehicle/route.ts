import { NextRequest, NextResponse } from 'next/server'
import { carRegistrationAPI } from '@/lib/car-registration-api'

export const maxDuration = 30 // Allow 30 seconds for VIN lookup + decode

interface VINDecodeResponse {
  Results: Array<{
    Variable: string
    Value: string
    ValueId: string
  }>
}

async function decodeVIN(vin: string): Promise<{
  make: string | null
  model: string | null
  year: string | null
}> {
  try {
    console.log('🔍 Decoding VIN:', vin)

    // Use NHTSA free VIN decoder API
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`
    )

    if (!response.ok) {
      console.error('❌ VIN decode failed:', response.status)
      return { make: null, model: null, year: null }
    }

    const data: VINDecodeResponse = await response.json()

    // Extract make, model, year from results
    const make = data.Results.find(r => r.Variable === 'Make')?.Value || null
    const model = data.Results.find(r => r.Variable === 'Model')?.Value || null
    const year = data.Results.find(r => r.Variable === 'Model Year')?.Value || null

    console.log('✅ VIN decoded:', { make, model, year })

    return { make, model, year }
  } catch (error) {
    console.error('❌ VIN decode error:', error)
    return { make: null, model: null, year: null }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { rego, state } = await request.json()

    if (!rego || !state) {
      return NextResponse.json(
        { error: 'Missing rego or state' },
        { status: 400 }
      )
    }

    console.log('🚗 Looking up vehicle:', rego, state)

    // Use CarRegistrationAPI - only $0.30 per lookup
    const vehicleData = await carRegistrationAPI.lookupVehicle(rego, state)

    if (!vehicleData) {
      console.log('⚠️ Vehicle not found via CarRegistrationAPI')
      return NextResponse.json(
        {
          success: false,
          error: 'Vehicle not found',
          message: 'Could not find vehicle details for this registration'
        },
        { status: 404 }
      )
    }

    // Extract make/model/year from response
    let make = vehicleData.make
    let model = vehicleData.model
    let year = vehicleData.year
    const vin = vehicleData.vin

    // If we got a VIN but no make/model/year, decode the VIN
    if (vin && (!make || !model || !year)) {
      console.log('🔍 Decoding VIN to get missing details...')
      const decodedDetails = await decodeVIN(vin)
      make = make || decodedDetails.make
      model = model || decodedDetails.model
      year = year || decodedDetails.year
    }

    if (!make || !model || !year) {
      console.log('⚠️ Could not determine vehicle details')
      return NextResponse.json(
        {
          success: false,
          error: 'Vehicle details not available',
          message: 'Found vehicle but could not determine all details'
        },
        { status: 404 }
      )
    }

    console.log('🎉 Vehicle lookup successful!')

    return NextResponse.json({
      success: true,
      vehicle: {
        vin,
        make,
        model,
        year,
        rego,
        state
      }
    })

  } catch (error) {
    console.error('❌ Vehicle lookup error:', error)
    return NextResponse.json(
      {
        error: 'Vehicle lookup failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
