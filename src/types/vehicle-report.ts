// Comprehensive Vehicle Report Types - Based on REVS-CHECK format

export interface VehicleReport {
  id: string
  reportNumber: string
  createdAt: string
  updatedAt: string
  status: 'draft' | 'generating' | 'completed' | 'error'
  reportType: 'basic' | 'comprehensive' | 'premium'

  // Search Parameters
  searchCriteria: {
    registration?: string
    state?: string
    vin?: string
    searchDate: string
    requestedBy: string
  }

  // Core Vehicle Information
  vehicleDetails: VehicleDetails

  // PPSR Security Interests (Manual Entry)
  securityInterests: SecurityInterest[]

  // Registration & Ownership History
  registrationHistory: RegistrationHistory[]
  ownershipHistory: OwnershipRecord[]

  // Vehicle History Checks
  accidentHistory: AccidentRecord[]
  theftHistory: TheftRecord[]
  writeOffHistory: WriteOffRecord[]
  floodHistory: FloodRecord[]

  // Recalls & Safety
  recalls: RecallRecord[]
  safetyRatings: SafetyRating

  // Inspections & Compliance
  inspectionHistory: InspectionRecord[]
  complianceRecords: ComplianceRecord[]

  // Financial Information
  encumbrances: EncumbranceRecord[]

  // Market Valuation (AI Generated)
  marketValuation: MarketValuation

  // Additional AI Analysis
  aiAnalysis: AIAnalysis

  // Report Metadata
  reportGeneration: ReportMetadata
}

export interface VehicleDetails {
  // Basic Identification
  vin: string
  registrationNumber: string
  state: string
  plateType: string

  // Vehicle Specifications
  make: string
  model: string
  series?: string
  year: number
  manufactureDate?: string
  complianceDate?: string
  firstRegistrationDate?: string

  // Physical Characteristics
  bodyType: string
  bodyStyle?: string
  doors?: number
  seats: number
  colour: string
  colourCode?: string

  // Engine & Performance
  engineNumber?: string
  engineCapacity: number // in CC
  engineCapacityLitres: string
  cylinders?: number
  fuelType: string
  transmission: string
  driveType?: string
  powerKw?: number
  powerHp?: number

  // Dimensions & Weight
  length?: number
  width?: number
  height?: number
  wheelbase?: number
  grossVehicleMass?: number // GVM in kg
  tareWeight?: number // Tare weight in kg

  // Current Status
  registrationStatus: 'Current' | 'Expired' | 'Cancelled' | 'Suspended' | 'Written Off'
  registrationExpiry?: string
  lastRegistrationRenewal?: string

  // Additional Details
  variant?: string
  badge?: string
  buildDate?: string
  importDate?: string
  countryOfOrigin?: string

  // Odometer Reading
  odometerReading?: number
  odometerUnit: 'km' | 'miles'
  odometerDate?: string
  odometerSource?: string
}

export interface SecurityInterest {
  id: string
  registrationNumber: string
  dateRegistered: string
  type: 'Purchase Money Security Interest' | 'Non-Purchase Money Security Interest' | 'Transfer of Interest'
  securedParty: string
  securedPartyAbn?: string
  securedPartyAddress?: string

  // Financial Details
  amount?: number
  amountDisplay?: string
  currency?: string

  // Interest Details
  description?: string
  grantor?: string
  collateralClass: string
  collateralDescription?: string

  // Status & Dates
  status: 'Registered' | 'Discharged' | 'Expired'
  dischargeDate?: string
  expiryDate?: string

  // Additional Information
  migrationCode?: string
  amendmentDetails?: string

  // Manual Entry Fields
  manuallyEntered: boolean
  enteredBy?: string
  enteredDate?: string
  notes?: string
  sourceDocument?: string
}

export interface RegistrationHistory {
  id: string
  registrationNumber: string
  state: string
  dateFrom: string
  dateTo?: string
  status: string
  plateType?: string
  registrationClass?: string
  transferReason?: string
  notes?: string
}

export interface OwnershipRecord {
  id: string
  ownerNumber: number
  ownershipType: 'Individual' | 'Company' | 'Government' | 'Organisation'
  dateAcquired: string
  dateTransferred?: string
  acquisitionMethod: 'Purchase' | 'Finance' | 'Lease' | 'Gift' | 'Inheritance' | 'Other'
  state: string
  isCurrentOwner: boolean

