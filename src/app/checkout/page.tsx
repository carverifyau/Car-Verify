'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, ArrowLeft, ArrowRight, CreditCard, Lock, Car } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface VehicleInfo {
  type: 'vin' | 'rego'
  vin?: string
  rego?: string
  state?: string
}

interface VehicleDetails {
  make: string
  model: string
  year: number
  series?: string
  vin: string
  rego?: string
  state?: string
  body: string
  engine: string
  fuel: string
  colour: string
  buildDate: string
  scenario?: string
  dataSource?: string
  credits?: number
}

function CheckoutPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<'comprehensive'>('comprehensive')
  const [isCreatingPayment, setIsCreatingPayment] = useState(false)
  const [customerEmail, setCustomerEmail] = useState('')

  useEffect(() => {
    const vin = searchParams.get('vin')
    const rego = searchParams.get('rego')
    const state = searchParams.get('state')

    if (vin) {
      setVehicleInfo({ type: 'vin', vin })
    } else if (rego && state) {
      setVehicleInfo({ type: 'rego', rego, state })
    }
  }, [searchParams])

  const handlePurchase = async () => {
    if (!vehicleInfo) {
      alert('Vehicle information is missing')
      return
    }

    if (!customerEmail || !customerEmail.trim()) {
      alert('⚠️ Email address is required to receive your report!')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      alert('⚠️ Please enter a valid email address')
      return
    }

    setIsCreatingPayment(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: customerEmail.trim(),
          vehicleInfo,
          reportType: 'comprehensive',
        }),
      })

      const data = await response.json()

      // Log the full response for debugging
      console.log('Checkout session response:', { status: response.status, data })

      if (!response.ok) {
        // Handle API errors
        const errorMessage = data.error || data.message || 'Unknown error occurred'
        console.error('API error:', data)
        alert(`Payment Error: ${errorMessage}\n\nPlease contact support if this persists.`)
        return
      }

      if (data.url) {
        // Redirect to Stripe Checkout
        console.log('Redirecting to Stripe:', data.url)
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned from API')
      }
    } catch (error) {
      console.error('Payment initialization error:', error)
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      alert(`Failed to initialize payment: ${errorMsg}\n\nPlease try again or contact support.`)
    } finally {
      setIsCreatingPayment(false)
    }
  }

  const handlePaymentSuccess = () => {
    router.push('/checkout/success')
  }

  const scrollToEmailSection = () => {
    const emailSection = document.getElementById('email-section')
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  if (!vehicleInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Invalid Vehicle Information</h1>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300">
            Return to Homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">Car Verify</span>
                <div className="text-xs text-blue-600 font-medium">AUTHORISED PPSR PROVIDER</div>
              </div>
            </Link>
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Search</span>
            </Link>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-blue-600 font-semibold">Vehicle Details</span>
              </div>
              <div className="h-px bg-blue-600 w-16"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-blue-600 font-semibold">Choose Plan</span>
              </div>
              <div className="h-px bg-blue-600 w-16"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                </div>
                <span className="text-gray-500 font-semibold">Payment</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Vehicle Information */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Vehicle Information</h2>
            <div className="text-gray-700">
              {vehicleInfo.type === 'vin' ? (
                <div className="text-center">
                  <p className="text-blue-600 font-semibold text-lg">VIN: {vehicleInfo.vin}</p>
                  <p className="text-gray-600 text-sm mt-2">We&apos;ll search all Australian databases for this vehicle</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-blue-600 font-semibold text-lg">
                    Registration: {vehicleInfo.rego} ({vehicleInfo.state})
                  </p>
                  <p className="text-gray-600 text-sm mt-2">We&apos;ll search all Australian databases for this vehicle</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Single Comprehensive Report */}
          <motion.div
            className="mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                  🔒 COMPLETE PROTECTION REPORT
                </span>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-600 p-8">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Comprehensive Vehicle Report</h3>
                  <div className="text-gray-600">One-time payment • Instant delivery</div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-semibold">Official PPSR Certificate</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-semibold">Stolen Vehicle Check</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-semibold">Write-off History & Damage</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-semibold">Finance Owing Status</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-semibold">Accident History Report</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-semibold">Current Market Value</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-semibold">Safety Recalls & Defects</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-semibold">Registration History</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-semibold">Previous Owners Count</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-semibold">30-Day Money Back Guarantee</span>
                    </div>
                  </div>
                </div>

                <div className="text-center bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                  <div className="text-green-600 font-bold text-lg">
                    ✅ Save thousands by avoiding problem vehicles
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    Complete protection from stolen cars, write-offs, and hidden damage
                  </div>
                </div>

                {/* Authority & Speed */}
                <div className="grid md:grid-cols-3 gap-4 text-center text-sm mb-6">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="text-blue-600 font-bold">🏛️ OFFICIAL SOURCES</div>
                    <div className="text-gray-600">Direct access to government databases & PPSR</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="text-blue-600 font-bold">⚡ INSTANT DELIVERY</div>
                    <div className="text-gray-600">Complete report in under 60 seconds</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="text-blue-600 font-bold">💯 GUARANTEED</div>
                    <div className="text-gray-600">30-day money back guarantee</div>
                  </div>
                </div>

                {/* Get Report Button in Report Section */}
                <div className="text-center">
                  <button
                    onClick={scrollToEmailSection}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-bold text-lg flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    <Car className="h-6 w-6" />
                    <span>Get Report Now</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Urgency Statistics */}
          <motion.div
            className="mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl mb-6">
              <div className="text-center text-gray-700">
                <h3 className="text-xl font-bold mb-3 text-red-600">⚠️ Don&apos;t Risk It - Get The Facts First</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div className="bg-white p-3 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-600">180,000+</div>
                    <div className="text-gray-700">Cars stolen in Australia yearly</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-orange-200">
                    <div className="text-2xl font-bold text-orange-600">1 in 4</div>
                    <div className="text-gray-700">Cars have hidden problems</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-600">$25,000+</div>
                    <div className="text-gray-700">Average loss when buying blind</div>
                  </div>
                </div>
                <p className="text-red-600 font-bold mb-4">
                  🚨 1 in 6 used cars has serious hidden problems
                </p>

                {/* Real Horror Stories */}
                <div className="bg-white p-4 rounded-lg mb-4 border border-gray-200">
                  <h4 className="text-red-600 font-bold mb-2">Recent Cases:</h4>
                  <div className="text-left text-sm space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-red-600">•</span>
                      <span className="text-gray-700">"Bought a $35,000 BMW, discovered it was flood damaged. Engine died after 2 weeks. Total loss." - Sarah M, Melbourne</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-red-600">•</span>
                      <span className="text-gray-700">"Car had $18,000 finance owing. Bank seized it from my driveway." - Mike T, Sydney</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-red-600">•</span>
                      <span className="text-gray-700">&ldquo;&lsquo;Clean&rsquo; car turned out to be stolen. Police confiscated it, lost $22,000.&rdquo; - Emma K, Brisbane</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 font-bold text-lg">
                  📊 Over 65% of Australians don&apos;t check vehicle history before buying
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl mb-6">
              <div className="text-center text-gray-700">
                <h4 className="text-lg font-bold mb-3 text-blue-600">✅ Trusted by 50,000+ Australian Car Buyers</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl mb-2">⭐⭐⭐⭐⭐</div>
                    <div className="text-gray-600">"Saved me from buying a lemon. Report was detailed and instant." - David R</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">💰</div>
                    <div className="text-gray-600">"Report revealed $15k finance owing. Dodged a massive bullet!" - Lisa H</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🛡️</div>
                    <div className="text-gray-600">"Professional report helped negotiate $8k off asking price." - Tom S</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Email Collection Form - REQUIRED BEFORE PAYMENT */}
          <motion.div
            id="email-section"
            className="mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-500 p-8 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-red-600 mb-2">🚨 EMAIL REQUIRED</h3>
                <p className="text-gray-700">You MUST enter your email address to receive your report!</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="customerEmail" className="block text-lg font-bold text-gray-900 mb-3">
                    📧 Enter Your Email Address *
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-all duration-200 text-lg"
                    required
                    autoComplete="email"
                  />
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm font-medium">
                      ✅ Your complete vehicle report will be instantly delivered to this email address after payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Purchase Button - Email Validation */}
          <motion.div
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {!customerEmail || !customerEmail.trim() ? (
              <div className="max-w-lg mx-auto">
                <button
                  disabled
                  className="bg-gray-400 text-white py-4 px-12 rounded-xl cursor-not-allowed transition-all duration-300 font-semibold text-lg flex items-center space-x-3 mx-auto shadow-lg mb-4"
                >
                  <CreditCard className="h-6 w-6" />
                  <span>Enter Email First</span>
                  <Lock className="h-5 w-5" />
                </button>
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <p className="text-red-700 font-bold">⚠️ EMAIL REQUIRED</p>
                  <p className="text-red-600 text-sm mt-1">You must enter your email address before you can proceed to payment</p>
                </div>
              </div>
            ) : (
              <button
                onClick={handlePurchase}
                disabled={isCreatingPayment}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-12 rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <CreditCard className="h-6 w-6" />
                <span>
                  {isCreatingPayment
                    ? 'Preparing Checkout...'
                    : '🚨 Get Protected Now - Only $34.99'
                  }
                </span>
                <Lock className="h-5 w-5" />
              </button>
            )}

            <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Car className="h-4 w-4" />
                <span>Instant Delivery</span>
              </div>
            </div>

            <p className="mt-4 text-gray-600 text-sm max-w-2xl mx-auto">
              You'll be redirected to secure Stripe checkout. Your report will be generated instantly after payment and delivered to your email.
              All purchases include our 30-day money-back guarantee.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPageContent />
    </Suspense>
  )
}
