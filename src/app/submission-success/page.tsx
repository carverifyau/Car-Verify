'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Mail, Calendar, Car, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import AuthHeaderButton from '@/components/AuthHeaderButton'

function SubmissionSuccessContent() {
  const searchParams = useSearchParams()
  const [details, setDetails] = useState({
    checksRemaining: 0,
    email: '',
    totalChecks: 10,
  })

  useEffect(() => {
    const checksRemaining = searchParams.get('checksRemaining') || '0'
    const email = searchParams.get('email') || ''
    const totalChecks = searchParams.get('totalChecks') || '10'

    setDetails({
      checksRemaining: parseInt(checksRemaining),
      email: decodeURIComponent(email),
      totalChecks: parseInt(totalChecks),
    })
  }, [searchParams])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-blue-600 p-1.5 md:p-2 rounded-lg">
                <Car className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <span className="text-xl md:text-2xl font-bold text-gray-900">Car Verify</span>
                <div className="text-[10px] md:text-xs text-blue-600 font-medium">AUTHORISED PPSR PROVIDER</div>
              </div>
            </Link>
            <nav className="flex items-center space-x-4 md:space-x-8">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden md:inline">Back to Home</span>
              </Link>
              <AuthHeaderButton />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12 min-h-[calc(100vh-80px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="h-20 w-20 text-white mx-auto mb-4" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              PPSR Check Submitted Successfully!
            </h1>
            <p className="text-green-50 text-lg">
              Your subscription was recognized
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Checks Remaining */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
              <div className="text-5xl font-black text-blue-600 mb-2">
                {details.checksRemaining}
              </div>
              <div className="text-gray-700 font-medium">
                Check{details.checksRemaining !== 1 ? 's' : ''} Remaining This Month
              </div>
              <div className="text-sm text-gray-500 mt-2">
                out of {details.totalChecks} total checks
              </div>
            </div>

            {/* Email Confirmation */}
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Certificate Delivery
                </h3>
                <p className="text-gray-600 text-sm">
                  Your PPSR certificate is being generated automatically and will be emailed to{' '}
                  <span className="font-medium text-blue-600">
                    {details.email}
                  </span>{' '}
                  within the next few minutes.
                </p>
              </div>
            </div>

            {/* Processing Time */}
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Automated Processing
                </h3>
                <p className="text-gray-600 text-sm">
                  Your official PPSR certificate is being retrieved automatically from
                  the government database. You'll receive an email with the PDF certificate
                  within minutes.
                </p>
              </div>
            </div>

            {/* What's Next */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold text-gray-900 mb-3 text-center">
                What happens next?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    1
                  </div>
                  <p className="text-gray-600 text-sm">
                    Our system automatically retrieves your official PPSR certificate from the
                    government database
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    2
                  </div>
                  <p className="text-gray-600 text-sm">
                    The certificate is automatically emailed to you (usually within minutes)
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    3
                  </div>
                  <p className="text-gray-600 text-sm">
                    You can also access your certificate anytime from your account dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="/account"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                View My Account
              </Link>
              <Link
                href="/"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                Submit Another Report
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Questions? Email us at{' '}
          <a
            href="mailto:carverifyau@gmail.com"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            carverifyau@gmail.com
          </a>
        </p>
      </motion.div>
      </div>

      <Footer />
    </div>
  )
}

export default function SubmissionSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SubmissionSuccessContent />
    </Suspense>
  )
}
