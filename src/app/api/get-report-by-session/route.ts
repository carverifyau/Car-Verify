import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'
import { parsePPSRSearchResult } from '@/lib/ppsr-data-parser'

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session ID' },
        { status: 400 }
      )
    }

    console.log('[GET-REPORT] Looking up report for sessionId:', sessionId)

    // Get customer email from Stripe
    let customerEmail: string | null = null

    if (sessionId.startsWith('sub_')) {
      // Get email from subscription
      const subscription = await stripe.subscriptions.retrieve(sessionId)
      const customer = await stripe.customers.retrieve(subscription.customer as string)
      customerEmail = customer.deleted ? null : customer.email
      console.log('[GET-REPORT] Found customer email from subscription:', customerEmail)
    } else if (sessionId.startsWith('cs_')) {
      // Get email from checkout session
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      customerEmail = session.customer_details?.email || null
      console.log('[GET-REPORT] Found customer email from checkout session:', customerEmail)
    }

    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Could not find customer email from session' },
        { status: 404 }
      )
    }

    console.log('[GET-REPORT] Looking up recent report for customer:', customerEmail)

    // Look up most recent report for this customer (created in last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()

    const { data: reports, error } = await supabaseAdmin
      .from('reports')
      .select('*')
      .eq('customer_email', customerEmail)
      .gte('created_at', fiveMinutesAgo)
      .order('created_at', { ascending: false })
      .limit(1)

    if (error || !reports || reports.length === 0) {
      console.error('[GET-REPORT] Report not found for customer:', customerEmail)
      console.error('[GET-REPORT] Error:', error)

      // Debug: Try to find ANY recent reports
      const { data: recentReports } = await supabaseAdmin
        .from('reports')
        .select('id, order_id, customer_email, created_at, status')
        .order('created_at', { ascending: false })
        .limit(5)

      console.log('[GET-REPORT] Recent reports in database:', recentReports)

      return NextResponse.json(
        {
          error: 'Report not found',
          debug: {
            searchedEmail: customerEmail,
            recentReports: recentReports?.map(r => ({
              customer_email: r.customer_email,
              status: r.status,
              created: r.created_at
            }))
          }
        },
        { status: 404 }
      )
    }

    const report = reports[0]

    console.log('[GET-REPORT] Report found:', {
      id: report.id,
      status: report.status,
      hasPPSR: !!report.ppsr_pdf_data,
      hasSearchResult: !!report.ppsr_search_result
    })

    // Parse PPSR search result if available
    let parsedData = null
    if (report.ppsr_search_result && report.vehicle_identifier) {
      try {
        parsedData = parsePPSRSearchResult(
          report.ppsr_search_result,
          report.vehicle_identifier,
          report.id,
          report.created_at,
          report.ppsr_search_result?.searchNumber,
          report.ppsr_search_result?.certificateNumber
        )
        console.log('[GET-REPORT] Successfully parsed PPSR data')
      } catch (error) {
        console.error('[GET-REPORT] Failed to parse PPSR data:', error)
      }
    }

    // Return report data
    return NextResponse.json({
      success: true,
      report: {
        id: report.id,
        status: report.status,
        pdfBase64: report.ppsr_pdf_data,
        filename: report.ppsr_pdf_filename,
        metadata: report.vehicle_identifier,
        generatedAt: report.updated_at || report.created_at,
        parsedData: parsedData
      }
    })

  } catch (error) {
    console.error('[GET-REPORT] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch report',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
