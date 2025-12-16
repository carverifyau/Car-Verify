import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { ppsrCloudClient } from '@/lib/ppsr-cloud'

/**
 * Manual PPSR processing endpoint for debugging
 * GET /api/manual-ppsr?reportId=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const reportId = searchParams.get('reportId')

    if (!reportId) {
      return NextResponse.json(
        { error: 'reportId parameter required' },
        { status: 400 }
      )
    }

    console.log('🔧 Manual PPSR processing for report:', reportId)

    // Get report from database
    const { data: report, error: fetchError } = await supabaseAdmin
      .from('reports')
      .select('*')
      .eq('id', reportId)
      .single()

    if (fetchError || !report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    console.log('📋 Report found:', {
      id: report.id,
      email: report.customer_email,
      rego: report.vehicle_identifier.rego,
      state: report.vehicle_identifier.state,
      status: report.status
    })

    // Extract vehicle info
    const vin = report.vehicle_identifier.vin
    const rego = report.vehicle_identifier.rego
    const state = report.vehicle_identifier.state

    if (!rego || !state) {
      return NextResponse.json(
        { error: 'Missing rego or state in report' },
        { status: 400 }
      )
    }

    console.log('🚗 Starting PPSR fetch for', rego, state)

    // Fetch PPSR certificate
    const ppsrResult = await ppsrCloudClient.performPPSRCheck({
      vin,
      registrationPlate: rego,
      registrationState: state
    })

    console.log('✅ PPSR certificate fetched:', ppsrResult.filename)

    // Send email
    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-report-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerEmail: report.customer_email,
        customerName: report.customer_name,
        reportData: {
          ppsrCertificateData: ppsrResult.pdfBase64,
          ppsrCertificateFilename: ppsrResult.filename,
          ppsrStatus: 'completed',
          year: '',
          make: '',
          model: ''
        },
        rego,
        state,
        vin,
        reportId: report.id
      }),
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      console.error('❌ Email endpoint error:', errorText)
      throw new Error(`Failed to send email: ${errorText}`)
    }

    console.log('✅ Email sent to:', report.customer_email)

    // Update report status
    const { error: updateError } = await supabaseAdmin
      .from('reports')
      .update({
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)

    if (updateError) {
      console.error('⚠️ Failed to update report status:', updateError)
    } else {
      console.log('✅ Report marked as completed')
    }

    return NextResponse.json({
      success: true,
      message: 'PPSR certificate fetched and emailed successfully',
      report: {
        id: reportId,
        email: report.customer_email,
        filename: ppsrResult.filename
      }
    })

  } catch (error) {
    console.error('❌ Manual PPSR processing failed:', error)

    return NextResponse.json(
      {
        error: 'PPSR processing failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
