'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CreditCard, Lock, CheckCircle } from 'lucide-react'

interface CustomCheckoutFormProps {
  clientSecret: string
  subscriptionId: string
  customerEmail: string
}

export default function CustomCheckoutForm({
  clientSecret,
  subscriptionId,
  customerEmail
}: CustomCheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      setError('Payment form not ready. Please refresh the page.')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Validate that the payment element is complete
      const { error: submitError } = await elements.submit()

      if (submitError) {
        setError(submitError.message || 'Please complete the payment information')
        setIsProcessing(false)
        return
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/building-report?session_id=${subscriptionId}`,
        },
      })

      if (confirmError) {
        setError(confirmError.message || 'An error occurred during payment')
        setIsProcessing(false)
      }
    } catch (err) {
      console.error('Payment error:', err)
      setError('An unexpected error occurred')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="text-sm text-blue-900">
          <strong>Report will be sent to:</strong> {customerEmail}
        </div>
      </div>

      {/* Payment Element */}
      <div className="bg-white border border-gray-300 rounded-lg p-4">
        <PaymentElement
          options={{
            layout: {
              type: 'tabs',
              defaultCollapsed: false,
            },
            defaultValues: {
              billingDetails: {
                email: customerEmail,
              }
            }
          }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-5 md:py-4 px-8 rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold text-xl md:text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <Lock className="h-6 w-6" />
            <span>Pay $1 & Get PPSR Check</span>
          </>
        )}
      </button>

      {/* Trust Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Lock className="h-4 w-4" />
          <span>256-bit SSL Encrypted</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4" />
          <span>30-Day Guarantee</span>
        </div>
        <div className="flex items-center space-x-2">
          <CreditCard className="h-4 w-4" />
          <span>Secure Payment</span>
        </div>
      </div>

      {/* Fine Print */}
      <div className="text-center text-xs text-gray-500">
        By confirming payment, you agree to start a subscription at $1 today, then $20/month.
        <br />
        You can cancel anytime from your account settings.
      </div>
    </form>
  )
}
