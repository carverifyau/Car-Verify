'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircleIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void;
  }
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [reportProcessed, setReportProcessed] = useState(false)
  const processingRef = useRef(false)
  const conversionFiredRef = useRef(false)

  // Fire Google Ads conversion event
  useEffect(() => {
    if (sessionId && !conversionFiredRef.current && typeof window !== 'undefined' && window.gtag) {
      conversionFiredRef.current = true

      window.gtag('event', 'conversion', {
        'send_to': 'AW-17728735517/XzilCO335L8bEJ2S3IVC',
        'transaction_id': sessionId
      })

      console.log('Google Ads conversion fired:', sessionId)
    }
  }, [sessionId])

  useEffect(() => {
    if (sessionId && !reportProcessed && !processingRef.current) {
      // Simulate webhook processing by creating report directly
      processingRef.current = true
      processReport(sessionId)
    }
  }, [sessionId])

  const processReport = async (sessionId: string) => {
    try {
      // Call our webhook simulation endpoint
      const response = await fetch('/api/simulate-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId })
      })

      if (response.ok) {
        console.log('Report processed successfully')
        setReportProcessed(true)
      } else {
        console.error('Failed to process report:', await response.text())
        processingRef.current = false // Reset on error to allow retry
      }
    } catch (error) {
      console.error('Failed to process report:', error)
      processingRef.current = false // Reset on error to allow retry
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <CheckCircleIcon className="w-24 h-24 text-green-400 mx-auto" />
          </motion.div>

          {/* Main Message */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Payment Successful! 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 mb-8"
          >
            Your vehicle report request has been received and is now in our processing queue.
          </motion.p>

          {/* Process Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-6">What Happens Next?</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <ClockIcon className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-medium text-white">Processing Time</h3>
                  <p className="text-gray-300 text-sm">
                    Our team will manually process your report within <strong>2-4 hours during business hours</strong> (Mon-Fri, 9AM-5PM AEST)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <UserGroupIcon className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-medium text-white">Expert Review</h3>
                  <p className="text-gray-300 text-sm">
                    Your vehicle will be manually checked against PPSR, NEVDIS, and pricing databases by our experienced team
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircleIcon className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-medium text-white">Email Delivery</h3>
                  <p className="text-gray-300 text-sm">
                    You'll receive your comprehensive vehicle report via email once processing is complete
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* MVP Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-8"
          >
            <h3 className="text-blue-400 font-medium mb-2">MVP Launch Special</h3>
            <p className="text-sm text-gray-300">
              We're currently processing reports manually to ensure the highest quality while we finalize our automated systems.
              This allows us to provide personalized attention to each report while maintaining our premium service standards.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Return to Homepage
            </Link>

            <div className="text-gray-400 text-sm">
              <p>Questions? Email us at <a href="mailto:support@regoreports.com.au" className="text-blue-400 hover:underline">support@regoreports.com.au</a></p>
            </div>
          </motion.div>

          {/* Order Reference */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-gray-500 text-xs"
          >
            <p>Reference: MVP-{Date.now().toString().slice(-6)}</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  )
}