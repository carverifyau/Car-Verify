/* eslint-disable @typescript-eslint/no-explicit-any */
export interface VehiclePricing {
  make: string
  model: string
  year: number
  variant?: string
  odometer?: number
  condition: 'excellent' | 'good' | 'fair' | 'poor'

  // Pricing data
  retailValue: number
  tradeValue: number
  privateValue: number

  // Market analysis
  marketPosition: 'below' | 'at' | 'above' // compared to market average
  priceConfidence: 'high' | 'medium' | 'low'

  // Trends
  price30Days: number
  price90Days: number
  priceChange: 'increasing' | 'stable' | 'decreasing'

  // Additional context
  averageKmsForYear: number
  marketListings: number
  daysSinceFirstListed?: number

  dataSource: 'redbook' | 'glass' | 'combined'
  lastUpdated: string
  rawData?: any
}

export interface PricingRequest {
  vin?: string
  rego?: string
  state?: string
  make?: string
  model?: string
  year?: number
  variant?: string
  odometer?: number
  condition?: VehiclePricing['condition']
}

class PricingService {
  private redbookUrl: string
  private redbookKey: string
  private glassUrl: string
  private glassKey: string

  constructor() {
    this.redbookUrl = process.env.REDBOOK_API_URL || 'https://api.redbook.com.au'
    this.redbookKey = process.env.REDBOOK_API_KEY || ''
    this.glassUrl = process.env.GLASS_API_URL || 'https://api.glassguide.com.au'
    this.glassKey = process.env.GLASS_API_KEY || ''
  }

  async getVehiclePricing(request: PricingRequest): Promise<VehiclePricing | null> {
    // For now, return mock data until we have real API access
    if (process.env.NODE_ENV === 'development' && (!this.redbookKey && !this.glassKey)) {
      return this.getMockPricing(request)
    }

    try {
      // Try RedBook first, fallback to Glass
      let pricing = await this.getRedbookPricing(request)
      if (!pricing) {
        pricing = await this.getGlassPricing(request)
      }
      return pricing
    } catch (error) {
      console.error('Pricing Service error:', error)
      return null
    }
  }

  private async getRedbookPricing(request: PricingRequest): Promise<VehiclePricing | null> {
    if (!this.redbookKey) return null

    try {
      const response = await fetch(`${this.redbookUrl}/pricing/vehicle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.redbookKey}`,
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) return null

      const data = await response.json()
      return this.parseRedbookResponse(data)
    } catch (error) {
      console.error('RedBook API error:', error)
      return null
    }
  }

  private async getGlassPricing(request: PricingRequest): Promise<VehiclePricing | null> {
    if (!this.glassKey) return null

    try {
      const response = await fetch(`${this.glassUrl}/valuation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.glassKey}`,
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) return null

      const data = await response.json()
      return this.parseGlassResponse(data)
    } catch (error) {
      console.error('Glass API error:', error)
      return null
    }
  }

  private parseRedbookResponse(data: any): VehiclePricing {
    return {
      make: data.make || 'Unknown',
      model: data.model || 'Unknown',
      year: data.year || 2020,
      variant: data.variant,
      odometer: data.odometer,
      condition: data.condition || 'good',
      retailValue: data.retailValue || 0,
      tradeValue: data.tradeValue || 0,
      privateValue: data.privateValue || 0,
      marketPosition: data.marketPosition || 'at',
      priceConfidence: data.confidence || 'medium',
      price30Days: data.price30Days || 0,
      price90Days: data.price90Days || 0,
      priceChange: data.priceChange || 'stable',
      averageKmsForYear: data.averageKms || 15000,
      marketListings: data.listings || 0,
      daysSinceFirstListed: data.daysSinceFirstListed,
      dataSource: 'redbook',
      lastUpdated: new Date().toISOString(),
      rawData: data,
    }
  }

  private parseGlassResponse(data: any): VehiclePricing {
    return {
      make: data.make || 'Unknown',
      model: data.model || 'Unknown',
      year: data.year || 2020,
      variant: data.variant,
      odometer: data.kilometres,
      condition: data.condition || 'good',
      retailValue: data.retailValue || 0,
      tradeValue: data.tradeValue || 0,
      privateValue: data.privateValue || 0,
      marketPosition: 'at', // Glass doesn't provide this directly
      priceConfidence: 'medium',
      price30Days: data.retailValue || 0, // Glass doesn't provide historical
      price90Days: data.retailValue || 0,
      priceChange: 'stable',
      averageKmsForYear: 15000, // Default
      marketListings: 0, // Not provided by Glass
      dataSource: 'glass',
      lastUpdated: new Date().toISOString(),
      rawData: data,
    }
  }

