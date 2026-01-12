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
        // Get current time in Sydney/Australia timezone
        const now = new Date()

        // Parse the formatted string back to get Sydney time components
        const sydneyTime = new Date(now.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }))

        // Validate the date is valid
        if (isNaN(sydneyTime.getTime())) {
          console.error('Invalid Sydney time conversion')
          setStatus({ isInMaintenance: false })
          return
        }

        const day = sydneyTime.getDay() // 0 = Sunday, 3 = Wednesday
        const hours = sydneyTime.getHours()

        // Check if it's Wednesday between 8pm (20:00) and midnight
        const isWednesday = day === 3
        const isDuringMaintenanceHours = hours >= 20

        // Also check if it's Thursday between midnight and 12am (first hour)
        const isThursdayEarlyMorning = day === 4 && hours === 0

        const isInMaintenance =
          (isWednesday && isDuringMaintenanceHours) || isThursdayEarlyMorning

        if (isInMaintenance) {
          // Calculate time until maintenance ends
          let maintenanceEnd: Date

          if (isWednesday) {
            // Maintenance ends at midnight (start of Thursday)
            maintenanceEnd = new Date(sydneyTime)
            maintenanceEnd.setHours(24, 0, 0, 0)
          } else {
            // We're in Thursday early morning, ends at 12:00am (already passed midnight)
            maintenanceEnd = new Date(sydneyTime)
            maintenanceEnd.setHours(0, 0, 0, 0)
          }

          const timeUntilEnd = maintenanceEnd.getTime() - now.getTime()
          const minutesRemaining = Math.ceil(timeUntilEnd / 1000 / 60)

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
