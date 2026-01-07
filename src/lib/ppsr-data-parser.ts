/**
 * Parse PPSR Cloud search results into structured data for CustomVehicleReport
 */

interface PPSRSearchResult {
  // Vehicle identification
  vehicleIdentifier?: {
    vin?: string
    chassis?: string
    engine?: string
  }
  // NEVDIS data
  nevdisData?: {
    make?: string
    model?: string
    year?: string
    colour?: string
    bodyType?: string
    vin?: string
    engineNumber?: string
    transmissionType?: string
    fuelType?: string
    engineCapacity?: string
    cylinders?: string
    complianceDate?: string
    tareWeight?: string
    gvm?: string
    gcm?: string
  }
  // Security interests
  securityInterests?: Array<{
    registeredBy?: string
    registrationNumber?: string
    registrationDate?: string
    expiryDate?: string
    amount?: string
    type?: string
  }>
  // Stolen vehicle check
  stolenVehicleCheck?: {
    isStolen?: boolean
    stolenDate?: string
    reportNumber?: string
  }
  // Write-off information
  writeOffStatus?: {
    isWrittenOff?: boolean
    category?: string
    date?: string
    jurisdiction?: string
  }
}

export interface ParsedPPSRData {
  // Vehicle Registration Details
  rego: string
  state: string
  regoExpiry?: string

  // Vehicle Identification
  vin?: string
  chassis?: string
  engine?: string

  // Vehicle Specifications
  make?: string
  model?: string
  year?: string
  variant?: string
  series?: string
  color?: string
  bodyType?: string
  transmissionType?: string
  fuelType?: string
  engineCapacity?: string
  cylinders?: string

  // Compliance & Build
  complianceDate?: string
  buildDate?: string
  manufacturerCode?: string
  nvic?: string

  // Weights & Capacity
  tareWeight?: string
  gvm?: string
  gcm?: string

  // PPSR Security Data
  ppsrStatus: {
    hasFinance: boolean
    financeAmount?: string
    financier?: string
    securedParty?: string
    registrationDate?: string
    expiryDate?: string
    isStolen: boolean
    stolenDate?: string
    isWrittenOff: boolean
    writeOffCategory?: string
    writeOffDate?: string
    jurisdiction?: string
    securityInterests?: number
    encumbrances?: Array<{
      type: string
      registeredBy: string
      amount?: string
      date: string
    }>
  }

  // Report Metadata
  reportId: string
  searchDate: string
  certificateNumber?: string
  ppsrSearchNumber?: string
}

/**
 * Parse PPSR Cloud search result into structured data
 */
export function parsePPSRSearchResult(
  searchResult: any,
  vehicleIdentifier: { rego?: string; state?: string; vin?: string },
  reportId: string,
  searchDate: string,
  searchNumber?: string,
  certificateNumber?: string
): ParsedPPSRData {
  console.log('[PPSR Parser] Parsing search result:', JSON.stringify(searchResult, null, 2))

  // Extract NEVDIS data if available
  const nevdis = searchResult?.nevdisData || {}

  // Extract security interests
  const securityInterests = searchResult?.securityInterests || []
  const hasFinance = securityInterests.length > 0

  // Extract first security interest details
  const primarySecurity = securityInterests[0]

  // Extract stolen vehicle status
  const stolenCheck = searchResult?.stolenVehicleCheck || {}
  const isStolen = stolenCheck?.isStolen === true || stolenCheck?.status === 'STOLEN'

  // Extract write-off status
  const writeOffStatus = searchResult?.writeOffStatus || searchResult?.wovr || {}
  const isWrittenOff = writeOffStatus?.isWrittenOff === true || writeOffStatus?.status === 'WRITTEN_OFF'

  // Transform security interests into encumbrances array
  const encumbrances = securityInterests.map((si: any) => ({
    type: si.type || 'Security Interest',
    registeredBy: si.registeredBy || si.securedParty || 'Unknown',
    amount: si.amount,
    date: si.registrationDate || si.startDate || ''
  }))

  return {
    // Vehicle Registration
    rego: vehicleIdentifier.rego || '',
    state: vehicleIdentifier.state || '',

    // Vehicle Identification
    vin: vehicleIdentifier.vin || nevdis.vin || searchResult?.vehicleIdentifier?.vin,
    chassis: searchResult?.vehicleIdentifier?.chassis,
    engine: nevdis.engineNumber || searchResult?.vehicleIdentifier?.engine,

    // Vehicle Specifications
    make: nevdis.make || nevdis.manufacturer,
    model: nevdis.model,
    year: nevdis.year || nevdis.yearOfManufacture,
    variant: nevdis.variant || nevdis.series,
    color: nevdis.colour || nevdis.color,
    bodyType: nevdis.bodyType,
    transmissionType: nevdis.transmissionType,
    fuelType: nevdis.fuelType,
    engineCapacity: nevdis.engineCapacity,
    cylinders: nevdis.cylinders,

    // Compliance & Build
    complianceDate: nevdis.complianceDate,
    buildDate: nevdis.buildDate,

    // Weights
    tareWeight: nevdis.tareWeight,
    gvm: nevdis.gvm,
    gcm: nevdis.gcm,

    // PPSR Status
    ppsrStatus: {
      hasFinance,
      financeAmount: primarySecurity?.amount,
      financier: primarySecurity?.registeredBy || primarySecurity?.securedParty,
      securedParty: primarySecurity?.registeredBy,
      registrationDate: primarySecurity?.registrationDate,
      expiryDate: primarySecurity?.expiryDate,
      isStolen,
      stolenDate: stolenCheck?.stolenDate || stolenCheck?.reportDate,
      isWrittenOff,
      writeOffCategory: writeOffStatus?.category || writeOffStatus?.type,
      writeOffDate: writeOffStatus?.date || writeOffStatus?.writeOffDate,
      jurisdiction: writeOffStatus?.jurisdiction || writeOffStatus?.state,
      securityInterests: securityInterests.length,
      encumbrances
    },

    // Report Metadata
    reportId,
    searchDate,
    certificateNumber,
    ppsrSearchNumber: searchNumber
  }
}

/**
 * Helper to determine if vehicle has any issues
 */
export function hasVehicleIssues(data: ParsedPPSRData): boolean {
  return data.ppsrStatus.hasFinance ||
         data.ppsrStatus.isStolen ||
         data.ppsrStatus.isWrittenOff
}

/**
 * Generate a summary status message
 */
export function getVehicleStatusSummary(data: ParsedPPSRData): {
  status: 'clear' | 'warning' | 'alert'
  message: string
} {
  if (data.ppsrStatus.isStolen) {
    return {
      status: 'alert',
      message: 'This vehicle is registered as STOLEN'
    }
  }

  if (data.ppsrStatus.hasFinance && data.ppsrStatus.isWrittenOff) {
    return {
      status: 'alert',
      message: `This vehicle has ${data.ppsrStatus.securityInterests} finance encumbrance(s) and is a write-off`
    }
  }

  if (data.ppsrStatus.hasFinance) {
    return {
      status: 'warning',
      message: `This vehicle has ${data.ppsrStatus.securityInterests} finance encumbrance(s)`
    }
  }

  if (data.ppsrStatus.isWrittenOff) {
    return {
      status: 'warning',
      message: 'This vehicle is registered as a write-off'
    }
  }

  return {
    status: 'clear',
    message: 'No encumbrances, theft records, or write-off history found'
  }
}
