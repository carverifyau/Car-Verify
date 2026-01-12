'use client'

import { useState, useEffect } from 'react'

interface MaintenanceStatus {
  isInMaintenance: boolean
  message?: string
  timeRemaining?: string
}

/**
 * Client-side hook to check PPSR Cloud maintenance window
 * DISABLED - Rely on server-side check instead to avoid client crashes
 */
export function usePPSRMaintenance(): MaintenanceStatus {
  // Always return false - server-side API will block during maintenance
  return {
    isInMaintenance: false,
  }
}
