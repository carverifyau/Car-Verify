/* eslint-disable @typescript-eslint/no-explicit-any */
import { VehicleIdentifier } from './vehicle-validation'

/**
 * Enhanced mock data for realistic testing
 * Different scenarios based on input patterns
 */

export interface MockVehicleData {
  vin?: string
  rego?: string
  state?: string
  make: string
  model: string
  year: number
  series?: string
  body: string
  engine: string
  transmission: string
  fuel: string
  colour: string
  buildDate: string
  complianceDate: string
  tare: number
  gvm: number
}

export interface MockScenario {
  name: string
  description: string
  triggers: string[] // VINs or rego patterns that trigger this scenario
  vehicleData: MockVehicleData
  ppsrData: {
    isFinanceOwing: boolean
    isStolen: boolean
    isWrittenOff: boolean
    securityInterests: Array<{
      type: string
      registeredDate: string
      securedParty: string
      amount?: number
      description: string
    }>
  }
  nevdisData?: {
    isWrittenOff: boolean
    writeOffType?: 'total-loss' | 'repairable' | 'statutory'
    isStolen: boolean
    recalls: Array<{
      recallNumber: string
      description: string
      date: string
      status: 'outstanding' | 'completed'
    }>
  }
  pricingData?: {
    retailValue: number
    tradeValue: number
    marketPosition: 'above' | 'average' | 'below'
    priceConfidence: 'high' | 'medium' | 'low'
    comparable: Array<{
      source: string
      price: number
      date: string
    }>
  }
}

/**
 * Comprehensive mock scenarios for testing
 */
