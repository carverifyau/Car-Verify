'use client'

import { useState } from 'react'
import { Settings } from 'lucide-react'
import { supabase } from '@/lib/supabase-client'

interface CancelSubscriptionButtonProps {
  subscriptionId: string
}

export default function CancelSubscriptionButton({
  subscriptionId
}: CancelSubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleManageSubscription = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Get the current session to send the access token
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setError('Please log in to manage your subscription')
        setIsLoading(false)
        return
      }

      // Create a Stripe Customer Portal session
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to open subscription management')
      }

      // Redirect to Stripe Customer Portal
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div>
      {error && (
        <p className="text-sm text-red-700 mb-4 bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </p>
      )}
      <button
        onClick={handleManageSubscription}
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        <Settings className="h-4 w-4" />
        <span>{isLoading ? 'Loading...' : 'Manage Subscription'}</span>
      </button>
      <p className="text-xs text-gray-500 text-center mt-2">
        Update payment method, cancel, or view invoices
      </p>
    </div>
  )
}
