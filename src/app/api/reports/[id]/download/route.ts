import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reportId = params.id

    // Get report with PPSR PDF data
    const { data: report, error } = await supabaseAdmin
      .from('reports')
      .select('ppsr_pdf_data, ppsr_pdf_filename, customer_id')
      .eq('id', reportId)
      .single()

    if (error || !report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    if (!report.ppsr_pdf_data) {
      return NextResponse.json(
        { error: 'PPSR PDF not available for this report' },
        { status: 404 }
      )
    }

    // Convert base64 to buffer
    const pdfBuffer = Buffer.from(report.ppsr_pdf_data, 'base64')

    // Return PDF file
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${report.ppsr_pdf_filename || 'ppsr-certificate.pdf'}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('Error downloading PPSR PDF:', error)
    return NextResponse.json(
      { error: 'Failed to download PDF' },
      { status: 500 }
    )
  }
}