  // Owner Details (Anonymized for privacy)
  ownerDetails?: {
    type: 'Individual' | 'Business'
    location?: string // General area only
    businessType?: string
  }

  // Transfer Details
  transferDetails?: {
    salePrice?: number
    transferType?: string
    dealerInvolved?: boolean
    financeInvolved?: boolean
  }
}

export interface AccidentRecord {
  id: string
  accidentDate: string
  reportNumber?: string
  severity: 'Minor' | 'Moderate' | 'Major' | 'Total Loss'

  // Damage Details
  damageDescription: string
  damageLocation: string[]
  estimatedRepairCost?: number
  actualRepairCost?: number

  // Insurance Details
  insuranceClaim?: boolean
  insuranceCompany?: string
  claimNumber?: string
  claimAmount?: number

  // Repair Information
  repairStatus: 'Repaired' | 'Not Repaired' | 'Write-off' | 'Unknown'
  repairFacility?: string
  repairDate?: string
  repairQuality?: 'OEM Parts' | 'Aftermarket Parts' | 'Mix' | 'Unknown'

  // Location & Circumstances
  accidentLocation?: string
  accidentType?: string
  weatherConditions?: string
  roadConditions?: string

  // Data Source
  dataSource: string
  sourceReliability: 'High' | 'Medium' | 'Low'
  lastUpdated: string
}

export interface TheftRecord {
  id: string
  reportDate: string
  reportNumber: string
  status: 'Stolen' | 'Recovered' | 'Not Recovered'

  // Theft Details
  theftLocation?: string
  theftDescription?: string
  theftType?: 'Vehicle' | 'Parts' | 'Contents'

  // Recovery Information
  recoveryDate?: string
  recoveryLocation?: string
  recoveryCondition?: string
  damageOnRecovery?: string

  // Police Information
  policeStation?: string
  investigatingOfficer?: string

  // Data Source
  dataSource: string
  lastUpdated: string
}

export interface WriteOffRecord {
  id: string
  writeOffDate: string
  category: 'Statutory Write-off' | 'Repairable Write-off' | 'Economic Write-off'

  // Write-off Details
  reason: string
  damageDescription?: string
  estimatedRepairCost?: number
  vehicleValue?: number
  writeOffRatio?: number

  // Insurance Details
  insuranceCompany?: string
  claimNumber?: string
  settlementAmount?: number

  // Current Status
  currentStatus: 'Written Off' | 'Repaired' | 'Dismantled' | 'Exported'
  repairDate?: string
  repairCertification?: string

  // Compliance
  jurisdictionNotified?: string[]
  complianceCertificate?: string

  // Data Source
  dataSource: string
  lastUpdated: string
}

export interface FloodRecord {
  id: string
  eventDate: string
  floodType: 'Fresh Water' | 'Salt Water' | 'Contaminated Water'
  severity: 'Minor' | 'Moderate' | 'Severe'

  // Damage Details
  waterLevel: string
  damageDescription: string
  areasAffected: string[]

  // Insurance & Repair
  insuranceClaim?: boolean
  repairCost?: number
  repairDate?: string
  repairQuality?: string

  // Location
  eventLocation?: string
  eventCause?: string

  // Data Source
  dataSource: string
  lastUpdated: string
}

export interface RecallRecord {
  id: string
  recallDate: string
  recallNumber: string
  campaignNumber?: string

  // Recall Details
  component: string
  defectDescription: string
  safetyRisk: 'High' | 'Medium' | 'Low'
  recallType: 'Safety' | 'Emissions' | 'Compliance'

  // Manufacturer Information
  manufacturer: string
  modelsCovered: string[]
  yearsAffected: string[]
  vinRanges?: string[]

  // Remedy Information
  remedyDescription: string
  partsRequired?: string[]
  repairTime?: string
  repairCost: 'Free' | 'Paid' | 'Varies'

  // Completion Status
  status: 'Outstanding' | 'Completed' | 'Not Applicable'
  completionDate?: string
  dealerCompleted?: string