  private getMockPricing(request: PricingRequest): Promise<VehiclePricing> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Use enhanced mock data if available
        try {
          const { getMockScenario } = require('@/lib/mock-data')
          const identifier = request.vin
            ? { type: 'vin' as const, vin: request.vin }
            : { type: 'rego' as const, rego: request.rego || 'MOCK123', state: request.state || 'NSW' }

          const scenario = getMockScenario(identifier)

          if (scenario.pricingData) {
            console.log(`🎭 Pricing Mock scenario: ${scenario.name}`)

            resolve({
              make: scenario.vehicleData.make,
              model: scenario.vehicleData.model,
              year: scenario.vehicleData.year,
              variant: scenario.vehicleData.series,
              odometer: Math.floor(Math.random() * 100000) + 10000,
              condition: request.condition || 'good',
              retailValue: scenario.pricingData.retailValue,
              tradeValue: scenario.pricingData.tradeValue,
              privateValue: Math.round(scenario.pricingData.retailValue * 0.9),
              marketPosition: scenario.pricingData.marketPosition,
              priceConfidence: scenario.pricingData.priceConfidence,
              price30Days: Math.round(scenario.pricingData.retailValue * 1.02),
              price90Days: Math.round(scenario.pricingData.retailValue * 1.05),
              priceChange: 'decreasing',
              averageKmsForYear: 15000,
              marketListings: Math.floor(Math.random() * 50) + 10,
              daysSinceFirstListed: Math.floor(Math.random() * 90) + 1,
              dataSource: 'combined',
              lastUpdated: new Date().toISOString(),
              rawData: {
                mock: true,
                scenario: scenario.name,
                comparable: scenario.pricingData.comparable,
                timestamp: new Date().toISOString(),
              },
            })
            return
          }
        } catch (error) {
          console.log('Falling back to basic mock pricing')
        }

        // Fallback to basic mock pricing
        const year = request.year || 2018
        const make = request.make || 'Toyota'
        const model = request.model || 'Camry'
        const odometer = request.odometer || 80000

        const basePrice = this.calculateBasePrice(make, model, year)
        const odometerAdjustment = this.calculateOdometerAdjustment(odometer, year)

        const retailValue = Math.round(basePrice * odometerAdjustment)
        const tradeValue = Math.round(retailValue * 0.8)
        const privateValue = Math.round(retailValue * 0.9)

        resolve({
          make,
          model,
          year,
          variant: request.variant || 'SL Auto',
          odometer,
          condition: request.condition || 'good',
          retailValue,
          tradeValue,
          privateValue,
          marketPosition: odometer > 120000 ? 'below' : odometer < 60000 ? 'above' : 'at',
          priceConfidence: 'high',
          price30Days: Math.round(retailValue * 1.02),
          price90Days: Math.round(retailValue * 1.05),
          priceChange: 'decreasing',
          averageKmsForYear: 15000,
          marketListings: Math.floor(Math.random() * 50) + 10,
          daysSinceFirstListed: Math.floor(Math.random() * 90) + 1,
          dataSource: 'combined',
          lastUpdated: new Date().toISOString(),
          rawData: {
            mock: true,
            timestamp: new Date().toISOString(),
          },
        })
      }, Math.random() * 1000 + 500) // Random delay between 0.5-1.5s for realism
    })
  }

  private calculateBasePrice(make: string, model: string, year: number): number {
    // Mock pricing logic based on make/model/year
    const currentYear = new Date().getFullYear()
    const age = currentYear - year

    let basePrice = 50000 // Default base price

    // Adjust for make
    const makePricing: Record<string, number> = {
      'toyota': 35000,
      'honda': 32000,
      'mazda': 30000,
      'hyundai': 28000,
      'ford': 35000,
      'holden': 25000,
      'bmw': 60000,
      'mercedes': 70000,
      'audi': 65000,
    }

    basePrice = makePricing[make.toLowerCase()] || basePrice

    // Depreciate by age (rough 15% per year)
    basePrice = basePrice * Math.pow(0.85, age)

    return Math.max(basePrice, 5000) // Minimum $5k
  }

  private calculateOdometerAdjustment(odometer: number, year: number): number {
    const currentYear = new Date().getFullYear()
    const age = currentYear - year
    const expectedKms = age * 15000 // 15k per year average

    if (odometer < expectedKms * 0.7) {
      return 1.1 // Low kms, 10% premium
    } else if (odometer > expectedKms * 1.5) {
      return 0.8 // High kms, 20% discount
    }

    return 1.0 // Average kms
  }
}

export const pricingService = new PricingService()