'use client'

import { useState, useEffect } from 'react'

interface MaintenanceStatus {
  isInMaintenance: boolean
  message?: string
  timeRemaining?: string
}

/**
 * Client-side hook to check PPSR Cloud maintenance window
 * Checks every minute and updates status
 */
export function usePPSRMaintenance(): MaintenanceStatus {
  const [status, setStatus] = useState<MaintenanceStatus>({
    isInMaintenance: false,
  })

  useEffect(() => {
    const checkMaintenance = () => {
      try {
        // Get current time in Sydney/Australia timezone using Intl API
        const now = new Date()

        // Use Intl.DateTimeFormat to get Sydney timezone components reliably
        const formatter = new Intl.DateTimeFormat('en-AU', {
          timeZone: 'Australia/Sydney',
          weekday: 'short',
          hour: 'numeric',
          hour12: false,
        })

        const parts = formatter.formatToParts(now)
        const weekday = parts.find(p => p.type === 'weekday')?.value
        const hour = parts.find(p => p.type === 'hour')?.value

        if (!weekday || !hour) {
          console.error('Failed to extract timezone components')
          setStatus({ isInMaintenance: false })
          return
        }

        const hours = parseInt(hour, 10)
        const isWed = weekday === 'Wed'
        const isThu = weekday === 'Thu'

        // Check if it's Wednesday between 8pm (20:00) and midnight
        const isWednesdayMaintenance = isWed && hours >= 20

        // Also check if it's Thursday between midnight and 1am (first hour)
        const isThursdayEarlyMorning = isThu && hours === 0

        const isInMaintenance = isWednesdayMaintenance || isThursdayEarlyMorning

        if (isInMaintenance) {
          // Estimate time remaining (rough calculation since we don't have exact minutes)
          let hoursRemaining: number

          if (isWednesdayMaintenance) {
            // Hours until midnight
            hoursRemaining = 24 - hours
          } else {
            // Thursday early morning - less than 1 hour remaining
            hoursRemaining = 1
          }

          const minutesRemaining = hoursRemaining * 60

          let timeRemainingText = ''
          if (minutesRemaining < 60) {
            timeRemainingText = `${minutesRemaining} minute${minutesRemaining !== 1 ? 's' : ''}`
          } else {
            const hoursRemaining = Math.floor(minutesRemaining / 60)
            const mins = minutesRemaining % 60
            if (mins === 0) {
              timeRemainingText = `${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''}`
            } else {
              timeRemainingText = `${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''} and ${mins} minute${mins !== 1 ? 's' : ''}`
            }
          }

          setStatus({
            isInMaintenance: true,
            message:
              'PPSR reports are temporarily unavailable during scheduled maintenance (Wednesday 8pm-12am AEST). Please try again after midnight.',
            timeRemaining: timeRemainingText,
          })
        } else {
          setStatus({
            isInMaintenance: false,
          })
        }
      } catch (error) {
        console.error('Error checking maintenance window:', error)
        // Fail safe - assume no maintenance if we can't determine
        setStatus({ isInMaintenance: false })
      }
    }

    // Check immediately on mount
    checkMaintenance()

    // Check every minute
    const interval = setInterval(checkMaintenance, 60000)

    return () => clearInterval(interval)
  }, [])

  return status
}
