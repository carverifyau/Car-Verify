import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'

type ReportType = 'BASIC' | 'STANDARD' | 'PREMIUM'

const getStripeClient = () => {
  const apiKey = process.env.STRIPE_SECRET_KEY || 'sk_placeholder_key'
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('Missing STRIPE_SECRET_KEY environment variable')
  }
  return new Stripe(apiKey, {
    apiVersion: '2025-08-27.basil',
  })
}

// Track processed sessions to prevent duplicates
const processedSessions = new Set<string>()

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Check if this session has already been processed
    if (processedSessions.has(sessionId)) {
      console.log(`⚠️ Session ${sessionId} already processed, skipping duplicate call`)
      return NextResponse.json({
        success: true,
        message: 'Session already processed',
        reportId: null
      })
    }

    // Retrieve the session from Stripe
    const stripe = getStripeClient()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === 'paid') {
      // Mark session as being processed
      processedSessions.add(sessionId)

      // Extract vehicle info from metadata
      const metadata = session.metadata!
      let vehicleInfo: any

      if (metadata.vehicleType === 'vin') {
        vehicleInfo = {
          type: 'vin' as const,
          vin: metadata.vehicleVin,
        }
      } else {
        vehicleInfo = {
          type: 'rego' as const,
          rego: metadata.vehicleRego,
          state: metadata.vehicleState,
        }
      }

      // Determine report type
      const reportTypeMap: Record<string, ReportType> = {
        'standard': 'STANDARD',
        'premium': 'PREMIUM',
      }
      const reportType = reportTypeMap[metadata.reportType] || 'STANDARD'

      // Create a pending report entry (don't generate full report yet - manual processing)
      // Let Supabase generate the UUID automatically
      const pendingReportInfo = {
        vehicleIdentifier: vehicleInfo,
        reportType,
        requestedAt: new Date().toISOString(),
        customerEmail: metadata.customerEmail,
        orderId: session.id,
        status: 'pending_manual_review'
      }

      console.log('🚀 Saving report to Supabase:', {
        customerEmail: metadata.customerEmail,
        orderId: session.id
      })

      // Save directly to Supabase database
      const { data, error } = await supabaseAdmin
        .from('reports')
        .upsert({
          order_id: session.id,
          customer_email: metadata.customerEmail,
          customer_name: null,
          vehicle_identifier: vehicleInfo,
          report_type: reportType,
          status: 'pending',
          report_data: pendingReportInfo
        }, {
          onConflict: 'order_id'
        })
        .select()

      if (error) {
        console.error('❌ Supabase save error:', error)
        // Remove from processed set if saving fails, so it can be retried
        processedSessions.delete(sessionId)
      } else {
        console.log('✅ Report saved to Supabase successfully:', data[0]?.id)
      }

      // Don't send email with full report yet - this will be done after manual processing
      console.log('📧 Email will be sent after manual report completion for:', metadata.customerEmail)

      return NextResponse.json({
        success: true,
        message: 'Report request received and queued for manual processing',
        reportId: data?.[0]?.id || 'pending',
        status: 'pending_manual_review'
      })
    } else {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Webhook simulation error:', error)
    // Remove from processed set on error so it can be retried
    if (sessionId) {
      processedSessions.delete(sessionId)
    }
    return NextResponse.json(
      {
        error: 'Failed to process session',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}