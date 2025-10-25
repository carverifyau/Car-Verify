import { NextRequest, NextResponse } from 'next/server'
import { reportService } from '@/lib/api/report-service'
import { validateVehicleIdentifier } from '@/lib/vehicle-validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { vehicleInfo, reportType, orderId } = body

    // Validate vehicle identifier
    const validation = validateVehicleIdentifier(vehicleInfo)
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        error: validation.error
      }, { status: 400 })
    }

    // For MVP, we'll mark reports as pending manual review instead of auto-generating
    const report = await reportService.createManualReport({
      vehicleIdentifier: validation.identifier!,
      reportType: reportType.toUpperCase(),
      orderId
    })

    return NextResponse.json({
      success: true,
      reportId: report.id,
      status: 'pending_manual_review',
      message: 'Report request received. Our team will process this manually and notify you when complete.',
      estimatedCompletion: '2-4 hours during business hours'
    })

  } catch (error) {
    console.error('Report generation error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create report request'
    }, { status: 500 })
  }
}