  // Data Source
  dataSource: string
  lastUpdated: string
}

export interface SafetyRating {
  // ANCAP Rating
  ancapRating?: {
    overallRating: number
    adultOccupant: number
    childOccupant: number
    vulnerableRoadUsers: number
    safetyAssist: number
    testYear: number
    testVariant?: string
  }

  // Other Safety Ratings
  nhtsa?: {
    overallRating: number
    frontCrash: number
    sideCrash: number
    rollover: number
    testYear: number
  }

  // Safety Features
  standardSafetyFeatures: string[]
  optionalSafetyFeatures: string[]

  // Last Updated
  lastUpdated: string
}

export interface InspectionRecord {
  id: string
  inspectionDate: string
  inspectionType: 'Safety Certificate' | 'Roadworthy' | 'Blue Slip' | 'Pink Slip' | 'Annual Safety Check'

  // Inspection Details
  result: 'Pass' | 'Fail' | 'Conditional Pass'
  expiryDate?: string
  certificateNumber?: string

  // Inspector Information
  inspectorName?: string
  inspectionStation: string
  stationLicenseNumber?: string
  stationAddress?: string

  // Test Results
  testResults?: {
    brakes?: 'Pass' | 'Fail' | 'Advisory'
    suspension?: 'Pass' | 'Fail' | 'Advisory'
    steering?: 'Pass' | 'Fail' | 'Advisory'
    lights?: 'Pass' | 'Fail' | 'Advisory'
    tyres?: 'Pass' | 'Fail' | 'Advisory'
    exhaust?: 'Pass' | 'Fail' | 'Advisory'
    body?: 'Pass' | 'Fail' | 'Advisory'
    seatbelts?: 'Pass' | 'Fail' | 'Advisory'
  }

  // Odometer
  odometerReading?: number
  odometerUnit?: 'km' | 'miles'

  // Defects & Advisories
  defects?: string[]
  advisories?: string[]

  // Data Source
  dataSource: string
  lastUpdated: string
}

export interface ComplianceRecord {
  id: string
  complianceType: 'ADR' | 'EPA' | 'Import' | 'Registration'

  // Compliance Details
  complianceDate: string
  certificateNumber?: string
  issuingAuthority: string
  complianceStatus: 'Compliant' | 'Non-Compliant' | 'Conditional'

  // Standards Met
  standardsReference: string[]
  complianceMarks?: string[]

  // Import Information (if applicable)
  importApprovalNumber?: string
  importDate?: string
  importPort?: string
  importAgent?: string

  // Modification Details
  modifications?: {
    modificationType: string
    modificationDescription: string
    approvalNumber?: string
    modificationDate?: string
  }[]

  // Data Source
  dataSource: string
  lastUpdated: string
}

export interface EncumbranceRecord {
  id: string
  encumbranceType: 'Mortgage' | 'Lien' | 'Caveat' | 'Restriction'

  // Encumbrance Details
  dateRegistered: string
  encumbrancee: string
  encumbrancer: string
  description: string

  // Financial Information
  amount?: number
  currency?: string
  interestRate?: number

  // Status
  status: 'Active' | 'Discharged' | 'Expired'
  dischargeDate?: string
  expiryDate?: string

  // Legal Information
  courtOrder?: boolean
  courtDetails?: string
  legalReference?: string

  // Data Source
  dataSource: string
  lastUpdated: string
}

export interface MarketValuation {
  // Valuation Overview
  valuationDate: string
  currency: 'AUD'

  // Market Values
  retailValue: {
    low: number
    average: number
    high: number
    confidence: 'High' | 'Medium' | 'Low'
  }

  tradeValue: {
    low: number
    average: number
    high: number
    confidence: 'High' | 'Medium' | 'Low'
  }

  privateValue: {
    low: number
    average: number
    high: number
    confidence: 'High' | 'Medium' | 'Low'
  }

  // Depreciation Analysis
  depreciationAnalysis: {
    annualDepreciation: number
    totalDepreciation: number
    depreciationCurve: 'Linear' | 'Exponential' | 'Logarithmic'
    residualValue5Years?: number
  }

