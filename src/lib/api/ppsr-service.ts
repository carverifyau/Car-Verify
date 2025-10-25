/* eslint-disable @typescript-eslint/no-explicit-any */
import { VehicleIdentifier } from '@/lib/vehicle-validation'
import { createPPSRB2GService, PPSRB2GService } from './ppsr-b2g-service'

export interface PPSRResponse {
  vehicleVin?: string
  vehicleRego?: string
  vehicleState?: string
  isFinanceOwing: boolean
  isStolen: boolean
  isWrittenOff: boolean
  certificateNumber: string
  searchDate: string
  securityInterests?: Array<{
    type: string
    registeredDate: string
    securedParty: string
    amount?: number
    description: string
  }>
  rawData?: any
}

export interface PPSRError {
  code: string
  message: string
  details?: any
}

class PPSRService {
  private b2gService: PPSRB2GService | null = null

  constructor() {
    // Initialize B2G service if credentials are available
    if (process.env.PPSR_B2G_ENDPOINT && process.env.PPSR_B2G_USERNAME && process.env.PPSR_B2G_PASSWORD) {
      this.b2gService = createPPSRB2GService()
    }
  }

  async searchVehicle(identifier: VehicleIdentifier): Promise<PPSRResponse> {
    // Use B2G service if available and configured
    if (this.b2gService) {
      try {
        console.log('Using PPSR B2G service for vehicle search')
        const b2gResponse = await this.b2gService.searchVehicle(identifier)

        if (!b2gResponse.success) {
          throw new Error(`PPSR B2G error: ${b2gResponse.faultCode} - ${b2gResponse.faultMessage}`)
        }

        // Convert B2G response to standard PPSRResponse format
        return {
          vehicleVin: b2gResponse.vehicleVin,
          vehicleRego: b2gResponse.vehicleRego,
          vehicleState: b2gResponse.vehicleState,
          isFinanceOwing: b2gResponse.isFinanceOwing,
          isStolen: b2gResponse.isStolen,
          isWrittenOff: b2gResponse.isWrittenOff,
          certificateNumber: b2gResponse.certificateNumber,
          searchDate: b2gResponse.searchDate,
          securityInterests: b2gResponse.securityInterests,
          rawData: {
            source: 'ppsr-b2g',
            xmlResponse: b2gResponse.rawXmlResponse,
          },
        }
      } catch (error) {
        console.error('PPSR B2G Service error:', error)
        // Fall back to mock data in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Falling back to mock data due to B2G error')
          return this.getMockResponse(identifier)
        }
        throw error
      }
    }

    // Fall back to mock data in development when no B2G service
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock PPSR data - B2G service not configured')
      return this.getMockResponse(identifier)
    }

    throw new Error('PPSR service not configured. Please set up B2G credentials.')
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

  private parseResponse(data: any, identifier: VehicleIdentifier): PPSRResponse {
    return {
      vehicleVin: identifier.type === 'vin' ? identifier.vin : data.vin,
      vehicleRego: identifier.type === 'rego' ? identifier.rego : data.registration,
      vehicleState: identifier.type === 'rego' ? identifier.state : data.state,
      isFinanceOwing: data.financeOwing || false,
      isStolen: data.stolen || false,
      isWrittenOff: data.writtenOff || false,
      certificateNumber: data.certificateNumber || `PPSR-${Date.now()}`,
      searchDate: new Date().toISOString(),
      rawData: data,
    }
  }

  private getMockResponse(identifier: VehicleIdentifier): Promise<PPSRResponse> {
    // Import mock data dynamically to avoid bundling issues
    const { getMockScenario } = require('@/lib/mock-data')

    // Simulate realistic API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const scenario = getMockScenario(identifier)

        console.log(`🎭 Mock scenario: ${scenario.name} - ${scenario.description}`)

        resolve({
          vehicleVin: identifier.type === 'vin' ? identifier.vin : scenario.vehicleData.vin,
          vehicleRego: identifier.type === 'rego' ? identifier.rego : scenario.vehicleData.rego,
          vehicleState: identifier.type === 'rego' ? identifier.state : scenario.vehicleData.state,
          isFinanceOwing: scenario.ppsrData.isFinanceOwing,
          isStolen: scenario.ppsrData.isStolen,
          isWrittenOff: scenario.ppsrData.isWrittenOff,
          securityInterests: scenario.ppsrData.securityInterests,
          certificateNumber: `PPSR-MOCK-${Date.now()}`,
          searchDate: new Date().toISOString(),
          rawData: {
            searchType: identifier.type,
            mock: true,
            scenario: scenario.name,
            vehicleData: scenario.vehicleData,
            nevdisData: scenario.nevdisData,
            pricingData: scenario.pricingData,
            timestamp: new Date().toISOString(),
          },
        })
      }, Math.random() * 1000 + 500) // Random delay between 0.5-1.5s for realism
    })
  }
}

export const ppsrService = new PPSRService()