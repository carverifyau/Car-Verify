/**
 * PPSR Cloud API Integration
 * Handles automated PPSR certificate fetching via PPSR Cloud B2B API
 */

interface PPSRCloudConfig {
  clientId: string
  clientSecret: string
  baseUrl: string
  oauthUrl: string
}

interface OAuthTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

interface VINLookupResponse {
  resource: {
    vin: string | null
    registrationPlate: string
    registrationState: string
  }
  hasError: boolean
  errors?: Array<{ errorCode: string; errorDescription: string }>
}

interface PPSRSearchResponse {
  resource: {
    ppsrCloudId: string
    searchCertificateNumber: string | null
    searchNumber: string
    nevdisVerificationStatus: string
    searchResult: any
  }
  hasError: boolean
  errors?: Array<{ errorCode: string; errorDescription: string }>
}

interface CertificateDownloadResponse {
  resource: {
    fileContent: string // base64 PDF
    fileName: string
  }
  hasError: boolean
  errors?: Array<{ errorCode: string; errorDescription: string }>
}

class PPSRCloudClient {
  private config: PPSRCloudConfig
  private accessToken: string | null = null
  private tokenExpiry: number = 0

  constructor() {
    this.config = {
      clientId: process.env.PPSR_CLOUD_CLIENT_ID || '',
      clientSecret: process.env.PPSR_CLOUD_CLIENT_SECRET || '',
      baseUrl: 'https://gateway.ppsrcloud.com/api/b2b',
      oauthUrl: 'https://gateway.ppsrcloud.com/connect/token'
    }

    if (!this.config.clientId || !this.config.clientSecret) {
      throw new Error('PPSR Cloud credentials not configured')
    }
  }

  /**
   * Get OAuth2 access token (with caching)
   */
  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid (with 60s buffer)
    if (this.accessToken && Date.now() < this.tokenExpiry - 60000) {
      return this.accessToken
    }

    console.log('🔐 Requesting new PPSR Cloud OAuth token...')

    const response = await fetch(this.config.oauthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        scope: 'ausearch_api'
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('❌ OAuth token request failed:', error)
      throw new Error(`Failed to get PPSR Cloud access token: ${response.status}`)
    }

    const data: OAuthTokenResponse = await response.json()
    this.accessToken = data.access_token
    this.tokenExpiry = Date.now() + (data.expires_in * 1000)