  // Market Factors
  marketFactors: {
    demandLevel: 'High' | 'Medium' | 'Low'
    supplyLevel: 'High' | 'Medium' | 'Low'
    marketTrend: 'Rising' | 'Stable' | 'Declining'
    seasonalFactors?: string[]
  }

  // Comparable Sales
  comparableSales: {
    salesCount: number
    averageSalePrice: number
    salesDateRange: string
    priceRange: {
      lowest: number
      highest: number
    }
  }

  // Condition Adjustments
  conditionAdjustments: {
    baseCondition: 'Excellent' | 'Good' | 'Average' | 'Poor'
    adjustmentFactors: {
      factor: string
      impact: number
      description: string
    }[]
  }

  // Data Sources & Methodology
  dataSources: string[]
  methodology: string
  lastUpdated: string

  // AI Generated Insights
  aiInsights: {
    investmentGrade: 'A' | 'B' | 'C' | 'D'
    resaleProspects: 'Excellent' | 'Good' | 'Fair' | 'Poor'
    riskFactors: string[]
    opportunities: string[]
  }
}

export interface AIAnalysis {
  // Overall Assessment
  overallRiskScore: number // 0-100 (0 = no risk, 100 = high risk)
  riskCategory: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High'

  // Key Findings
  keyFindings: {
    positive: string[]
    negative: string[]
    neutral: string[]
  }

  // Risk Analysis
  riskFactors: {
    category: string
    riskLevel: 'Low' | 'Medium' | 'High'
    description: string
    impact: string
  }[]

  // Market Intelligence
  marketIntelligence: {
    popularityIndex: number // 0-100
    maintenanceCosts: 'Low' | 'Medium' | 'High'
    reliabilityRating: number // 0-10
    fuelEconomyRating: 'Excellent' | 'Good' | 'Average' | 'Poor'
    insuranceCostEstimate: 'Low' | 'Medium' | 'High' | 'Very High'
  }

  // Recommendations
  recommendations: {
    buyerRecommendation: 'Strongly Recommend' | 'Recommend' | 'Consider with Caution' | 'Not Recommended'
    reasonsFor: string[]
    reasonsAgainst: string[]
    additionalChecks: string[]
  }

  // Future Outlook
  futureOutlook: {
    expectedDepreciation: 'Slow' | 'Average' | 'Fast'
    marketDemandForecast: 'Increasing' | 'Stable' | 'Declining'
    maintenanceOutlook: string
    resaleability: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  }

  // Analysis Metadata
  analysisDate: string
  modelVersion: string
  confidenceLevel: number // 0-100
  dataQualityScore: number // 0-100
}

export interface ReportMetadata {
  generatedBy: string
  generationDate: string
  reportVersion: string
  templateVersion: string

  // Data Sources Used
  dataSourcesAccessed: {
    source: string
    accessDate: string
    dataFreshness: 'Real-time' | 'Recent' | 'Historical'
    reliability: 'High' | 'Medium' | 'Low'
  }[]

  // Manual Entries
  manualEntries: {
    section: string
    enteredBy: string
    entryDate: string
    notes?: string
  }[]

  // Processing Time
  processingTime: {
    totalTime: number // in seconds
    dataCollection: number
    aiAnalysis: number
    reportGeneration: number
  }

  // Quality Metrics
  qualityMetrics: {
    dataCompleteness: number // 0-100%
    dataAccuracy: number // 0-100%
    reportConfidence: number // 0-100%
  }

  // Report Settings
  reportSettings: {
    includePersonalInfo: boolean
    includeFinancialDetails: boolean
    includePredictions: boolean
    reportLanguage: string
    currency: string
  }
}

// Helper Types for Admin Interface
export interface ReportTemplate {
  id: string
  name: string
  type: 'basic' | 'comprehensive' | 'premium'
  sections: string[]
  fieldMappings: Record<string, any>
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ReportGenerationRequest {
  searchCriteria: {
    registration?: string
    state?: string
    vin?: string
  }
  reportType: 'basic' | 'comprehensive' | 'premium'
  requestedBy: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  additionalRequests?: string[]
}

export interface BulkReportJob {
  id: string
  name: string
  requests: ReportGenerationRequest[]
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number // 0-100
  createdAt: string
  completedAt?: string
  results: {
    successful: number
    failed: number
    total: number
  }
}