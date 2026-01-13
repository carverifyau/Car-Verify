'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Shield, CheckCircle, Mail } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

function BuildingReportContent() {
  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get('payment_intent')
  const sessionId = searchParams.get('session_id') // Legacy support

  const [verifying, setVerifying] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!paymentIntentId && !sessionId) {
      setError('No payment ID found')
      setVerifying(false)
      return
    }

    verifyPayment()
  }, [paymentIntentId, sessionId])

  const verifyPayment = async () => {
    try {
      const verifyResponse = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId || undefined,
          paymentIntentId: paymentIntentId || undefined
        }),
      })

      if (!verifyResponse.ok) {
        throw new Error('Payment verification failed')
      }

      // Payment verified successfully
      setVerifying(false)

    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <Link href="/" className="flex items-center justify-center space-x-2 sm:space-x-3">
            <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">Car Verify</span>
              <div className="text-[10px] sm:text-xs text-blue-600 font-medium">AUTHORISED PPSR PROVIDER</div>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-12">
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 sm:p-8 mx-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-red-900 mb-3 sm:mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-sm sm:text-base text-red-700 mb-4 sm:mb-6">{error}</p>
              <Link
                href="/"
                className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </motion.div>
        ) : verifying ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-blue-600 border-t-transparent rounded-full"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Verifying payment...
            </h1>
            <p className="text-gray-600">Please wait a moment</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 sm:p-8 mx-2">
              {/* Success Icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-600" />
                </div>
              </div>

              {/* Success Message */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-3 sm:mb-4">
                Payment Successful!
              </h1>

              <p className="text-base sm:text-lg text-green-800 mb-6">
                Your PPSR report is being generated and will be ready shortly.
              </p>

              {/* Email Notice */}
              <div className="bg-white border border-green-300 rounded-lg p-4 sm:p-6 mb-6">
                <div className="flex items-center justify-center mb-3">
                  <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2" />
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Check Your Email
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-700">
                  Your complete PPSR report will be sent to your email address within the next few minutes.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Don't forget to check your spam folder if you don't see it in your inbox.
                </p>
              </div>

              {/* New Search Button */}
              <Link
                href="/"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white text-base sm:text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Search Another Vehicle
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function BuildingReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <BuildingReportContent />
    </Suspense>
  )
}
