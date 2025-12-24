import { NextRequest, NextResponse } from 'next/server'
import { ppsrCloudClient } from '@/lib/ppsr-cloud'

export const maxDuration = 60 // Allow up to 60 seconds for PPSR API calls

export async function POST(request: NextRequest) {
  try {
    const { rego, state, vin } = await request.json()

    if (!rego || !state) {
      return NextResponse.json(
        { error: 'Missing rego or state' },
        { status: 400 }
      )
    }

    console.log(`🚗 Generating PPSR report for ${rego} (${state})...`)

    // Perform complete PPSR check
    const result = await ppsrCloudClient.performPPSRCheck({
      vin,
      registrationPlate: rego,
      registrationState: state,
    })

    console.log('✅ PPSR report generated successfully')

    return NextResponse.json({
      success: true,
      report: {
        pdfBase64: result.pdfBase64,
        filename: result.filename,
        searchNumber: result.searchNumber,
        searchResult: result.searchResult,
        rego,
        state,
        vin: vin || null,
        generatedAt: new Date().toISOString(),
      },
    })

  } catch (error) {
    console.error('❌ PPSR report generation error:', error)
    return NextResponse.json(
      {
        error: 'PPSR report generation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