export const MOCK_SCENARIOS: MockScenario[] = [
  {
    name: "Clean Vehicle",
    description: "No issues, perfect for demonstrating clean reports",
    triggers: ["CLEAN", "ABC123", "GOOD", "WVWZZZ1JZ3W386752"],
    vehicleData: {
      make: "Toyota",
      model: "Camry",
      year: 2020,
      series: "ASV70R",
      body: "Sedan",
      engine: "2.5L 4cyl Petrol",
      transmission: "8-speed Automatic",
      fuel: "Petrol",
      colour: "Silver",
      buildDate: "2020-03-15",
      complianceDate: "2020-03-20",
      tare: 1590,
      gvm: 2060,
    },
    ppsrData: {
      isFinanceOwing: false,
      isStolen: false,
      isWrittenOff: false,
      securityInterests: [],
    },
    nevdisData: {
      isWrittenOff: false,
      isStolen: false,
      recalls: [],
    },
    pricingData: {
      retailValue: 32500,
      tradeValue: 28000,
      marketPosition: 'average',
      priceConfidence: 'high',
      comparable: [
        { source: "Carsales", price: 32900, date: "2024-01-15" },
        { source: "Drive", price: 32200, date: "2024-01-12" },
        { source: "AutoTrader", price: 32700, date: "2024-01-10" }
      ]
    }
  },
  {
    name: "Finance Owing",
    description: "Vehicle with outstanding finance - common scenario",
    triggers: ["FINANCE", "LOAN", "DEF456"],
    vehicleData: {
      make: "Holden",
      model: "Commodore",
      year: 2018,
      series: "ZB",
      body: "Sedan",
      engine: "3.6L V6 Petrol",
      transmission: "9-speed Automatic",
      fuel: "Petrol",
      colour: "White",
      buildDate: "2018-07-10",
      complianceDate: "2018-07-15",
      tare: 1845,
      gvm: 2355,
    },
    ppsrData: {
      isFinanceOwing: true,
      isStolen: false,
      isWrittenOff: false,
      securityInterests: [
        {
          type: "FINANCE",
          registeredDate: "2018-08-01",
          securedParty: "Westpac Banking Corporation",
          amount: 28500,
          description: "Consumer Finance Agreement"
        }
      ],
    },
    nevdisData: {
      isWrittenOff: false,
      isStolen: false,
      recalls: [
        {
          recallNumber: "PRA-2020-1234",
          description: "Takata Airbag Inflator Recall",
          date: "2020-01-15",
          status: "outstanding"
        }
      ],
    },
    pricingData: {
      retailValue: 24500,
      tradeValue: 21000,
      marketPosition: 'below',
      priceConfidence: 'medium',
      comparable: [
        { source: "Carsales", price: 25200, date: "2024-01-14" },
        { source: "Drive", price: 24100, date: "2024-01-11" },
      ]
    }
  },
  {
    name: "Written Off Vehicle",
    description: "Previously written off but repaired - high risk",
    triggers: ["WRITEOFF", "DAMAGE", "ACCIDENT", "GHI789"],
    vehicleData: {
      make: "Ford",
      model: "Focus",
      year: 2017,
      series: "LZ",
      body: "Hatchback",
      engine: "2.0L 4cyl Petrol",
      transmission: "6-speed Manual",
      fuel: "Petrol",
      colour: "Blue",
      buildDate: "2017-02-20",
      complianceDate: "2017-02-25",
      tare: 1385,
      gvm: 1855,
    },
    ppsrData: {
      isFinanceOwing: false,
      isStolen: false,
      isWrittenOff: true,
      securityInterests: [],
    },
    nevdisData: {
      isWrittenOff: true,
      writeOffType: 'repairable',
      isStolen: false,
      recalls: [],
    },
    pricingData: {
      retailValue: 15500,
      tradeValue: 12000,
      marketPosition: 'below',
      priceConfidence: 'low',
      comparable: [
        { source: "Carsales", price: 18200, date: "2024-01-13" },
        { source: "Drive", price: 15900, date: "2024-01-09" },
      ]
    }
  },
  {
    name: "Stolen Vehicle",
    description: "Vehicle reported as stolen - DO NOT PURCHASE",
    triggers: ["STOLEN", "THEFT", "JKL012"],
    vehicleData: {
      make: "BMW",
      model: "320i",
      year: 2019,
      series: "G20",
      body: "Sedan",
      engine: "2.0L 4cyl Turbo Petrol",
      transmission: "8-speed Automatic",
      fuel: "Petrol",
      colour: "Black",
      buildDate: "2019-05-10",
      complianceDate: "2019-05-15",
      tare: 1515,
      gvm: 2070,
    },
    ppsrData: {
      isFinanceOwing: true,
      isStolen: true,
      isWrittenOff: false,
      securityInterests: [
        {
          type: "FINANCE",
          registeredDate: "2019-06-01",
          securedParty: "BMW Financial Services",
          amount: 42000,
          description: "Novated Lease Agreement"
        }
      ],
    },
    nevdisData: {
      isWrittenOff: false,
      isStolen: true,
      recalls: [],
    }
  },
  {
    name: "Multiple Issues",
    description: "Finance owing + written off + recalls - worst case",
    triggers: ["PROBLEM", "BAD", "ISSUES", "MNO345"],
    vehicleData: {
      make: "Nissan",
      model: "Navara",
      year: 2016,
      series: "D23",
      body: "Dual Cab Utility",
      engine: "2.3L 4cyl Turbo Diesel",
      transmission: "7-speed Automatic",
      fuel: "Diesel",
      colour: "Red",
      buildDate: "2016-08-05",
      complianceDate: "2016-08-10",
      tare: 2065,
      gvm: 3200,
    },
    ppsrData: {
      isFinanceOwing: true,
      isStolen: false,
      isWrittenOff: true,
      securityInterests: [
        {
          type: "FINANCE",
          registeredDate: "2016-09-01",
          securedParty: "Nissan Financial Services",
          amount: 35000,
          description: "Hire Purchase Agreement"
        },
        {
          type: "LEASE",
          registeredDate: "2017-03-15",
          securedParty: "Fleet Leasing Australia",
          amount: 15000,
          description: "Operating Lease"
        }
      ],
    },
    nevdisData: {
      isWrittenOff: true,
      writeOffType: 'total-loss',
      isStolen: false,
      recalls: [
        {
          recallNumber: "PRA-2018-5678",
          description: "Brake Master Cylinder Fault",
          date: "2018-03-20",
          status: "outstanding"
        },
        {
          recallNumber: "PRA-2019-9012",
          description: "Fuel Pump Replacement",
          date: "2019-07-10",
          status: "completed"
        }
      ],
    },
    pricingData: {
      retailValue: 22000,
      tradeValue: 18000,
      marketPosition: 'below',
      priceConfidence: 'low',
      comparable: [
        { source: "Carsales", price: 26500, date: "2024-01-12" },
        { source: "Drive", price: 21800, date: "2024-01-08" },
      ]
    }
  },
  {
    name: "Luxury Vehicle",
    description: "High-value luxury car with clean history",
    triggers: ["LUXURY", "PREMIUM", "PORSCHE", "PQR678"],
    vehicleData: {
      make: "Porsche",
      model: "911",
      year: 2021,
      series: "992",
      body: "Coupe",
      engine: "3.0L 6cyl Turbo Petrol",
      transmission: "8-speed Dual-clutch Automatic",
      fuel: "Petrol",
      colour: "Guards Red",
      buildDate: "2021-01-15",
      complianceDate: "2021-01-20",
      tare: 1515,
      gvm: 1965,
    },
    ppsrData: {
      isFinanceOwing: false,
      isStolen: false,
      isWrittenOff: false,
      securityInterests: [],
    },
    nevdisData: {
      isWrittenOff: false,
      isStolen: false,
      recalls: [],
    },
    pricingData: {
      retailValue: 245000,
      tradeValue: 220000,
      marketPosition: 'average',
      priceConfidence: 'high',
      comparable: [
        { source: "Carsales", price: 248000, date: "2024-01-16" },
        { source: "Drive", price: 242000, date: "2024-01-14" },
        { source: "AutoTrader", price: 246500, date: "2024-01-12" }
      ]
    }
  }
]

