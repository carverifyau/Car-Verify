import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'

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

    // Get subscription or checkout session from Stripe
    let subscriptionId: string | null = null
    let orderId: string | null = null

    if (sessionId.startsWith('sub_')) {
      subscriptionId = sessionId
      orderId = sessionId
    } else if (sessionId.startsWith('cs_')) {
      // Get checkout session to find subscription or payment intent
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      if (session.subscription) {
        subscriptionId = session.subscription as string
        orderId = subscriptionId
      } else if (session.payment_intent) {
        orderId = session.payment_intent as string
      }
    }

    if (!orderId) {
      return NextResponse.json(
        { error: 'Could not find order ID from session' },
        { status: 404 }
      )
    }

    console.log('[GET-REPORT] Looking up report with order_id:', orderId)

    // Fetch report from database
    const { data: report, error } = await supabaseAdmin
      .from('reports')
      .select('*')
      .eq('order_id', orderId)
      .single()

    if (error || !report) {
      console.error('[GET-REPORT] Report not found:', error)
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    console.log('[GET-REPORT] Report found:', {
      id: report.id,
      status: report.status,
      hasPPSR: !!report.ppsr_pdf_data
    })

    // Return report data
    return NextResponse.json({
      success: true,
      report: {
        id: report.id,
        status: report.status,
        pdfBase64: report.ppsr_pdf_data,
        filename: report.ppsr_pdf_filename,
        metadata: report.vehicle_identifier,
        generatedAt: report.updated_at || report.created_at
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
