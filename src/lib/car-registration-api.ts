/**
 * CarRegistrationAPI Integration
 * $0.30 per lookup - returns Make, Model, VIN and 20+ other fields
 * https://www.carregistrationapi.com/
 */

interface VehicleData {
  make: string | null
  model: string | null
  year: string | null
  vin: string | null
  colour: string | null
  bodyType: string | null
  engineNumber: string | null
  regoExpiry: string | null
  [key: string]: any
}

class CarRegistrationAPIClient {
  private username: string
  private password: string
  private baseUrl: string = 'https://www.carregistrationapi.com/api/reg.asmx'

  constructor() {
    this.username = process.env.CAR_REGISTRATION_API_USERNAME || ''
    this.password = process.env.CAR_REGISTRATION_API_PASSWORD || ''
  }

  /**
   * Lookup vehicle by registration plate
   */
  async lookupVehicle(registrationNumber: string, state: string): Promise<VehicleData | null> {
    if (!this.username || !this.password) {
      throw new Error('CarRegistrationAPI credentials not configured')
    }

    console.log(`🚗 CarRegistrationAPI: Looking up ${registrationNumber} (${state})...`)

    try {
      // CarRegistrationAPI uses SOAP/XML but also supports a simpler endpoint
      // Endpoint: /api/reg.asmx/CheckAustralia
      const response = await fetch(`${this.baseUrl}/CheckAustralia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          RegistrationNumber: registrationNumber,
          State: state,
          username: this.username,
          password: this.password
        })
      })

      if (!response.ok) {
        console.error('❌ CarRegistrationAPI request failed:', response.status)
        const errorText = await response.text()
        console.error('   Error:', errorText.substring(0, 500))
        return null
      }

      // Response is XML, but contains JSON inside vehicleJson tag
      const xmlText = await response.text()
      console.log('📄 Raw response:', xmlText.substring(0, 500))

      // Extract the JSON from the vehicleJson XML tag
      const jsonMatch = xmlText.match(/<vehicleJson>([\s\S]*?)<\/vehicleJson>/i)

      if (!jsonMatch) {
        console.log('⚠️ No vehicleJson found in response')
        return null
      }

      // Parse the JSON
      const jsonData = JSON.parse(jsonMatch[1])
      console.log('📋 Parsed JSON:', JSON.stringify(jsonData, null, 2))

      const vehicleData: VehicleData = {
        make: jsonData.CarMake?.CurrentTextValue || null,
        model: jsonData.CarModel?.CurrentTextValue || null,
        year: jsonData.RegistrationYear || null,
        vin: jsonData.VechileIdentificationNumber || jsonData.VehicleIdentificationNumber || null, // Note: API has typo "Vechile"
        colour: jsonData.Colour || null,
        bodyType: jsonData.VehicleType || jsonData.BodyType || null,
        engineNumber: jsonData.EngineNumber || null,
        regoExpiry: jsonData.InsuranceExpiry || null
      }

      // Check if we got valid data
      if (!vehicleData.make && !vehicleData.model && !vehicleData.vin) {
        console.log('⚠️ No vehicle data found in JSON')
        return null
      }

      console.log('✅ Vehicle found:', {
        make: vehicleData.make,
        model: vehicleData.model,
        year: vehicleData.year,
        vin: vehicleData.vin
      })

      return vehicleData

    } catch (error) {
      console.error('❌ CarRegistrationAPI error:', error)
      return null
    }
  }
}

// Export singleton instance
export const carRegistrationAPI = new CarRegistrationAPIClient()
