import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY || 'placeholder-key'
  if (!process.env.OPENAI_API_KEY) {
    console.warn('Missing OPENAI_API_KEY environment variable')
  }
  return new OpenAI({ apiKey })
}

interface VehicleInfo {
  make: string
  model: string
  year: number
  body?: string
  engine?: string
  fuel?: string
  odometer?: number
  condition?: string
  location?: string
}

export async function POST(request: NextRequest) {
  try {
    // Debug: Check if API key is being read
    console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY)
    console.log('OPENAI_API_KEY length:', process.env.OPENAI_API_KEY?.length || 0)
    console.log('OPENAI_API_KEY starts with:', process.env.OPENAI_API_KEY?.substring(0, 10))

    const vehicleInfo: VehicleInfo = await request.json()

    if (!vehicleInfo.make || !vehicleInfo.model || !vehicleInfo.year) {
      return NextResponse.json(
        { error: 'Missing required vehicle information: make, model, year' },
        { status: 400 }
      )
    }

    const prompt = `
You are a professional automotive valuation expert in Australia with access to current market data and RedBook pricing methodologies. Research and provide accurate market valuations for the following vehicle that align with RedBook standards:

Vehicle Details:
- Make: ${vehicleInfo.make}
- Model: ${vehicleInfo.model}
- Year: ${vehicleInfo.year}
- Body Type: ${vehicleInfo.body || 'Not specified'}
- Engine: ${vehicleInfo.engine || 'Not specified'}
- Fuel Type: ${vehicleInfo.fuel || 'Not specified'}
- Odometer: ${vehicleInfo.odometer ? `${vehicleInfo.odometer} km` : 'Average for year (estimate)'}
- Condition: ${vehicleInfo.condition || 'Average'}
- Location: ${vehicleInfo.location || 'Australia'}

CRITICAL INSTRUCTION: Your valuations must align with RedBook pricing standards and methodologies. RedBook is the industry standard for Australian vehicle valuations used by dealers, insurers, and financial institutions.

REDBOOK ALIGNMENT REQUIREMENTS:
1. Research current RedBook pricing methodologies and standards for this exact vehicle specification
2. Consider RedBook's depreciation curves and market adjustments for luxury/performance vehicles
3. Factor in RedBook's condition multipliers (Excellent, Very Good, Good, Fair, Poor) and mileage adjustments
4. Align with RedBook's regional pricing variations across Australia (typically 5-10% variance between states)
5. Match RedBook's trade-in, private sale, and retail value distinctions with proper margins
6. Use RedBook's market factors and economic condition adjustments for premium vehicle segments

REDBOOK PRICING METHODOLOGY SPECIFICS:
- RedBook typically shows Trade Value (dealer buy price), Private Value (private sale), and Retail Value (dealer sell price)
- Trade values are usually 15-25% below private sale values
- Retail values are usually 10-20% above private sale values
- Premium/luxury vehicles like Porsche hold value better and command higher prices
- RedBook factors in brand prestige, performance heritage, and collector appeal
- Mileage adjustments: typically +/- $500-2000 per 10,000km variance from average
- Condition adjustments: Excellent (+10-15%), Very Good (+5-10%), Good (base), Fair (-10-15%), Poor (-20-30%)

MARKET FACTORS TO ANALYZE (RedBook methodology):
1. Current supply/demand for this specific model (RedBook market indicators)
2. Recent changes in used car market (post-COVID recovery, interest rates, inflation)
3. New car availability and pricing impact on used values
4. Model-specific factors (reliability reputation, common issues, popularity)
5. RedBook depreciation curves for this make/model/year combination
6. Regional pricing variations using RedBook's state-by-state data
7. Current economic conditions affecting car purchases per RedBook analysis

VALUATION METHODOLOGY (aligned with RedBook):
- Use RedBook's established pricing framework and methodology
- Apply RedBook's condition and mileage adjustment factors
- Consider RedBook's market premium/discount calculations
- Factor in RedBook's regional and seasonal adjustments
- Apply RedBook's dealer margin and market positioning standards

Please provide comprehensive Australian market valuation data that would be consistent with RedBook valuations:

1. TRADE-IN VALUE (what a dealer would pay - RedBook trade-in methodology)
2. PRIVATE SALE VALUE (realistic private sale - RedBook private sale standards)
3. RETAIL VALUE (dealer selling price - RedBook retail methodology)
4. MARKET ANALYSIS (RedBook-style market assessment)

IMPORTANT: Your valuations should closely match what RedBook would provide for this vehicle. Research and consider RedBook's established pricing standards, methodologies, and market adjustments to ensure alignment with industry-standard valuations.

Format your response as a JSON object with the following structure:
{
  "tradeInValue": {
    "low": number,
    "high": number,
    "average": number
  },
  "privateSaleValue": {
    "low": number,
    "high": number,
    "average": number
  },
  "retailValue": {
    "low": number,
    "high": number,
    "average": number
  },
  "marketAnalysis": {
    "demand": "High/Medium/Low",
    "trend": "Increasing/Stable/Decreasing",
    "keyFactors": ["factor1", "factor2", "factor3"],
    "reliability": "Excellent/Good/Average/Poor",
    "knownIssues": ["issue1", "issue2"] or [],
    "marketNotes": "detailed analysis text"
  },
  "dataSource": "AI research based on current Australian automotive market data",
  "lastUpdated": "current date",
  "confidence": "High/Medium/Low"
}

Ensure all values are realistic and based on current Australian market conditions.
`

    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert Australian automotive valuation specialist with access to current market data. Provide accurate, realistic valuations based on current market conditions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    })

    const responseText = completion.choices[0]?.message?.content
    if (!responseText) {
      throw new Error('No response from AI model')
    }

    // Try to parse the JSON response
    let valuationData
    try {
      // Extract JSON from the response (in case there's additional text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        valuationData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      // If parsing fails, create a structured response from the text
      console.error('Failed to parse AI response as JSON:', parseError)
      return NextResponse.json(
        {
          error: 'AI valuation response format error',
          rawResponse: responseText
        },
        { status: 500 }
      )
    }

    // Add metadata
    valuationData.generatedAt = new Date().toISOString()
    valuationData.vehicleQueried = vehicleInfo

    return NextResponse.json(valuationData)

  } catch (error) {
    console.error('AI valuation error:', error)

    return NextResponse.json(
      {
        error: 'Failed to generate AI valuation',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}