    console.log('✅ OAuth token received, expires in', data.expires_in, 'seconds')
    return this.accessToken
  }

  /**
   * Lookup VIN from registration plate and state
   */
  async lookupVIN(registrationPlate: string, registrationState: string): Promise<string | null> {
    console.log(`🔍 Looking up VIN for ${registrationPlate} (${registrationState})...`)

    const token = await this.getAccessToken()

    const response = await fetch(`${this.config.baseUrl}/AuVehicleLookup/lookup-vin-only`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registrationPlate,
        registrationPlateState: registrationState,
        customerRequestId: `vin-lookup-${Date.now()}`
      })
    })

    if (!response.ok) {
      console.error('❌ VIN lookup failed:', response.status)
      return null
    }

    const data: VINLookupResponse = await response.json()

    if (data.hasError || !data.resource?.vin) {
      console.log('⚠️ VIN not found, will search by registration plate instead')
      return null
    }

    console.log('✅ VIN found:', data.resource.vin)
    return data.resource.vin
  }

  /**
   * Submit PPSR search by VIN or registration plate
   */
  async submitPPSRSearch(params: {
    vin?: string
    registrationPlate?: string
    registrationState?: string
  }): Promise<PPSRSearchResponse> {
    console.log('📝 Submitting PPSR search...')

    const token = await this.getAccessToken()

    // Build request body based on what we have
    const requestBody: any = {
      customerRequestId: `ppsr-search-${Date.now()}`
    }

    if (params.vin) {
      requestBody.vin = params.vin
      console.log('  Using VIN:', params.vin)
    } else if (params.registrationPlate && params.registrationState) {
      requestBody.registrationPlate = params.registrationPlate
      requestBody.registrationPlateState = params.registrationState
      console.log('  Using Rego:', params.registrationPlate, params.registrationState)
    } else {
      throw new Error('Either VIN or registration plate + state required')
    }

    const response = await fetch(`${this.config.baseUrl}/Middleware/afsa-submit-mv-search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('❌ PPSR search failed:', error)
      throw new Error(`PPSR search failed: ${response.status}`)
    }

    const data: PPSRSearchResponse = await response.json()

    if (data.hasError) {
      console.error('❌ PPSR search returned errors:', data.errors)
      throw new Error('PPSR search failed: ' + (data.errors?.[0]?.errorDescription || 'Unknown error'))
    }

    console.log('✅ PPSR search completed')
    console.log('  Search Number:', data.resource.searchNumber)
    console.log('  Certificate Number:', data.resource.searchCertificateNumber || 'Not ready yet')

    return data
  }

  /**
   * Download PPSR certificate with retry logic
   */
  async downloadCertificate(
    searchCertificateNumber: string,
    maxRetries: number = 5,
    delayMs: number = 5000
  ): Promise<{ pdfBase64: string; filename: string }> {
    console.log('📄 Downloading PPSR certificate...')
    console.log('  Certificate Number:', searchCertificateNumber)
    console.log('  Max retries:', maxRetries, 'with', delayMs / 1000, 'second delays')

    const token = await this.getAccessToken()

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log(`  Attempt ${attempt}/${maxRetries}...`)

      const response = await fetch(`${this.config.baseUrl}/AuSearch/mv-summary-search-certificate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchCertificateNumber,
          customerRequestId: `cert-download-${Date.now()}`
        })
      })

      if (!response.ok) {
        const error = await response.text()
        console.log(`  ⚠️ Attempt ${attempt} failed (${response.status}): Certificate not ready yet`)

        // If not last attempt, wait and retry
        if (attempt < maxRetries) {
          console.log(`  ⏳ Waiting ${delayMs / 1000} seconds before retry...`)
          await new Promise(resolve => setTimeout(resolve, delayMs))
          continue
        }

        throw new Error(`Certificate download failed after ${maxRetries} attempts`)
      }

      const data: CertificateDownloadResponse = await response.json()

      if (data.hasError) {
        console.log(`  ⚠️ Attempt ${attempt} returned error:`, data.errors?.[0]?.errorDescription)

        // Check if it's a "not ready" error (code 570020)
        const notReadyError = data.errors?.find(e => e.errorCode === '570020')
        if (notReadyError && attempt < maxRetries) {
          console.log(`  ⏳ Certificate not ready, waiting ${delayMs / 1000} seconds...`)
          await new Promise(resolve => setTimeout(resolve, delayMs))
          continue
        }

        throw new Error('Certificate download failed: ' + (data.errors?.[0]?.errorDescription || 'Unknown error'))
      }

      // Success!
      console.log('✅ Certificate downloaded successfully')
      return {
        pdfBase64: data.resource.fileContent,
        filename: data.resource.fileName || 'PPSR_Certificate.pdf'
      }
    }

    throw new Error('Certificate download failed: Max retries exceeded')
  }

  /**
   * Complete PPSR check flow (lookup VIN, search, download certificate)
   */
  async performPPSRCheck(params: {
    vin?: string
    registrationPlate?: string
    registrationState?: string
  }): Promise<{
    pdfBase64: string
    filename: string
    searchNumber: string
    searchResult: any
  }> {
    console.log('🚗 Starting complete PPSR check...')

    let vin = params.vin

    // Step 1: If we only have rego/state, try to lookup VIN first
    if (!vin && params.registrationPlate && params.registrationState) {
      try {
        vin = await this.lookupVIN(params.registrationPlate, params.registrationState)
      } catch (error) {
        console.log('⚠️ VIN lookup failed, will search by registration plate')
      }
    }

    // Step 2: Submit PPSR search
    const searchResult = await this.submitPPSRSearch({
      vin,
      registrationPlate: params.registrationPlate,
      registrationState: params.registrationState
    })

    // Step 3: Download certificate (with retry logic)
    const certificateNumber = searchResult.resource.searchCertificateNumber

    if (!certificateNumber) {
      throw new Error('Search completed but certificate number not available')
    }

    const certificate = await this.downloadCertificate(certificateNumber)

    console.log('🎉 PPSR check completed successfully!')

    return {
      pdfBase64: certificate.pdfBase64,
      filename: certificate.filename,
      searchNumber: searchResult.resource.searchNumber,
      searchResult: searchResult.resource.searchResult
    }
  }
}

// Export singleton instance
export const ppsrCloudClient = new PPSRCloudClient()
