import { NextRequest, NextResponse } from 'next/server'
import { getMockScenario } from '@/lib/mock-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const vin = searchParams.get('vin')
    const rego = searchParams.get('rego')
    const state = searchParams.get('state')

    // Build vehicle identifier
    let vehicleInfo
    if (vin) {
      vehicleInfo = { type: 'vin' as const, vin }
    } else if (rego && state) {
      vehicleInfo = { type: 'rego' as const, rego, state }
    } else {
      return NextResponse.json({
        success: false,
        error: 'Missing vehicle information'
      }, { status: 400 })
    }

    console.log(`🎭 Using mock data for free preview: ${rego || vin} (${state || 'VIN lookup'})`);

    // Use mock scenario data for free previews (sustainable approach)
    const scenario = getMockScenario(vehicleInfo)

    return NextResponse.json({
      success: true,
      vehicle: {
        make: scenario.vehicleData.make,
        model: scenario.vehicleData.model,
        year: scenario.vehicleData.year,
        series: scenario.vehicleData.series,
        vin: scenario.vehicleData.vin || vin || `${scenario.vehicleData.make.toUpperCase().substring(0,3)}VIN${Date.now().toString().slice(-6)}`,
        rego: scenario.vehicleData.rego || rego,
        state: scenario.vehicleData.state || state,
        body: scenario.vehicleData.body,
        engine: scenario.vehicleData.engine,
        fuel: scenario.vehicleData.fuel,
        colour: scenario.vehicleData.colour,
        buildDate: scenario.vehicleData.buildDate,
        dataSource: 'Demo Preview - Purchase for Real Data',
        scenario: scenario.name // For debugging/testing
      }
    })

  } catch (error) {
    console.error('Vehicle info API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch vehicle information'
    }, { status: 500 })
  }
}