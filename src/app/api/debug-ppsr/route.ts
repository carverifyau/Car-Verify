import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { ppsrCloudClient } from '@/lib/ppsr-cloud'

export async function POST(request: NextRequest) {
  try {
    const { reportId } = await request.json()

    if (!reportId) {
      return NextResponse.json({ error: 'Missing reportId' }, { status: 400 })
    }

    // Get report from database
    const { data: report, error: fetchError } = await supabaseAdmin
      .from('reports')
      .select('*')
      .eq('id', reportId)
      .single()

    if (fetchError || !report) {
      return NextResponse.json({
        error: 'Report not found',
        details: fetchError
      }, { status: 404 })
    }

    console.log('📋 Report found:', report)
    console.log('🚗 Vehicle identifier:', report.vehicle_identifier)

    // Try to fetch PPSR certificate
    try {
      const vehicleInfo = report.vehicle_identifier
      console.log('🔄 Attempting PPSR check for:', vehicleInfo)

      const ppsrResult = await ppsrCloudClient.performPPSRCheck({
        vin: vehicleInfo.vin,
        registrationPlate: vehicleInfo.rego,
        registrationState: vehicleInfo.state
      })

      console.log('✅ PPSR check successful:', ppsrResult.filename)

      return NextResponse.json({
        success: true,
        message: 'PPSR check succeeded',
        filename: ppsrResult.filename,
        report: report,
        vehicleInfo: vehicleInfo
      })

    } catch (ppsrError: any) {
      console.error('❌ PPSR check failed:', ppsrError)

      return NextResponse.json({
        success: false,
        error: 'PPSR check failed',
        errorMessage: ppsrError?.message || 'Unknown error',
        errorStack: ppsrError?.stack,
        errorDetails: ppsrError,
        report: report,
        vehicleInfo: report.vehicle_identifier
      }, { status: 500 })
    }

  } catch (error: any) {
    console.error('❌ Debug endpoint error:', error)
    return NextResponse.json({
      error: 'Debug endpoint failed',
      message: error?.message,
      stack: error?.stack
    }, { status: 500 })
  }
}
