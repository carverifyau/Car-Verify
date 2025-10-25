import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Sample data for demonstration purposes
    const sampleReportData = {
      customerRego: "DEMO123",
      customerState: "NSW",
      year: 2020,
      make: "Toyota",
      model: "Camry",
      variant: "Ascent Sport",
      bodyType: "Sedan",
      engine: "2.5L 4-Cylinder",
      fuel: "Petrol",
      transmission: "CVT",
      odometer: 45000,
      colour: "Silver",

      // PPSR Status
      ppsrStatus: "clear",
      securityInterests: [],

      // Status checks
      stolenStatus: "clear",
      writeOffStatus: "clear",

      // Market valuations
      retailValue: "28,500",
      privateValue: "25,800",
      tradeValue: "22,200",

      // AI Market Research with comprehensive data
      aiMarketResearch: {
        tradeInValue: {
          low: 21000,
          high: 23500,
          average: 22200
        },
        privateSaleValue: {
          low: 24500,
          high: 27200,
          average: 25800
        },
        retailValue: {
          low: 27000,
          high: 30000,
          average: 28500
        },
        marketAnalysis: {
          demand: "High",
          trend: "Stable",
          keyFactors: [
            "Strong reliability reputation",
            "High resale value retention",
            "Popular family sedan segment"
          ],
          reliability: "Excellent",
          knownIssues: [
            "CVT transmission service intervals",
            "Cabin air filter replacement"
          ],
          marketNotes: "Toyota Camry maintains strong market position with excellent reliability record and consistent demand. This generation particularly well-regarded for build quality and fuel efficiency."
        },
        dataSource: "AI research based on current Australian automotive market data",
        lastUpdated: new Date().toISOString(),
        confidence: "High",
        generatedAt: new Date().toISOString(),
        vehicleQueried: {
          make: "Toyota",
          model: "Camry",
          year: 2020,
          body: "Sedan",
          engine: "2.5L 4-Cylinder",
          fuel: "Petrol"
        }
      }
    }

    // Generate PDF using the existing PDF generation API
    const pdfResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/generate-pdf-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sampleReportData)
    })

    if (!pdfResponse.ok) {
      throw new Error('Failed to generate sample PDF')
    }

    const pdfResult = await pdfResponse.json()

    if (!pdfResult.success) {
      throw new Error(pdfResult.error || 'PDF generation failed')
    }

    // Return the PDF as a downloadable file
    const pdfBuffer = Buffer.from(pdfResult.pdf, 'base64')

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="sample-vehicle-report.pdf"',
        'Content-Length': pdfBuffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('Error generating sample report:', error)

    return NextResponse.json(
      {
        error: 'Failed to generate sample report',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}