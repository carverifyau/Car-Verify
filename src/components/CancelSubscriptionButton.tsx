'use client'

import { useState } from 'react'
import { XCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase-client'

interface CancelSubscriptionButtonProps {
  subscriptionId: string
}

export default function CancelSubscriptionButton({
  subscriptionId
}: CancelSubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCancel = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Get the current session to send the access token
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setError('Please log in to cancel your subscription')
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({ subscriptionId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription')
      }

      // Refresh the page to show updated status
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm font-medium text-red-900 mb-3">
          Are you sure you want to cancel your subscription?
        </p>
        <p className="text-sm text-red-700 mb-4">
          You'll continue to have access until the end of your current billing period.
        </p>
        {error && (
          <p className="text-sm text-red-700 mb-4 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
        <div className="flex space-x-3">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            {isLoading ? 'Canceling...' : 'Yes, Cancel'}
          </button>
          <button
            onClick={() => {
              setShowConfirm(false)
              setError(null)
            }}
            disabled={isLoading}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Keep Subscription
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-red-200"
    >
      <XCircle className="h-4 w-4" />
      <span>Cancel Subscription</span>
    </button>
  )
}
