import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase'

const adminReportSchema = z.object({
  id: z.string(),
  rego: z.string(),
  state: z.string(),
  status: z.string(),
  timestamp: z.string(),
  customerEmail: z.string().email(),
  customerName: z.string().optional(),
  orderId: z.string(),
  reportData: z.any()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = adminReportSchema.parse(body)

    // Extract vehicle identifier based on the legacy format
    const vehicleIdentifier = validatedData.rego.includes('-') || validatedData.rego.length >= 17 ?
      { type: 'vin', vin: validatedData.rego } :
      { type: 'rego', rego: validatedData.rego, state: validatedData.state }

    // Insert into Supabase with proper handling for duplicate order_id
    const { data, error } = await supabaseAdmin
      .from('reports')
      .upsert({
        id: validatedData.id,
        order_id: validatedData.orderId,
        customer_email: validatedData.customerEmail,
        customer_name: validatedData.customerName || null,
        vehicle_identifier: vehicleIdentifier,
        report_type: 'STANDARD', // Default report type for webhook reports
        status: validatedData.status,
        report_data: validatedData.reportData
      }, {
        onConflict: 'order_id'
      })
      .select()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        {
          error: 'Failed to save report to database',
          message: error.message,
        },
        { status: 500 }
      )
    }

    console.log(`Admin report saved to Supabase: ${validatedData.id} for customer: ${validatedData.customerEmail}`)

    return NextResponse.json({
      success: true,
      message: 'Report saved successfully',
      reportId: validatedData.id,
      data: data
    })

  } catch (error) {
    console.error('Admin report save error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid report data',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to save report',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Fetch all reports from Supabase, sorted by created_at descending
    const { data: reports, error } = await supabaseAdmin
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase fetch error:', error)
      return NextResponse.json(
        {
          error: 'Failed to fetch reports from database',
          message: error.message,
        },
        { status: 500 }
      )
    }

    // Transform the data to match the expected format for the admin panel
    const transformedReports = reports.map(report => ({
      id: report.id,
      rego: report.vehicle_identifier.type === 'vin' ?
        report.vehicle_identifier.vin :
        report.vehicle_identifier.rego,
      state: report.vehicle_identifier.state || 'Unknown',
      status: report.status,
      timestamp: report.created_at,
      customerEmail: report.customer_email,
      customerName: report.customer_name,
      orderId: report.order_id,
      reportData: report.report_data
    }))

    return NextResponse.json({
      success: true,
      reports: transformedReports
    })
  } catch (error) {
    console.error('Admin reports fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch reports',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    // Update existing report in Supabase
    const { data, error } = await supabaseAdmin
      .from('reports')
      .update({
        customer_email: body.customer_email,
        customer_name: body.customer_name,
        vehicle_identifier: body.vehicle_identifier,
        report_type: body.report_type,
        status: body.status,
        report_data: body.report_data,
        updated_at: new Date().toISOString()
      })
      .eq('id', body.id)
      .select()

    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json(
        {
          error: 'Failed to update report in database',
          message: error.message,
        },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    console.log(`Admin report updated in Supabase: ${body.id} for customer: ${body.customer_email}`)

    return NextResponse.json({
      success: true,
      message: 'Report updated successfully',
      reportId: body.id,
      data: data[0]
    })

  } catch (error) {
    console.error('Admin report update error:', error)

    return NextResponse.json(
      {
        error: 'Failed to update report',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reportId = searchParams.get('id')

    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      )
    }

    // Delete the report from Supabase
    const { data, error } = await supabaseAdmin
      .from('reports')
      .delete()
      .eq('id', reportId)
      .select()

    if (error) {
      console.error('Supabase delete error:', error)
      return NextResponse.json(
        {
          error: 'Failed to delete report from database',
          message: error.message,
        },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    const deletedReport = data[0]
    console.log(`Admin report deleted from Supabase: ${deletedReport.id} for customer: ${deletedReport.customer_email}`)

    return NextResponse.json({
      success: true,
      message: 'Report deleted successfully',
      deletedReportId: reportId
    })

  } catch (error) {
    console.error('Admin report delete error:', error)
    return NextResponse.json(
      {
        error: 'Failed to delete report',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}