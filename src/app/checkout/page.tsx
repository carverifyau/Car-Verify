'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, ArrowLeft, Car } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CustomCheckoutForm from '@/components/CustomCheckoutForm'
import { analytics } from '@/lib/analytics'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface VehicleInfo {
  type: 'vin' | 'rego'
  vin?: string
  rego?: string
  state?: string
}

function CheckoutPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null)
  const [customerEmail, setCustomerEmail] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [subscriptionId, setSubscriptionId] = useState('')
  const [isLoadingIntent, setIsLoadingIntent] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  useEffect(() => {
    const vin = searchParams.get('vin')
    const rego = searchParams.get('rego')
    const state = searchParams.get('state')

    if (vin) {
      setVehicleInfo({ type: 'vin', vin })
      analytics.checkoutViewed({ type: 'vin', vin })
    } else if (rego && state) {
      setVehicleInfo({ type: 'rego', rego, state })
      analytics.checkoutViewed({ type: 'rego', rego, state })
    }
  }, [searchParams])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!vehicleInfo) {
      alert('Vehicle information is missing')
      return
    }

    if (!customerEmail || !customerEmail.trim()) {
      analytics.paymentButtonClicked(false)
      alert('⚠️ Email address is required to receive your report!')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      analytics.paymentButtonClicked(false)
      alert('⚠️ Please enter a valid email address')
      return
    }

    analytics.paymentButtonClicked(true)
    setIsLoadingIntent(true)

    try {
      const response = await fetch('/api/create-subscription-intent', {
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

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize payment')
      }

      setClientSecret(data.clientSecret)
      setSubscriptionId(data.subscriptionId)
      setShowPaymentForm(true)
      analytics.redirectedToStripe()
    } catch (error) {
      console.error('Payment initialization error:', error)
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      alert(`Failed to initialize payment: ${errorMsg}\n\nPlease try again or contact support.`)
    } finally {
      setIsLoadingIntent(false)
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-12 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
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

          {/* Report Details */}
          <motion.div
            className="mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap">
                  🔒 OFFICIAL PPSR CHECK
                </span>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-600 p-6 md:p-8 pt-10 md:pt-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Official PPSR Check</h3>
                </div>

                <div className="space-y-3 mb-6 max-w-xl mx-auto">
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="font-semibold">Finance Owing / Security Interests</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="font-semibold">Stolen Vehicle Status</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="font-semibold">Write-Off History (WOVR)</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="font-semibold">Official PPSR Certificate (PDF)</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="font-semibold">Instant Email Delivery</span>
                  </div>
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

          {!showPaymentForm ? (
            <>
              {/* Email Collection Form */}
              <motion.div
                id="email-section"
                className="mb-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-600 p-8 max-w-2xl mx-auto">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Email</h3>
                    <p className="text-gray-700">Your PPSR certificate will be delivered instantly to this email</p>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="customerEmail" className="block text-lg font-bold text-gray-900 mb-3">
                        📧 Email Address *
                      </label>
                      <input
                        type="email"
                        id="customerEmail"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        onBlur={() => {
                          if (customerEmail && customerEmail.includes('@')) {
                            analytics.emailEntered()
                          }
                        }}
                        placeholder="your.email@example.com"
                        inputMode="email"
                        className="w-full px-6 py-5 md:py-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-all duration-200 text-xl md:text-lg"
                        required
                        autoComplete="email"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoadingIntent || !customerEmail.trim()}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 md:py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold text-xl md:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      {isLoadingIntent ? 'Loading...' : 'Continue to Payment'}
                    </button>
                  </form>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              {/* Custom Payment Form */}
              <motion.div
                className="mb-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-white rounded-2xl shadow-lg border-2 border-green-600 p-8 max-w-2xl mx-auto">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h3>
                    <div className="text-5xl font-black text-green-600 mb-2">$1</div>
                    <p className="text-gray-600">First PPSR check • Then $20/month for 10 checks</p>
                  </div>

                  {clientSecret && (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: 'stripe',
                          variables: {
                            colorPrimary: '#2563eb',
                            colorBackground: '#ffffff',
                            colorText: '#1f2937',
                            colorDanger: '#ef4444',
                            fontFamily: 'system-ui, sans-serif',
                            borderRadius: '8px',
                          },
                        },
                      }}
                    >
                      <CustomCheckoutForm
                        clientSecret={clientSecret}
                        subscriptionId={subscriptionId}
                        customerEmail={customerEmail}
                      />
                    </Elements>
                  )}
                </div>
              </motion.div>
            </>
          )}

          {/* Billing Disclaimer */}
          <motion.div
            className="mt-8 max-w-3xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-sm text-gray-600 leading-relaxed">
              <p className="mb-3">
                <strong className="text-gray-900">Subscription Terms:</strong> After your $1 payment today, your subscription will automatically renew at $20/month unless cancelled. The subscription includes 10 PPSR certificate checks per month, instant delivery, and access to all official government databases. You can cancel anytime from your account settings with no penalties or fees.
              </p>
              <p className="mb-3">
                <strong className="text-gray-900">Refund Policy:</strong> We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact us at carverifyau@gmail.com for a full refund.
              </p>
              <p>
                <strong className="text-gray-900">Data Accuracy:</strong> Car Verify obtains PPSR data from official Australian government sources (AFSA). While we strive for accuracy, we recommend using PPSR checks as part of your overall vehicle purchasing research. For full terms, see our <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">Terms of Service</Link>.
              </p>
            </div>
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
