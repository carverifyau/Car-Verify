/**
 * PPSR Cloud Maintenance Window Detection
 * PPSR Cloud is down every Wednesday 8pm-12am AEST for maintenance
 */

export interface MaintenanceStatus {
  isInMaintenance: boolean
  maintenanceWindow?: {
    start: Date
    end: Date
  }
  message?: string
}

/**
 * Check if current time is during PPSR Cloud maintenance window
 * Maintenance: Every Wednesday 8pm-12am AEST (Australian Eastern Standard Time)
 */
export function isPPSRMaintenanceWindow(): MaintenanceStatus {
  // Get current time in AEST (UTC+10) or AEDT (UTC+11 during daylight saving)
  const now = new Date()

  // Convert to Sydney/Australia timezone
  const sydneyTime = new Date(now.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }))

  const day = sydneyTime.getDay() // 0 = Sunday, 3 = Wednesday
  const hours = sydneyTime.getHours()
  const minutes = sydneyTime.getMinutes()

  // Check if it's Wednesday (day 3) between 8pm (20:00) and midnight (00:00)
  const isWednesday = day === 3
  const isDuringMaintenanceHours = hours >= 20 || hours < 0 // 8pm-12am (which is next day 00:00)

  // Also check if it's Thursday between midnight and 12am (first hour of Thursday)
  const isThursdayEarlyMorning = day === 4 && hours === 0

  const isInMaintenance = (isWednesday && isDuringMaintenanceHours) || isThursdayEarlyMorning

  if (isInMaintenance) {
    // Calculate maintenance window end time
    let maintenanceEnd: Date

    if (isWednesday) {
      // Maintenance ends at midnight (start of Thursday)
      maintenanceEnd = new Date(sydneyTime)
      maintenanceEnd.setHours(24, 0, 0, 0) // Midnight
    } else {
      // We're in Thursday early morning, ends at 12:00am (already passed midnight)
      maintenanceEnd = new Date(sydneyTime)
      maintenanceEnd.setHours(0, 0, 0, 0)
    }

    return {
      isInMaintenance: true,
      maintenanceWindow: {
        start: new Date(sydneyTime.setHours(20, 0, 0, 0)),
        end: maintenanceEnd
      },
      message: 'PPSR reports are unavailable during scheduled maintenance (Wednesday 8pm-12am AEST). Please try again after midnight.'
    }
  }

  return {
    isInMaintenance: false
  }
}

/**
 * Get user-friendly maintenance message
 */
export function getMaintenanceMessage(): string | null {
  const status = isPPSRMaintenanceWindow()
  return status.isInMaintenance ? status.message || null : null
}

/**
 * Calculate time until maintenance window ends
 */
export function getTimeUntilMaintenanceEnds(): number | null {
  const status = isPPSRMaintenanceWindow()

  if (!status.isInMaintenance || !status.maintenanceWindow) {
    return null
  }

  const now = new Date()
  const end = status.maintenanceWindow.end

  return end.getTime() - now.getTime() // milliseconds until end
}

/**
 * Format time remaining in a human-readable way
 */
export function formatTimeRemaining(milliseconds: number): string {
  const minutes = Math.ceil(milliseconds / 1000 / 60)

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`
  }

  return `${hours} hour${hours !== 1 ? 's' : ''} and ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`
}
