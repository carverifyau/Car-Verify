import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { supabaseAdmin } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reportId = params.id

    // Create authenticated Supabase client
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get report with PPSR PDF data using admin client
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

    // Verify user owns this report
    if (report.customer_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden - You do not have access to this report' },
        { status: 403 }
      )
    }

    if (!report.ppsr_pdf_data) {
      return NextResponse.json(
        { error: 'PPSR PDF not available for this report yet. Please check back later.' },
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
