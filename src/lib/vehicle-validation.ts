import { z } from 'zod'

// Australian VIN validation (17 characters, alphanumeric, no I, O, Q)
export const vinSchema = z.string()
  .length(17, 'VIN must be exactly 17 characters')
  .regex(/^[A-HJ-NPR-Z0-9]+$/, 'VIN contains invalid characters (no I, O, or Q allowed)')
  .transform(s => s.toUpperCase())

// Australian registration validation (varies by state)
export const regoSchema = z.string()
  .min(3, 'Registration must be at least 3 characters')
  .max(7, 'Registration must be at most 7 characters')
  .regex(/^[A-Z0-9]+$/, 'Registration can only contain letters and numbers')
  .transform(s => s.toUpperCase())

// State validation
export const stateSchema = z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'])

// Vehicle identifier (either VIN or Rego + State)
export const vehicleIdentifierSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('vin'),
    vin: vinSchema,
  }),
  z.object({
    type: z.literal('rego'),
    rego: regoSchema,
    state: stateSchema,
  }),
])

export type VehicleIdentifier = z.infer<typeof vehicleIdentifierSchema>

// Utility functions
export function isValidVin(vin: string): boolean {
  try {
    vinSchema.parse(vin)
    return true
  } catch {
    return false
  }
}

export function isValidRego(rego: string): boolean {
  try {
    regoSchema.parse(rego)
    return true
  } catch {
    return false
  }
}

export function formatVin(vin: string): string {
  return vin.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '')
}

export function formatRego(rego: string): string {
  return rego.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

// Validate and parse vehicle identifier
export function validateVehicleIdentifier(input: any): { isValid: boolean; identifier?: VehicleIdentifier; error?: string } {
  try {
    const identifier = vehicleIdentifierSchema.parse(input)
    return { isValid: true, identifier }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Invalid vehicle identifier' }
    }
    return { isValid: false, error: 'Invalid vehicle identifier format' }
  }
}

// VIN checksum validation (basic implementation)
export function validateVinChecksum(vin: string): boolean {
  if (vin.length !== 17) return false

  const transliteration = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'P': 7, 'R': 9,
    'S': 2, 'T': 3, 'U': 4, 'V': 5, 'W': 6, 'X': 7, 'Y': 8, 'Z': 9
  }

  const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2]

  let sum = 0
  for (let i = 0; i < 17; i++) {
    const char = vin[i]
    let value: number

    if (char >= '0' && char <= '9') {
      value = parseInt(char)
    } else if (char in transliteration) {
      value = transliteration[char as keyof typeof transliteration]
    } else {
      return false // Invalid character
    }

    sum += value * weights[i]
  }

  const remainder = sum % 11
  const checkDigit = remainder === 10 ? 'X' : remainder.toString()

  return checkDigit === vin[8]
}