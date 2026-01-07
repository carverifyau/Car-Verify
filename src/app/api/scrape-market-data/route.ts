import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import axios from 'axios'
import chromium from '@sparticuz/chromium'
import { scrappeyCarSalesService } from '@/lib/scraping/scrappey-carsales-service'

const scrapeRequestSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.string().min(4),
  state: z.string().optional(),
})

interface MarketData {
  retailValue: string
  privateValue: string
  tradeValue: string
  averagePrice: string
  priceChange: string
  listingsFound: number
  prices: number[]
}

export async function POST(request: NextRequest) {
  try {
    console.log('[MARKET SCRAPER] Received request')

    const body = await request.json()
    const validatedData = scrapeRequestSchema.parse(body)

    const { make, model, year } = validatedData

    // Search Google for Carsales listings using simple HTTP request
    console.log('[MARKET SCRAPER] Searching Google for Carsales listings...')

    try {
      const searchQuery = `site:carsales.com.au ${year} ${make} ${model}`
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&num=30`

      console.log('[MARKET SCRAPER] Google search:', searchQuery)

      // Fetch Google search results with axios
      const response = await axios.get(googleUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        timeout: 10000
      })

      const htmlContent = response.data

      // Extract prices from the HTML
      const foundPrices = new Set<number>()

      // Match Australian dollar prices
      const patterns = [
        /\$(\d{1,3}(?:,\d{3})+)/g,  // $XX,XXX format
        /\$(\d{5,6})/g,              // $XXXXX format
      ]

      for (const pattern of patterns) {
        const matches = htmlContent.matchAll(pattern)
        for (const match of matches) {
          const priceStr = match[1].replace(/,/g, '')
          const price = parseInt(priceStr)

          // Car price range: $5k - $500k
          if (price >= 5000 && price <= 500000) {
            foundPrices.add(price)
          }
        }
      }

      const priceArray = Array.from(foundPrices).sort((a, b) => a - b)
      console.log('[MARKET SCRAPER] Found', priceArray.length, 'prices from Google:', priceArray.slice(0, 10))

      // Need at least 3 prices for reliable data
      if (priceArray.length >= 3) {
        const average = Math.round(priceArray.reduce((a, b) => a + b, 0) / priceArray.length)
        const median = priceArray[Math.floor(priceArray.length / 2)]
        const retailValue = Math.round(priceArray[Math.floor(priceArray.length * 0.75)]) // 75th percentile
        const privateValue = median
        const tradeValue = Math.round(priceArray[Math.floor(priceArray.length * 0.25)]) // 25th percentile

        const marketData: MarketData = {
          retailValue: `$${retailValue.toLocaleString()}`,
          privateValue: `$${privateValue.toLocaleString()}`,
          tradeValue: `$${tradeValue.toLocaleString()}`,
          averagePrice: `$${average.toLocaleString()}`,
          priceChange: '+0.0%',
          listingsFound: priceArray.length,
          prices: priceArray,
        }

        console.log('[MARKET SCRAPER] ✅ Found real market data from Google')
        return NextResponse.json(marketData)
      }

      console.log('[MARKET SCRAPER] Not enough prices found, using estimation')
    } catch (error) {
      console.error('[MARKET SCRAPER] Google search failed:', error)
    }

    // Fallback to estimation
    console.log('[MARKET SCRAPER] Using estimation algorithm')

    {
      console.log('[MARKET SCRAPER] No listings found, generating estimated values...')

      const currentYear = new Date().getFullYear()
      const vehicleAge = currentYear - parseInt(year)

      // Brand data with base values and retention rates (luxury/sports brands start higher and hold value better)
      const brandData: Record<string, { base: number, multiplier: number }> = {
        'porsche': { base: 140000, multiplier: 0.94 }, // Sports cars depreciate slower and hold value well
        'ferrari': { base: 300000, multiplier: 0.95 },
        'lamborghini': { base: 350000, multiplier: 0.94 },
        'bmw': { base: 80000, multiplier: 0.87 },
        'mercedes': { base: 85000, multiplier: 0.87 },
        'mercedes-benz': { base: 85000, multiplier: 0.87 },
        'audi': { base: 75000, multiplier: 0.88 },
        'lexus': { base: 70000, multiplier: 0.90 }, // Holds value well
        'toyota': { base: 45000, multiplier: 0.88 },
        'land rover': { base: 90000, multiplier: 0.82 },
        'range rover': { base: 120000, multiplier: 0.82 },
        'jaguar': { base: 80000, multiplier: 0.83 },
        'mazda': { base: 40000, multiplier: 0.85 },
        'honda': { base: 42000, multiplier: 0.87 },
        'ford': { base: 55000, multiplier: 0.88 }, // Rangers and popular models hold value well
        'holden': { base: 38000, multiplier: 0.80 },
        'hyundai': { base: 38000, multiplier: 0.84 },
        'kia': { base: 36000, multiplier: 0.84 },
        'nissan': { base: 42000, multiplier: 0.84 },
        'volkswagen': { base: 48000, multiplier: 0.86 },
        'subaru': { base: 45000, multiplier: 0.87 },
      }

      const makeLower = make.toLowerCase()
      const brand = brandData[makeLower] || { base: 50000, multiplier: 0.85 }

      // Calculate value with compound depreciation (annual retention rate)
      let baseValue = brand.base
      for (let i = 0; i < vehicleAge; i++) {
        baseValue *= brand.multiplier
      }

      // Ensure minimum values based on age
      const minValue = vehicleAge > 15 ? 5000 : 10000
      baseValue = Math.max(baseValue, minValue)

      const estimatedPrivate = Math.round(baseValue)
      const estimatedRetail = Math.round(baseValue * 1.15) // Dealers mark up ~15%
      const estimatedTrade = Math.round(baseValue * 0.85) // Trade-in ~15% less

      const marketData: MarketData = {
        retailValue: `$${estimatedRetail.toLocaleString()}`,
        privateValue: `$${estimatedPrivate.toLocaleString()}`,
        tradeValue: `$${estimatedTrade.toLocaleString()}`,
        averagePrice: `$${estimatedPrivate.toLocaleString()}`,
        priceChange: '+0.0%',
        listingsFound: 0,
        prices: [],
      }

      console.log('[MARKET SCRAPER] Estimated market data:', marketData)

      return NextResponse.json(marketData)
    }

  } catch (error) {
    console.error('[MARKET SCRAPER ERROR]:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        error: 'Failed to scrape market data',
        message: errorMessage,
      },
      { status: 500 }
    )
  }
}
