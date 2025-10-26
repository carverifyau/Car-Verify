'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Shield, CheckCircle, Download, Mail, Clock } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

  useEffect(() => {
    const pi = searchParams.get('payment_intent')
    if (pi) {
      setPaymentIntent(pi)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="h-8 w-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-30"></div>
              </div>
              <span className="text-2xl font-bold text-white">Rego Reports</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <div className="relative inline-block">
                <CheckCircle className="h-24 w-24 text-green-400 mx-auto" />
                <div className="absolute inset-0 bg-green-400 blur-2xl opacity-30"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-white/80 mb-2">
              Your vehicle report is being generated
            </p>
            {paymentIntent && (
              <p className="text-white/60 text-sm">
                Order ID: {paymentIntent}
              </p>
            )}
          </motion.div>

          {/* What Happens Next */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">What Happens Next</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-cyan-500/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Processing</h3>
                <p className="text-white/70 text-sm">
                  Your report is being generated using official PPSR and government databases
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-500/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Email Delivery</h3>
                <p className="text-white/70 text-sm">
                  Your complete report will be emailed to you within 2-3 minutes
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-500/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Access Anytime</h3>
                <p className="text-white/70 text-sm">
                  Download and save your report for future reference
                </p>
              </div>
            </div>
          </motion.div>

          {/* Important Information */}
          <motion.div
            className="bg-amber-500/10 backdrop-blur-md rounded-2xl border border-amber-500/20 p-6 mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-amber-300 mb-3">Important Information</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>• Check your email inbox and spam folder for your report</li>
              <li>• Your report includes official PPSR certificate and detailed vehicle history</li>
              <li>• If you don&apos;t receive your report within 5 minutes, contact our support team</li>
              <li>• Keep your order ID safe for any future inquiries</li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="text-center space-y-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-8 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <Shield className="h-5 w-5" />
              <span>Get Another Report</span>
            </Link>

            <div className="mt-6">
              <p className="text-white/60 text-sm">
                Need help? Contact us at{' '}
                <a href="mailto:support@regoreports.com.au" className="text-cyan-400 hover:text-cyan-300">
                  support@regoreports.com.au
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
