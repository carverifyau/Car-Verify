'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Shield } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    text: "Car Verify saved me from buying a stolen vehicle. The report was instant and comprehensive!",
    author: "Sarah M.",
    location: "Sydney, NSW"
  },
  {
    text: "Found out the car had $15,000 in finance owing. Dodged a bullet thanks to this service!",
    author: "James T.",
    location: "Melbourne, VIC"
  },
  {
    text: "Super fast and easy to use. Got my PPSR certificate in under a minute!",
    author: "Lisa K.",
    location: "Brisbane, QLD"
  },
  {
    text: "The detailed report helped me negotiate a better price. Worth every cent!",
    author: "Michael R.",
    location: "Perth, WA"
  },
  {
    text: "Peace of mind before the big purchase. Highly recommend to anyone buying a used car!",
    author: "Emma W.",
    location: "Adelaide, SA"
  }
]

function BuildingReportContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')

  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [currentStage, setCurrentStage] = useState('Verifying payment...')

  // Cycle through testimonials every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found')
      return
    }

    buildReport()
  }, [sessionId])

  const buildReport = async () => {
    try {
      // Animate progress smoothly from 0 to 100 over 20 seconds
      const duration = 20000
      const interval = 100
      const increments = duration / interval
      const progressPerIncrement = 100 / increments

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + progressPerIncrement
          if (newProgress >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return newProgress
        })
      }, interval)

      // Step 1: Verify payment
      setCurrentStage('Verifying payment...')
      await new Promise(resolve => setTimeout(resolve, 2000))

      const verifyResponse = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })

      if (!verifyResponse.ok) {
        clearInterval(progressInterval)
        throw new Error('Payment verification failed')
      }

      const verifyData = await verifyResponse.json()

      // Step 2: Wait for webhook to generate PPSR report
      // The Stripe webhook is generating the PPSR certificate in the background
      setCurrentStage('Building your PPSR report...')

      // Just show loading animation - the webhook is handling PPSR generation
      // This avoids duplicate API calls to PPSR Cloud
      await new Promise(resolve => setTimeout(resolve, 8000))

      // Wait for progress to hit 100%
      while (progress < 100) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      // Wait 1 more second for smooth UX
      await new Promise(resolve => setTimeout(resolve, 1000))

      clearInterval(progressInterval)

      // Redirect to payment-success (which will fetch the report from the database)
      router.push(`/payment-success?session_id=${sessionId}`)

    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
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
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto w-full"
          >
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2 text-center">
                {currentStage}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 px-2 text-center">
                Please wait while we build your report
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6 sm:mb-8 px-2">
              <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm sm:text-base text-gray-600 mt-2 text-center">{Math.round(progress)}% Complete</p>
            </div>

            {/* Loading Animation */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-blue-600 border-t-transparent rounded-full"
              />
            </div>

            {/* Cycling Testimonials */}
            <div className="mt-8 sm:mt-12 px-2">
              <div className="relative min-h-[160px] sm:min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonialIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm"
                  >
                    <div className="flex items-start mb-4">
                      <div className="text-blue-600 text-3xl sm:text-4xl mr-2 leading-none">"</div>
                      <p className="text-sm sm:text-base text-gray-700 italic pt-1 sm:pt-2">
                        {TESTIMONIALS[currentTestimonialIndex].text}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        {TESTIMONIALS[currentTestimonialIndex].author}
                      </p>
                      <p className="text-xs text-gray-500">
                        {TESTIMONIALS[currentTestimonialIndex].location}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {TESTIMONIALS.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentTestimonialIndex
                        ? 'w-8 bg-blue-600'
                        : 'w-1.5 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
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
