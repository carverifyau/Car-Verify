/* eslint-disable @typescript-eslint/no-explicit-any */
import { VehicleIdentifier } from '@/lib/vehicle-validation'

/**
 * PPSR B2G (Business-to-Government) API Service
 * Implements direct integration with Australian PPSR system
 */

export interface PPSRB2GConfig {
  endpoint: string
  username: string
  password: string
  namespace: string
  timeout: number
}

export interface PPSRB2GResponse {
  success: boolean
  certificateNumber: string
  searchDate: string
  vehicleVin?: string
  vehicleRego?: string
  vehicleState?: string
  isFinanceOwing: boolean
  isStolen: boolean
  isWrittenOff: boolean
  securityInterests: SecurityInterest[]
  rawXmlResponse?: string
  faultCode?: string
  faultMessage?: string
}

export interface SecurityInterest {
  type: string
  registeredDate: string
  securedParty: string
  amount?: number
  description: string
}

class PPSRB2GService {
  private config: PPSRB2GConfig

  constructor(config: PPSRB2GConfig) {
    this.config = config
  }

  /**
   * Search vehicle using PPSR B2G API
   */
  async searchVehicle(identifier: VehicleIdentifier): Promise<PPSRB2GResponse> {
    try {
      // Build SOAP envelope for PPSR B2G
      const soapRequest = this.buildSOAPRequest(identifier)

      // Make authenticated request to PPSR
      const response = await this.makeB2GRequest(soapRequest)

      // Parse XML response
      return this.parseB2GResponse(response, identifier)

    } catch (error) {
      console.error('PPSR B2G API error:', error)
      throw new Error(`PPSR B2G search failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Build SOAP request envelope for PPSR B2G
   */
  private buildSOAPRequest(identifier: VehicleIdentifier): string {
    const timestamp = new Date().toISOString()
    const searchType = identifier.type === 'vin' ? 'VIN' : 'REGISTRATION'

    // Build search criteria based on identifier type
    const searchCriteria = identifier.type === 'vin'
      ? `<ppsr:VIN>${identifier.vin}</ppsr:VIN>`
      : `<ppsr:RegistrationNumber>${identifier.rego}</ppsr:RegistrationNumber>
         <ppsr:State>${identifier.state}</ppsr:State>`

    return `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:ppsr="http://ppsr.gov.au/schemas/search/v1">
  <soap:Header>
    <ppsr:Authentication>
      <ppsr:Username>${this.config.username}</ppsr:Username>
      <ppsr:Password>${this.config.password}</ppsr:Password>
    </ppsr:Authentication>
    <ppsr:RequestMetadata>
      <ppsr:RequestId>${this.generateRequestId()}</ppsr:RequestId>
      <ppsr:Timestamp>${timestamp}</ppsr:Timestamp>
    </ppsr:RequestMetadata>
  </soap:Header>
  <soap:Body>
    <ppsr:VehicleSearchRequest>
      <ppsr:SearchType>${searchType}</ppsr:SearchType>
      <ppsr:SearchCriteria>
        ${searchCriteria}
      </ppsr:SearchCriteria>
      <ppsr:CertificateRequired>true</ppsr:CertificateRequired>
    </ppsr:VehicleSearchRequest>
  </soap:Body>
</soap:Envelope>`
  }

  /**
   * Make authenticated request to PPSR B2G endpoint
   */
  private async makeB2GRequest(soapRequest: string): Promise<string> {
    const response = await fetch(this.config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'urn:ppsr:search:VehicleSearch',
        'User-Agent': 'RegoReports/1.0',
      },
      body: soapRequest,
      signal: AbortSignal.timeout(this.config.timeout),
    })

    if (!response.ok) {
      throw new Error(`PPSR B2G HTTP error: ${response.status} ${response.statusText}`)
    }

    return await response.text()
  }

  /**
   * Parse XML response from PPSR B2G
   */
  private parseB2GResponse(xmlResponse: string, identifier: VehicleIdentifier): PPSRB2GResponse {
    // Note: In production, use a proper XML parser like 'fast-xml-parser'
    // This is a simplified implementation for demonstration

    try {
      // Check for SOAP faults first
      if (xmlResponse.includes('<soap:Fault>')) {
        const faultCode = this.extractXmlValue(xmlResponse, 'faultcode')
        const faultMessage = this.extractXmlValue(xmlResponse, 'faultstring')

        return {
          success: false,
          certificateNumber: '',
          searchDate: new Date().toISOString(),
          isFinanceOwing: false,
          isStolen: false,
          isWrittenOff: false,
          securityInterests: [],
          faultCode,
          faultMessage,
          rawXmlResponse: xmlResponse,
        }
      }

      // Parse successful response
      const certificateNumber = this.extractXmlValue(xmlResponse, 'ppsr:CertificateNumber') || `PPSR-${Date.now()}`
      const searchDate = this.extractXmlValue(xmlResponse, 'ppsr:SearchDate') || new Date().toISOString()

      // Extract security interests
      const securityInterests = this.parseSecurityInterests(xmlResponse)

      // Determine status flags
      const isFinanceOwing = securityInterests.some(si => si.type === 'FINANCE')
      const isStolen = this.extractXmlValue(xmlResponse, 'ppsr:StolenStatus') === 'true'
      const isWrittenOff = this.extractXmlValue(xmlResponse, 'ppsr:WriteOffStatus') === 'true'

      return {
        success: true,
        certificateNumber,
        searchDate,
        vehicleVin: identifier.type === 'vin' ? identifier.vin : this.extractXmlValue(xmlResponse, 'ppsr:VIN'),
        vehicleRego: identifier.type === 'rego' ? identifier.rego : this.extractXmlValue(xmlResponse, 'ppsr:RegistrationNumber'),
        vehicleState: identifier.type === 'rego' ? identifier.state : this.extractXmlValue(xmlResponse, 'ppsr:State'),
        isFinanceOwing,
        isStolen,
        isWrittenOff,
        securityInterests,
        rawXmlResponse: xmlResponse,
      }

    } catch (error) {
      throw new Error(`Failed to parse PPSR B2G response: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Extract security interests from XML response
   */
  private parseSecurityInterests(xmlResponse: string): SecurityInterest[] {
    const interests: SecurityInterest[] = []

    // This would need proper XML parsing in production
    // Simplified regex-based extraction for demonstration
    const interestMatches = xmlResponse.match(/<ppsr:SecurityInterest>(.*?)<\/ppsr:SecurityInterest>/gs)

    if (interestMatches) {
      for (const match of interestMatches) {
        interests.push({
          type: this.extractXmlValue(match, 'ppsr:InterestType') || 'UNKNOWN',
          registeredDate: this.extractXmlValue(match, 'ppsr:RegisteredDate') || '',
          securedParty: this.extractXmlValue(match, 'ppsr:SecuredParty') || 'Unknown',
          amount: parseFloat(this.extractXmlValue(match, 'ppsr:Amount') || '0'),
          description: this.extractXmlValue(match, 'ppsr:Description') || '',
        })
      }
    }

    return interests
  }

  /**
   * Simple XML value extraction (use proper XML parser in production)
   */
  private extractXmlValue(xml: string, tagName: string): string | null {
    const regex = new RegExp(`<${tagName}[^>]*>([^<]*)<\/${tagName}>`)
    const match = xml.match(regex)
    return match ? match[1].trim() : null
  }

  /**
   * Generate unique request ID for tracking
   */
  private generateRequestId(): string {
    return `RR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Test connection to PPSR B2G service
   */
  async testConnection(): Promise<boolean> {
    try {
      // Implement a simple ping/health check request
      const testRequest = this.buildTestRequest()
      const response = await this.makeB2GRequest(testRequest)
      return !response.includes('<soap:Fault>')
    } catch {
      return false
    }
  }

  /**
   * Build test request for connection verification
   */
  private buildTestRequest(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:ppsr="http://ppsr.gov.au/schemas/search/v1">
  <soap:Header>
    <ppsr:Authentication>
      <ppsr:Username>${this.config.username}</ppsr:Username>
      <ppsr:Password>${this.config.password}</ppsr:Password>
    </ppsr:Authentication>
  </soap:Header>
  <soap:Body>
    <ppsr:HealthCheckRequest/>
  </soap:Body>
</soap:Envelope>`
  }

  /**
   * Update B2G password (required periodically)
   */
  async updatePassword(newPassword: string): Promise<boolean> {
    try {
      // Store old password for rollback
      const oldPassword = this.config.password

      // Update password
      this.config.password = newPassword

      // Test new password
      const testResult = await this.testConnection()

      if (!testResult) {
        // Rollback on failure
        this.config.password = oldPassword
        throw new Error('New password failed validation')
      }

      return true
    } catch (error) {
      console.error('Password update failed:', error)
      return false
    }
  }
}

// Factory function to create PPSR B2G service
export function createPPSRB2GService(): PPSRB2GService {
  const config: PPSRB2GConfig = {
    endpoint: process.env.PPSR_B2G_ENDPOINT || '',
    username: process.env.PPSR_B2G_USERNAME || '',
    password: process.env.PPSR_B2G_PASSWORD || '',
    namespace: 'http://ppsr.gov.au/schemas/search/v1',
    timeout: 30000, // 30 seconds
  }

  return new PPSRB2GService(config)
}

export { PPSRB2GService }