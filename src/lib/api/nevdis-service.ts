/* eslint-disable @typescript-eslint/no-explicit-any */
import { VehicleIdentifier } from '@/lib/vehicle-validation'

export interface NEVDISResponse {
  vehicleVin: string
  vehicleRego?: string
  vehicleState?: string
  isStolen: boolean
  isWrittenOff: boolean
  writeOffType?: 'total-loss' | 'statutory' | 'repairable' | 'hail-damage'
  writeOffDate?: string
  stolenDate?: string
  jurisdiction: string
  make?: string
  model?: string
  year?: number
  bodyType?: string
  colour?: string
  engineNumber?: string
  compliance?: string
  rawData?: any
}

class NEVDISService {
  private apiUrl: string
  private apiKey: string

  constructor() {
    this.apiUrl = process.env.MOTORWEB_API_URL || 'https://api.motorweb.au'
    this.apiKey = process.env.MOTORWEB_API_KEY || ''
  }

  async searchVehicle(identifier: VehicleIdentifier): Promise<NEVDISResponse> {
    // For now, return mock data until we have real API access
    if (process.env.NODE_ENV === 'development' && !this.apiKey) {
      return this.getMockResponse(identifier)
    }

    try {
      const searchData = this.buildSearchData(identifier)

      const response = await fetch(`${this.apiUrl}/nevdis/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(searchData),
      })

      if (!response.ok) {
        throw new Error(`NEVDIS API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return this.parseResponse(data, identifier)
    } catch (error) {
      console.error('NEVDIS Service error:', error)
      throw error
    }
  }

  private buildSearchData(identifier: VehicleIdentifier) {
    if (identifier.type === 'vin') {
      return {
        searchType: 'vin',
        vin: identifier.vin,
      }
    } else {
      return {
        searchType: 'registration',
        registration: identifier.rego,
        state: identifier.state,
      }
    }
  }

  private parseResponse(data: any, identifier: VehicleIdentifier): NEVDISResponse {
    return {
      vehicleVin: data.vin || (identifier.type === 'vin' ? identifier.vin : 'UNKNOWN'),
      vehicleRego: data.registration || (identifier.type === 'rego' ? identifier.rego : undefined),
      vehicleState: data.state || (identifier.type === 'rego' ? identifier.state : undefined),
      isStolen: data.stolen || false,
      isWrittenOff: data.writtenOff || false,
      writeOffType: data.writeOffType,
      writeOffDate: data.writeOffDate,
      stolenDate: data.stolenDate,
      jurisdiction: data.jurisdiction || 'NSW',
      make: data.make,
      model: data.model,
      year: data.year,
      bodyType: data.bodyType,
      colour: data.colour,
      engineNumber: data.engineNumber,
      compliance: data.compliance,
      rawData: data,
    }
  }

  private getMockResponse(identifier: VehicleIdentifier): Promise<NEVDISResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { getMockScenario } = require('@/lib/mock-data')
        const scenario = getMockScenario(identifier)

        console.log(`🎭 NEVDIS Mock scenario: ${scenario.name}`)

        resolve({
          vehicleVin: identifier.type === 'vin' ? identifier.vin : scenario.vehicleData.vin || 'NEVDIS1234567890',
          vehicleRego: identifier.type === 'rego' ? identifier.rego : scenario.vehicleData.rego,
          vehicleState: identifier.type === 'rego' ? identifier.state : scenario.vehicleData.state,
          isStolen: scenario.nevdisData?.isStolen || false,
          isWrittenOff: scenario.nevdisData?.isWrittenOff || false,
          writeOffType: scenario.nevdisData?.writeOffType,
          writeOffDate: scenario.nevdisData?.isWrittenOff ? '2023-06-15' : undefined,
          stolenDate: scenario.nevdisData?.isStolen ? '2023-08-10' : undefined,
          jurisdiction: identifier.type === 'rego' ? identifier.state : 'NSW',
          make: scenario.vehicleData.make,
          model: scenario.vehicleData.model,
          year: scenario.vehicleData.year,
          bodyType: scenario.vehicleData.body,
          colour: scenario.vehicleData.colour,
          engineNumber: scenario.vehicleData.engine.replace(/[^A-Z0-9]/g, '').substring(0, 10),
          compliance: 'ADR',
          rawData: {
            searchType: identifier.type,
            mock: true,
            scenario: scenario.name,
            recalls: scenario.nevdisData?.recalls || [],
            timestamp: new Date().toISOString(),
          },
        })
      }, Math.random() * 1500 + 1000) // Random delay between 1-2.5s for realism
    })
  }
}

export const nevdisService = new NEVDISService()