/**
 * Get mock scenario based on vehicle identifier
 */
export function getMockScenario(identifier: VehicleIdentifier): MockScenario {
  const searchTerm = identifier.type === 'vin'
    ? identifier.vin.toUpperCase()
    : identifier.rego.toUpperCase()

  // Find matching scenario based on triggers
  const scenario = MOCK_SCENARIOS.find(scenario =>
    scenario.triggers.some(trigger =>
      searchTerm.includes(trigger) || trigger.includes(searchTerm)
    )
  )

  // Default to clean vehicle if no specific scenario matches
  return scenario || MOCK_SCENARIOS[0]
}

/**
 * Generate realistic Australian registration numbers
 */
export function generateMockRego(state: string): string {
  const patterns = {
    NSW: () => Math.random() > 0.5 ? `${randomLetters(2)}${randomNumbers(2)}${randomLetters(2)}` : `${randomNumbers(3)}${randomLetters(3)}`,
    VIC: () => `${randomNumbers(3)}${randomLetters(3)}`,
    QLD: () => `${randomNumbers(3)}${randomLetters(3)}`,
    WA: () => `1${randomLetters(2)}${randomNumbers(3)}`,
    SA: () => `S${randomNumbers(3)}${randomLetters(3)}`,
    TAS: () => `T${randomNumbers(3)}${randomLetters(2)}`,
    NT: () => `C${randomNumbers(2)}${randomLetters(3)}`,
    ACT: () => `Y${randomNumbers(2)}${randomLetters(3)}`,
  }

  return patterns[state as keyof typeof patterns]?.() || `${randomLetters(3)}${randomNumbers(3)}`
}

/**
 * Generate realistic VIN numbers
 */
export function generateMockVIN(): string {
  // Simplified VIN generation for testing
  const wmi = ['JHD', 'JF1', 'JN1', 'KMH', 'WVW', 'YV1'] // Common manufacturer codes
  const randomWMI = wmi[Math.floor(Math.random() * wmi.length)]
  const vds = randomAlphaNumeric(6)
  const vis = randomAlphaNumeric(8)

  return `${randomWMI}${vds}${vis}`
}

/**
 * Helper functions for generating random data
 */
function randomLetters(count: number): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return Array.from({ length: count }, () =>
    letters[Math.floor(Math.random() * letters.length)]
  ).join('')
}

function randomNumbers(count: number): string {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * 10).toString()
  ).join('')
}

function randomAlphaNumeric(count: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length: count }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
}

/**
 * Test patterns for demonstrating different scenarios
 */
export const TEST_PATTERNS = {
  CLEAN_VEHICLE: {
    vin: "WVWZZZ1JZ3W386752",
    rego: "ABC123",
    state: "NSW"
  },
  FINANCE_OWING: {
    vin: "JHD12345FINANCE01",
    rego: "DEF456",
    state: "VIC"
  },
  WRITTEN_OFF: {
    vin: "JF1WRITEOFF23456",
    rego: "GHI789",
    state: "QLD"
  },
  STOLEN_VEHICLE: {
    vin: "JN1STOLEN1234567",
    rego: "JKL012",
    state: "WA"
  },
  MULTIPLE_ISSUES: {
    vin: "KMPROBLEM1234567",
    rego: "MNO345",
    state: "SA"
  },
  LUXURY_VEHICLE: {
    vin: "WVW123LUXURY7890",
    rego: "PQR678",
    state: "NSW"
  }
}

export default MOCK_SCENARIOS