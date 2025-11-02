/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
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

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder_secret'

export async function POST(request: NextRequest) {
  console.log('🚀 Stripe webhook received at:', new Date().toISOString())

  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('Stripe-Signature')

  console.log('📝 Webhook body length:', body.length)
  console.log('🔑 Stripe signature present:', !!signature)
  console.log('🔑 Webhook secret configured:', !!webhookSecret && webhookSecret !== 'whsec_placeholder_secret')

  let event: Stripe.Event

  try {
    const stripe = getStripeClient()
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret)
    console.log('✅ Webhook signature verified, event type:', event.type)
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
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
      const reportId = `stripe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const pendingReportInfo = {
        id: reportId,
        vehicleIdentifier: vehicleInfo,
        reportType,
        requestedAt: new Date().toISOString(),
        customerEmail: metadata.customerEmail,
        orderId: session.id,
        status: 'pending_manual_review'
      }

      // Save directly to Supabase database
      console.log('💾 Attempting to save to Supabase...')
      console.log('📧 Customer email:', metadata.customerEmail)
      console.log('🚗 Vehicle info:', vehicleInfo)
      console.log('📋 Report type:', reportType)

      try {
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
          console.error('❌ Error details:', JSON.stringify(error, null, 2))
        } else {
          console.log('✅ Report saved to Supabase successfully!')
          console.log('✅ Report ID:', data[0]?.id)
          console.log('✅ Report data:', JSON.stringify(data[0], null, 2))
        }
      } catch (error) {
        console.error('Error saving report to Supabase:', error)
      }

      console.log('Pending report created for session:', session.id)

      // Email will be sent after manual processing is complete
      console.log('📧 Email will be sent after manual report completion for:', metadata.customerEmail)

    } catch (error) {
      console.error('Error processing successful payment:', error)
      // Don't return error to Stripe - we want to acknowledge receipt
    }
  }

  return NextResponse.json({ received: true })
}