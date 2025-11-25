import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase'

interface EmailRequest {
  customerEmail: string
  customerName?: string
  reportData: any
  rego: string
  vin?: string
  state: string
  reportId?: string
}

export async function POST(request: NextRequest) {
  try {
    const { customerEmail, customerName, reportData, rego, vin, state, reportId }: EmailRequest = await request.json()

    if (!customerEmail || !reportData || !rego) {
      return NextResponse.json(
        { error: 'Missing required fields: customerEmail, reportData, rego' },
        { status: 400 }
      )
    }

    console.log('📧 Sending report email to:', customerEmail)

    // Initialize Resend with API key (done at runtime, not build time)
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Generate report summary for email
    const reportSummary = generateReportSummary(reportData, rego, state)

    // Email content
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Vehicle Report is Ready</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .report-summary { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
        .status-good { color: #28a745; font-weight: bold; }
        .status-warning { color: #ffc107; font-weight: bold; }
        .status-danger { color: #dc3545; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .btn { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 Your Vehicle Report is Ready!</h1>
            <p>Complete vehicle history report for ${rego} (${state})</p>
        </div>

        <div class="content">
            <p>Hello${customerName ? ` ${customerName}` : ''},</p>

            <p>Great news! Your comprehensive vehicle report for <strong>${rego} (${state})</strong> has been completed and is attached to this email as a PDF.</p>

            <div class="report-summary">
                <h3>📋 Report Summary</h3>
                ${reportSummary}
            </div>

            <p><strong>What's included in your report:</strong></p>
            <ul>
                <li>✅ PPSR Security Interest Check</li>
                <li>✅ Vehicle Details & Specifications</li>
                <li>✅ Market Valuation (Trade, Private, Retail)</li>
                <li>✅ Ownership History</li>
                <li>✅ Safety & Compliance Information</li>
            </ul>

            <p style="text-align: center; font-weight: bold; color: #2563eb;">
                📄 Your complete vehicle report is attached as a PDF below
            </p>

            <p><small><strong>Note:</strong> This report is valid for 30 days from the date of generation. Please download or save your report within this timeframe.</small></p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 8px; margin: 20px 0;">
                <h2 style="margin: 0 0 15px 0; color: white;">🎉 Welcome to Car Verify!</h2>
                <p style="margin: 10px 0; color: white;">Your account has been created and you now have access to your personalized dashboard where you can:</p>
                <ul style="margin: 10px 0; padding-left: 20px; color: white;">
                    <li>View all your PPSR reports in one place</li>
                    <li>Track your subscription usage</li>
                    <li>Manage your account settings</li>
                    <li>Access your report history anytime</li>
                </ul>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://carverify.com.au/login" class="btn" style="background: white; color: #667eea; font-weight: bold; text-decoration: none; display: inline-block; padding: 12px 30px; border-radius: 6px;">
                        🔐 Log In to Your Account
                    </a>
                </div>
                <p style="margin: 15px 0 0 0; font-size: 13px; text-align: center; color: white;">
                    You'll receive a secure 6-digit code via email to access your account
                </p>
            </div>

            <p>If you have any questions about your report or account, please don't hesitate to contact our support team.</p>

            <p>Thank you for choosing Car Verify!</p>

            <p>Best regards,<br>
            <strong>The Car Verify Team</strong></p>
        </div>

        <div class="footer">
            <p>© 2024 Car Verify. All rights reserved.</p>
            <p>This email was sent to ${customerEmail}. If you didn't request this report, please contact us immediately.</p>
        </div>
    </div>
</body>
</html>
    `

    // Transform AI market research data to match PDF generation expectations
    let transformedReportData = { ...reportData }
    if (reportData.aiMarketResearch && !reportData.aiMarketResearch.marketAnalysis) {
      console.log('Transforming AI market research data structure...')
      const aiData = reportData.aiMarketResearch

      // Transform simple structure to complex structure expected by PDF generator
      transformedReportData.aiMarketResearch = {
        tradeInValue: {
          low: Math.round((aiData.tradeValue || 0) * 0.9),
          high: Math.round((aiData.tradeValue || 0) * 1.1),
          average: aiData.tradeValue || 0
        },
        privateSaleValue: {
          low: Math.round((aiData.privateValue || 0) * 0.9),
          high: Math.round((aiData.privateValue || 0) * 1.1),
          average: aiData.privateValue || 0
        },
        retailValue: {
          low: Math.round((aiData.retailValue || 0) * 0.9),
          high: Math.round((aiData.retailValue || 0) * 1.1),
          average: aiData.retailValue || 0
        },
        marketAnalysis: {
          demand: 'Medium', // Default fallback
          trend: 'Stable', // Default fallback
          keyFactors: aiData.sellingPoints || ['Quality vehicle', 'Good market position'],
          reliability: 'Good', // Default fallback
          knownIssues: aiData.concerns || [],
          marketNotes: aiData.analysisNotes || aiData.marketTrends || 'Market analysis available'
        },
        dataSource: 'Expert market analysis based on current Australian automotive market data',
        lastUpdated: new Date().toISOString(),
        confidence: 'High',
        generatedAt: new Date().toISOString(),
        vehicleQueried: {
          make: reportData.make || 'Unknown',
          model: reportData.model || 'Unknown',
          year: reportData.year || new Date().getFullYear(),
          body: reportData.bodyType || 'Unknown'
        }
      }
      console.log('AI market research data transformed successfully')
    }

    // Generate PDF report
    console.log('Generating PDF report...')
    const pdfResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/generate-pdf-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedReportData)
    })

    let pdfAttachment = null
    if (pdfResponse.ok) {
      const pdfResult = await pdfResponse.json()
      if (pdfResult.success) {
        pdfAttachment = {
          filename: pdfResult.filename,
          content: pdfResult.pdf,
          encoding: 'base64',
          contentType: 'application/pdf'
        }
        console.log('PDF generated successfully')
      } else {
        console.error('PDF generation failed:', pdfResult.error)
      }
    } else {
      console.error('PDF generation request failed:', pdfResponse.status)
    }

    // Prepare attachments array for Resend
    const attachments = []

    // Add PDF attachment if available
    if (pdfAttachment) {
      attachments.push({
        filename: pdfAttachment.filename,
        content: pdfAttachment.content
      })
    }

    // Add PPSR certificate attachment if available and store it in database
    if (reportData.ppsrCertificateData) {
      console.log('Adding PPSR certificate attachment...')
      attachments.push({
        filename: reportData.ppsrCertificateFilename || 'ppsr-certificate.pdf',
        content: reportData.ppsrCertificateData
      })
      console.log('PPSR certificate attached successfully')

      // Store PPSR PDF in database if reportId is provided
      if (reportId) {
        try {
          console.log('📦 Storing PPSR PDF in database for report:', reportId)
          const { error: updateError } = await supabaseAdmin
            .from('reports')
            .update({
              ppsr_pdf_data: reportData.ppsrCertificateData,
              ppsr_pdf_filename: reportData.ppsrCertificateFilename || 'ppsr-certificate.pdf',
              updated_at: new Date().toISOString()
            })
            .eq('id', reportId)

          if (updateError) {
            console.error('❌ Failed to store PPSR PDF:', updateError)
          } else {
            console.log('✅ PPSR PDF stored successfully')
          }
        } catch (error) {
          console.error('❌ Error storing PPSR PDF:', error)
        }
      }
    }

    // Send email via Resend
    console.log('📤 Sending email via Resend...')
    const { data, error: resendError } = await resend.emails.send({
      from: 'Car Verify <reports@carverify.com.au>',
      to: customerEmail,
      subject: `🚗 Your PPSR Certificate for ${rego} + Account Access - Car Verify`,
      html: emailHtml,
      attachments: attachments
    })

    if (resendError) {
      console.error('❌ Resend error:', resendError)
      throw new Error(`Failed to send email: ${resendError.message}`)
    }

    // Log successful email send
    console.log('✅ Report email sent successfully:', {
      messageId: data?.id,
      customerEmail,
      rego,
      state,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      message: 'Report email sent successfully'
    })

  } catch (error) {
    console.error('Error sending report email:', error)

    return NextResponse.json(
      {
        error: 'Failed to send report email',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

function generateReportSummary(reportData: any, rego: string, state: string): string {
  const vehicle = `${reportData.year || 'Unknown'} ${reportData.make || 'Unknown'} ${reportData.model || 'Unknown'}`

  let summary = `
    <p><strong>Vehicle:</strong> ${vehicle}</p>
    <p><strong>Registration:</strong> ${rego} (${state})</p>
  `

  // PPSR Status
  if (reportData.ppsrStatus) {
    const ppsrClass = reportData.ppsrStatus === 'clear' ? 'status-good' : 'status-warning'
    summary += `<p><strong>PPSR Status:</strong> <span class="${ppsrClass}">${reportData.ppsrStatus === 'clear' ? 'Clear - No finance owing' : 'Encumbered - Finance owing'}</span></p>`
  }

  // Market Values
  if (reportData.retailValue || reportData.privateValue || reportData.tradeValue) {
    summary += `<p><strong>Market Valuation:</strong></p><ul>`
    if (reportData.retailValue) summary += `<li>Retail Value: ${reportData.retailValue}</li>`
    if (reportData.privateValue) summary += `<li>Private Sale: ${reportData.privateValue}</li>`
    if (reportData.tradeValue) summary += `<li>Trade-in Value: ${reportData.tradeValue}</li>`
    summary += `</ul>`
  }

  // Stolen/Write-off status
  if (reportData.stolenStatus && reportData.stolenStatus !== 'clear') {
    summary += `<p><strong>Stolen Status:</strong> <span class="status-danger">⚠️ Reported Stolen</span></p>`
  }

  if (reportData.writeOffStatus && reportData.writeOffStatus !== 'clear') {
    summary += `<p><strong>Write-off Status:</strong> <span class="status-danger">⚠️ Written Off</span></p>`
  }

  return summary
}