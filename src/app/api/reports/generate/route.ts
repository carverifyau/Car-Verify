import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { vehicleIdentifierSchema } from '@/lib/vehicle-validation'
import { reportService } from '@/lib/api/report-service'

type ReportType = 'BASIC' | 'STANDARD' | 'PREMIUM'

const generateReportSchema = z.object({
  vehicleIdentifier: vehicleIdentifierSchema,
  reportType: z.enum(['BASIC', 'STANDARD', 'PREMIUM']),
  userId: z.string().optional(),
  orderId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    console.log('⚠️ POST /api/reports/generate called - this endpoint is disabled in MVP mode')

    return NextResponse.json(
      {
        success: false,
        error: 'Report generation disabled in MVP mode',
        message: 'Reports are processed manually in MVP mode. Please use the admin interface to complete reports.',
      },
      { status: 403 }
    )

  } catch (error) {
    console.error('Report generation API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate report',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const reportId = searchParams.get('id')

  if (!reportId) {
    return NextResponse.json(
      {
        success: false,
        error: 'Report ID is required',
      },
      { status: 400 }
    )
  }

  try {
    const report = await reportService.getReportById(reportId)

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          error: 'Report not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      report,
    })

  } catch (error) {
    console.error('Report retrieval API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve report',
      },
      { status: 500 }
    )
  }
}