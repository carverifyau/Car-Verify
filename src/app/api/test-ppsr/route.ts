import { NextRequest, NextResponse } from 'next/server'
import { ppsrCloudClient } from '@/lib/ppsr-cloud'

/**
 * Test endpoint for PPSR Cloud integration
 * GET /api/test-ppsr?rego=ABC123&state=QLD
 * or
 * GET /api/test-ppsr?vin=1HGBH41JXMN109186
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const rego = searchParams.get('rego')
    const state = searchParams.get('state')
    const vin = searchParams.get('vin')

    if (!vin && (!rego || !state)) {
      return NextResponse.json(
        { error: 'Please provide either VIN or both rego and state parameters' },
        { status: 400 }
      )
    }

    console.log('🧪 Testing PPSR Cloud integration...')
    console.log('  Parameters:', { rego, state, vin })

    const result = await ppsrCloudClient.performPPSRCheck({
      vin: vin || undefined,
      registrationPlate: rego || undefined,
      registrationState: state || undefined
    })

    return NextResponse.json({
      success: true,
      message: 'PPSR check completed successfully',
      data: {
        searchNumber: result.searchNumber,
        filename: result.filename,
        pdfSize: result.pdfBase64.length,
        pdfPreview: result.pdfBase64.substring(0, 100) + '...',
        searchResult: result.searchResult
      }
    })

  } catch (error) {
    console.error('❌ Test PPSR check failed:', error)

    return NextResponse.json(
      {
        error: 'PPSR check failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: error
      },
      { status: 500 }
    )
  }
}
