'use client'

import { useState, useEffect, useCallback } from 'react'
import { Shield, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CustomCheckoutForm from '@/components/CustomCheckoutForm'
import { usePPSRMaintenance } from '@/hooks/usePPSRMaintenance'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface VehicleData {
  vin: string
  make: string
  model: string
  year: string
  rego: string
  state: string
}

export default function VehicleSearchPage() {
  const [rego, setRego] = useState('')
  const [state, setState] = useState('QLD')
  const [step, setStep] = useState<'search' | 'loading' | 'confirmed' | 'building-report' | 'agreement' | 'email-capture' | 'pricing' | 'payment'>('confirmed')
  const [progress, setProgress] = useState(0)
  const [vehicle, setVehicle] = useState<VehicleData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [reportSection, setReportSection] = useState(0)
  const [reportProgress, setReportProgress] = useState(0)
  const [didYouKnowIndex, setDidYouKnowIndex] = useState(0)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'casual' | 'plus'>('casual')
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState('')
  const [paymentIntentId, setPaymentIntentId] = useState('')

  // Check PPSR maintenance window
  const maintenanceStatus = usePPSRMaintenance()

  // Read vehicle data from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const vehicleMake = params.get('vehicle_make')
    const vehicleModel = params.get('vehicle_model')
    const vehicleYear = params.get('vehicle_year')
    const vehicleVin = params.get('vehicle_vin')
    const vehicleRego = params.get('rego')
    const vehicleState = params.get('state')

    if (vehicleMake && vehicleModel) {
      setVehicle({
        make: vehicleMake,
        model: vehicleModel,
        year: vehicleYear || '',
        vin: vehicleVin || '',
        rego: vehicleRego || '',
        state: vehicleState || ''
      })
      setRego(vehicleRego || '')
      setState(vehicleState || 'QLD')
      setStep('confirmed')
    }
  }, [])

  const handleSearch = async () => {
    if (!rego.trim()) {
      setError('Please enter a registration number')
      return
    }

    setError(null)
    setStep('loading')
    setProgress(0)

    // Animate progress from 0 to 100 over 20 seconds
    const duration = 20000 // 20 seconds
    const interval = 100 // Update every 100ms
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

    try {
      // Call the API to lookup vehicle
      const response = await fetch('/api/lookup-vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rego: rego.toUpperCase().trim(),
          state
        })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        clearInterval(progressInterval)
        setError(data.message || 'Vehicle not found')
        setStep('search')
        return
      }

      // Wait for animation to complete before showing result
      const elapsed = (progress / 100) * duration
      const remaining = duration - elapsed

      if (remaining > 0) {
        await new Promise(resolve => setTimeout(resolve, remaining))
      }

      setVehicle(data.vehicle)
      setStep('confirmed')
    } catch (err) {
      clearInterval(progressInterval)
      setError('Failed to lookup vehicle. Please try again.')
      setStep('search')
    }
  }

  const initializePayment = useCallback(async () => {
    console.log('💳 initializePayment called. Vehicle:', !!vehicle, 'Email:', !!email)
    if (!vehicle || !email) {
      setPaymentError('Missing vehicle or email information')
      return
    }

    setIsProcessingPayment(true)
    setPaymentError(null)

    try {
      console.log('💳 Calling create-payment-intent API...')
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: email,
          vehicleInfo: {
            type: 'rego',
            rego: vehicle.rego,
            state: vehicle.state,
            vin: vehicle.vin,
          },
          reportType: 'comprehensive',
        }),
      })

      const data = await response.json()
      console.log('💳 API response received:', data)

      if (!response.ok) {
        // Handle maintenance window specifically
        if (response.status === 503 && data.message) {
          throw new Error(data.message)
        }
        throw new Error(data.message || data.error || 'Failed to initialize payment')
      }

      setClientSecret(data.clientSecret)
      setPaymentIntentId(data.paymentIntentId)
      console.log('💳 Payment initialized successfully')
    } catch (error) {
      console.error('❌ Payment initialization error:', error)
      setPaymentError(error instanceof Error ? error.message : 'Payment initialization failed. Please try again.')
    } finally {
      setIsProcessingPayment(false)
    }
  }, [vehicle, email])

  // Auto-initialize payment when payment step loads
  useEffect(() => {
    console.log('💳 Payment useEffect triggered. Step:', step, 'ClientSecret:', !!clientSecret, 'Processing:', isProcessingPayment)
    if (step === 'payment' && !clientSecret && !isProcessingPayment) {
      console.log('💳 Calling initializePayment...')
      initializePayment()
    }
  }, [step, clientSecret, isProcessingPayment, initializePayment])


  // Customer testimonials
  const testimonials = [
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
    },
    {
      text: "Discovered the car was a repairable write-off that the seller didn't mention. Thank you Car Verify!",
      author: "David L.",
      location: "Gold Coast, QLD"
    },
    {
      text: "As a used car dealer, this service saves me so much time. The unlimited reports plan is perfect!",
      author: "Tony P.",
      location: "Parramatta, NSW"
    },
    {
      text: "Clear and professional reports. Much easier to understand than going directly through PPSR.",
      author: "Rachel S.",
      location: "Canberra, ACT"
    },
    {
      text: "Found multiple security interests on a car I was about to buy. This service paid for itself instantly!",
      author: "Mark H.",
      location: "Hobart, TAS"
    },
    {
      text: "The customer service team helped me understand my report. Very impressed with the whole experience!",
      author: "Jennifer K.",
      location: "Darwin, NT"
    }
  ]

  // Did You Know facts for report building
  const didYouKnowFacts = [
    "Over 50,000 vehicles are reported stolen in Australia each year.",
    "A vehicle can be written off even if it's been in a minor accident.",
    "Finance owing on a vehicle can transfer to the new owner if not checked.",
    "PPSR checks can reveal if a vehicle has been used as a taxi or rental car.",
    "Vehicles can have multiple write-off records across different states.",
    "Some stolen vehicles are re-registered with fake VIN numbers.",
    "PPSR reports can show if a vehicle has outstanding finance across multiple lenders.",
    "Written-off vehicles can sometimes be legally re-registered after repairs."
  ]

  // Report building sections (20 seconds each)
  const reportSections = [
    { title: "Searching for finance owing", icon: "💰" },
    { title: "Checking write-off status", icon: "🔨" },
    { title: "Verifying stolen vehicle records", icon: "🚨" }
  ]

  // Auto-transition from confirmed to building-report after 5 seconds
  useEffect(() => {
    if (step === 'confirmed') {
      const timer = setTimeout(() => {
        setStep('building-report')
        setReportSection(0)
        setReportProgress(0)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [step])

  // Report building progress (60 seconds total, 3 sections × 20 seconds)
  useEffect(() => {
    if (step === 'building-report') {
      // Reset progress when starting a new section
      setReportProgress(0)

      const sectionDuration = 20000 // 20 seconds per section
      const interval = 100
      const progressPerIncrement = (100 / (sectionDuration / interval))

      const progressInterval = setInterval(() => {
        setReportProgress(prev => {
          const newProgress = prev + progressPerIncrement

          // Check if section is complete
          if (newProgress >= 100) {
            // Move to next section or complete
            if (reportSection < 2) { // 0, 1, 2 (3 sections)
              setReportSection(reportSection + 1)
              return 100 // Show 100% before moving to next section
            } else {
              // All sections complete, move to agreement
              clearInterval(progressInterval)
              setStep('agreement')
              return 100
            }
          }
          return newProgress
        })
      }, interval)

      return () => clearInterval(progressInterval)
    }
  }, [step, reportSection])

  // Cycle through testimonials every 3 seconds during loading and building-report
  useEffect(() => {
    if (step === 'loading' || step === 'building-report') {
      const testimonialInterval = setInterval(() => {
        setCurrentTestimonialIndex(prev => (prev + 1) % testimonials.length)
      }, 3000)
      return () => clearInterval(testimonialInterval)
    }
  }, [step])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-blue-600 p-1.5 md:p-2 rounded-lg">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <span className="text-xl md:text-2xl font-bold text-gray-900">Car Verify</span>
                <div className="text-[10px] md:text-xs text-blue-600 font-medium">AUTHORISED PPSR PROVIDER</div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Maintenance Warning Banner */}
      {maintenanceStatus.isInMaintenance && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-900">
                  Scheduled Maintenance in Progress
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  {maintenanceStatus.message}
                  {maintenanceStatus.timeRemaining && (
                    <span className="font-medium"> Service will be available in {maintenanceStatus.timeRemaining}.</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Search Form */}
          {step === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                  A Vehicle History Report
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400 mb-4 sm:mb-6">
                  Made Smarter
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/80">
                  Search a registration and get a comprehensive PPSR report
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-6 md:p-8">
                {/* State Selection */}
                <div className="mb-4 sm:mb-6">
                  <label className="block text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                    Select State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white font-semibold text-base sm:text-lg focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="NSW">New South Wales (NSW)</option>
                    <option value="VIC">Victoria (VIC)</option>
                    <option value="QLD">Queensland (QLD)</option>
                    <option value="SA">South Australia (SA)</option>
                    <option value="WA">Western Australia (WA)</option>
                    <option value="TAS">Tasmania (TAS)</option>
                    <option value="NT">Northern Territory (NT)</option>
                    <option value="ACT">Australian Capital Territory (ACT)</option>
                  </select>
                </div>

                {/* Rego Input */}
                <div className="mb-4 sm:mb-6">
                  <label className="block text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    value={rego}
                    onChange={(e) => setRego(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="e.g., ABC123"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 text-base sm:text-lg font-semibold focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-200 text-center text-sm sm:text-base">{error}</p>
                  </div>
                )}

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  disabled={!rego.trim()}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg sm:text-xl rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  SEARCH
                </button>

                {/* Trust Badges */}
                <div className="mt-6 sm:mt-8 text-center">
                  <p className="text-white/60 text-xs sm:text-sm mb-3 sm:mb-4">
                    Secure & Trusted PPSR Reports
                  </p>
                  <div className="flex justify-center items-center space-x-4 sm:space-x-6">
                    <div className="bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
                      <p className="text-white/80 text-xs font-semibold">SSL Secured</p>
                    </div>
                    <div className="bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
                      <p className="text-white/80 text-xs font-semibold">Official PPSR</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Loading Animation */}
          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4 sm:px-6 md:px-8">
                  Looking Up Your Vehicle...
                </h1>
                <p className="text-base sm:text-lg text-gray-600 px-4 sm:px-6 md:px-8">
                  Searching our database for {rego} ({state})
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6 sm:mb-8 px-4 sm:px-6 md:px-8">
                <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-sm sm:text-base text-gray-600 mt-2">{Math.round(progress)}% Complete</p>
              </div>

              {/* Loading Animation - Clean Spinner */}
              <div className="flex justify-center mb-6 sm:mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-blue-600 border-t-transparent rounded-full"
                />
              </div>

              {/* Cycling Testimonials */}
              <div className="mt-8 sm:mt-12 px-4 sm:px-6 md:px-8">
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
                          {testimonials[currentTestimonialIndex].text}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          {testimonials[currentTestimonialIndex].author}
                        </p>
                        <p className="text-xs text-gray-500">
                          {testimonials[currentTestimonialIndex].location}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Testimonial Progress Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {testimonials.map((_, index) => (
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

          {/* Step 3: Vehicle Confirmed */}
          {step === 'confirmed' && vehicle && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-3 sm:mb-4 font-bold">
                  GREAT, THIS IS A
                </h2>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </p>
              </div>

              {/* Vehicle Details Card */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 text-left">
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">Registration</p>
                    <p className="text-gray-900 font-semibold text-base sm:text-lg">{vehicle.rego}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">State</p>
                    <p className="text-gray-900 font-semibold text-base sm:text-lg">{vehicle.state}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">VIN</p>
                    <p className="text-gray-900 font-semibold text-xs sm:text-sm">{vehicle.vin}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">Year</p>
                    <p className="text-gray-900 font-semibold text-base sm:text-lg">{vehicle.year}</p>
                  </div>
                </div>
              </div>

              {/* Auto-transition message */}
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-600 border-t-transparent rounded-full"
                />
                <p className="text-gray-600 text-sm sm:text-base">Preparing your report...</p>
              </div>
            </motion.div>
          )}

          {/* Step 4: Building Report */}
          {step === 'building-report' && vehicle && (
            <motion.div
              key="building-report"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-3 sm:mb-4 font-bold">
                  Building Your PPSR Report
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </p>
              </div>

              {/* Current Section */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl md:text-5xl">{reportSections[reportSection].icon}</span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
                    {reportSections[reportSection].title}
                  </h3>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden mb-3 sm:mb-4">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    initial={{ width: '0%' }}
                    animate={{ width: `${reportProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                <p className="text-gray-600 text-xs sm:text-sm">
                  Section {reportSection + 1} of {reportSections.length}
                </p>
              </div>

              {/* All Sections Progress */}
              <div className="mb-8 sm:mb-10 md:mb-12 space-y-2 sm:space-y-3">
                {reportSections.map((section, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 sm:p-4 rounded-xl ${
                      index < reportSection
                        ? 'bg-green-50 border border-green-200'
                        : index === reportSection
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-xl sm:text-2xl">{section.icon}</span>
                      <span className={`font-semibold text-sm sm:text-base ${
                        index <= reportSection ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {section.title}
                      </span>
                    </div>
                    {index < reportSection && (
                      <span className="text-green-600 text-xl sm:text-2xl">✓</span>
                    )}
                    {index === reportSection && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-600 border-t-transparent rounded-full"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Customer Testimonials */}
              <div className="mt-8 sm:mt-12">
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
                          {testimonials[currentTestimonialIndex].text}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          {testimonials[currentTestimonialIndex].author}
                        </p>
                        <p className="text-xs text-gray-500">
                          {testimonials[currentTestimonialIndex].location}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Testimonial Progress Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {testimonials.map((_, index) => (
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

          {/* Step 5: Agreement */}
          {step === 'agreement' && vehicle && (
            <motion.div
              key="agreement"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-3 sm:mb-4 font-bold">
                  Your Report is Ready!
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
                {/* Summary */}
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <span className="text-green-600 text-2xl sm:text-3xl">✓</span>
                    <h3 className="text-lg sm:text-xl font-bold text-green-600">All Checks Complete</h3>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    We've completed finance, write-off, and stolen vehicle checks for your vehicle.
                  </p>
                </div>

                {/* Checkbox Agreement */}
                <div className="mb-4 sm:mb-6">
                  <label className="flex items-start space-x-2 sm:space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 cursor-pointer flex-shrink-0"
                    />
                    <span className="text-gray-700 text-xs sm:text-sm">
                      I agree to the <Link href="/terms" className="text-blue-600 underline">Terms & Conditions</Link> and understand this is a comprehensive PPSR report for {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.rego}, {vehicle.state}).
                    </span>
                  </label>
                </div>

                {/* Continue Button */}
                <button
                  onClick={() => setStep('email-capture')}
                  disabled={!agreeToTerms}
                  className="w-full py-3 sm:py-4 bg-blue-600 text-white font-bold text-lg sm:text-xl rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 6: Email Capture */}
          {step === 'email-capture' && vehicle && (
            <motion.div
              key="email-capture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-3 sm:mb-4 font-bold">
                  Where should we save your report
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Enter your email to receive a copy of your PPSR report
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
                {/* Email Input */}
                <div className="mb-4 sm:mb-6">
                  <label className="block text-gray-900 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && email.includes('@') && setStep('pricing')}
                    placeholder="your@email.com"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-400 text-base sm:text-lg font-semibold focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                {/* Benefits */}
                <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-2 sm:space-x-3 text-gray-700">
                    <span className="text-blue-600">✓</span>
                    <span className="text-sm sm:text-base">Instant PDF delivery</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 text-gray-700">
                    <span className="text-blue-600">✓</span>
                    <span className="text-sm sm:text-base">Comprehensive PPSR report</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 text-gray-700">
                    <span className="text-blue-600">✓</span>
                    <span className="text-sm sm:text-base">Official AFSA certificate</span>
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  onClick={() => setStep('pricing')}
                  disabled={!email.includes('@')}
                  className="w-full py-3 sm:py-4 bg-blue-600 text-white font-bold text-lg sm:text-xl rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Continue to Pricing
                </button>

                <p className="text-gray-500 text-xs text-center mt-3 sm:mt-4">
                  We'll never spam you or share your email
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 7: Pricing (BeenVerified-style) */}
          {step === 'pricing' && vehicle && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3 sm:mb-4 font-bold">
                  Get Your PPSR Report Now
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600">
                  {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.rego})
                </p>
              </div>

              {/* Trust Badge */}
              <div className="max-w-2xl mx-auto mb-4 sm:mb-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-sm font-semibold text-green-800">Official PPSR Provider</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">Instant Delivery</span>
                </div>
              </div>

              {/* Main Value Proposition */}
              <div className="max-w-2xl mx-auto mb-6 sm:mb-8 text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Protect Your Purchase with a Complete PPSR Report
                </h3>
                <p className="text-base sm:text-lg text-gray-600">
                  Don't risk buying a stolen vehicle or one with hidden debts. Get the full history in under 60 seconds.
                </p>
              </div>

              {/* Pricing Card */}
              <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
                  {/* Popular Badge */}
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-bl-xl font-bold text-xs sm:text-sm">
                    BEST VALUE
                  </div>

                  <div className="text-center mb-6 sm:mb-8">
                    <div className="mb-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-gray-500 text-lg sm:text-xl line-through">$27.50</span>
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SAVE $7.51</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-600">$19.99</span>
                      </div>
                      <p className="text-gray-600 font-medium">One-time payment • No subscription</p>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="bg-white rounded-xl p-4 sm:p-6 mb-6">
                    <h4 className="font-bold text-gray-900 mb-4 text-center text-base sm:text-lg">✓ Your Complete PPSR Report Includes:</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">Finance & Money Owing</p>
                          <p className="text-xs sm:text-sm text-gray-600">Check if the vehicle has any outstanding loans or debts</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">Stolen Vehicle Check</p>
                          <p className="text-xs sm:text-sm text-gray-600">Verify the vehicle isn't reported as stolen</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">Write-Off History</p>
                          <p className="text-xs sm:text-sm text-gray-600">See if the vehicle was previously written off</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">Official PDF Certificate</p>
                          <p className="text-xs sm:text-sm text-gray-600">Instant download + emailed copy for your records</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">Lifetime Access</p>
                          <p className="text-xs sm:text-sm text-gray-600">View your report online anytime</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      console.log('🔵 Get Report button clicked')
                      setSelectedPlan('casual')
                      setStep('payment')
                      console.log('🔵 Step set to payment')
                    }}
                    disabled={isProcessingPayment}
                    className="w-full py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg sm:text-xl rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    {isProcessingPayment ? 'Loading...' : '🔒 Get Your Report Now - $19.99'}
                  </button>

                  <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">
                    💳 Secure payment • ⚡ Instant delivery • 🔄 30-day money back guarantee
                  </p>
                </div>
              </div>

              {/* Why Choose Us Section */}
              <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
                  Why Thousands Choose Car Verify
                </h3>

                <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center">
                    <div className="text-3xl sm:text-4xl mb-3">⚡</div>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Instant Results</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Report delivered to your email in under 60 seconds</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center">
                    <div className="text-3xl sm:text-4xl mb-3">💰</div>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Best Price</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Save up to $10 compared to other providers</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center">
                    <div className="text-3xl sm:text-4xl mb-3">🔒</div>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">100% Secure</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Bank-level encryption & secure payment</p>
                  </div>
                </div>

                {/* Price Comparison */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4 sm:p-6 md:p-8">
                  <div className="text-center mb-4 sm:mb-6">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Compare & Save Money</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">See why we're Australia's best value PPSR provider</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-2 sm:py-3 px-2 text-xs sm:text-sm font-semibold text-gray-700">Provider</th>
                          <th className="text-center py-2 sm:py-3 px-2 text-xs sm:text-sm font-semibold text-gray-700">Price</th>
                          <th className="text-center py-2 sm:py-3 px-2 text-xs sm:text-sm font-semibold text-gray-700">Delivery</th>
                          <th className="text-center py-2 sm:py-3 px-2 text-xs sm:text-sm font-semibold text-gray-700">PDF</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-blue-50 border-2 border-blue-400">
                          <td className="py-3 sm:py-4 px-2 font-bold text-blue-900 text-xs sm:text-sm md:text-base">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span>Car Verify</span>
                              <span className="bg-blue-600 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">YOU</span>
                            </div>
                          </td>
                          <td className="py-3 sm:py-4 px-2 text-center font-bold text-blue-900 text-xs sm:text-sm md:text-base">$19.99</td>
                          <td className="py-3 sm:py-4 px-2 text-center font-bold text-green-600 text-xs sm:text-sm md:text-base">Instant ⚡</td>
                          <td className="py-3 sm:py-4 px-2 text-center font-bold text-green-600 text-xs sm:text-sm md:text-base">✓</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 sm:py-4 px-2 text-gray-700 text-xs sm:text-sm md:text-base">CarHistory</td>
                          <td className="py-3 sm:py-4 px-2 text-center text-gray-700 text-xs sm:text-sm md:text-base">$27.50</td>
                          <td className="py-3 sm:py-4 px-2 text-center text-gray-600 text-xs sm:text-sm md:text-base">~5 mins</td>
                          <td className="py-3 sm:py-4 px-2 text-center text-green-600 text-xs sm:text-sm md:text-base">✓</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 sm:py-4 px-2 text-gray-700 text-xs sm:text-sm md:text-base">PPSR Direct</td>
                          <td className="py-3 sm:py-4 px-2 text-center text-gray-700 text-xs sm:text-sm md:text-base">$25.70</td>
                          <td className="py-3 sm:py-4 px-2 text-center text-gray-600 text-xs sm:text-sm md:text-base">~10 mins</td>
                          <td className="py-3 sm:py-4 px-2 text-center text-green-600 text-xs sm:text-sm md:text-base">✓</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 sm:py-4 px-2 text-gray-700 text-xs sm:text-sm md:text-base">RevsCheck</td>
                          <td className="py-3 sm:py-4 px-2 text-center text-gray-700 text-xs sm:text-sm md:text-base">$29.95</td>
                          <td className="py-3 sm:py-4 px-2 text-center text-gray-600 text-xs sm:text-sm md:text-base">~5 mins</td>
                          <td className="py-3 sm:py-4 px-2 text-center text-green-600 text-xs sm:text-sm md:text-base">✓</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 sm:mt-6 bg-white rounded-lg p-3 sm:p-4 border border-green-300">
                    <div className="text-center">
                      <p className="font-bold text-green-700 text-sm sm:text-base">
                        💸 You Save: Up to $9.96 with Car Verify
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        Same official PPSR data, faster delivery, better price
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What You'll Discover */}
              <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                    🔍 What You'll Discover in Your Report
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-600 text-xl">💰</span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Money Owing</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Outstanding loans or finance that could become your problem</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-600 text-xl">🚨</span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Stolen Status</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Check if the vehicle is registered as stolen in Australia</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-600 text-xl">💥</span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Write-Off Status</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Previous accident damage that insurance deemed uneconomical</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-600 text-xl">📋</span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Security Interests</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Legal claims or encumbrances registered against the vehicle</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Warning */}
              <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-red-600 text-2xl flex-shrink-0">⚠️</span>
                    <div>
                      <h4 className="font-bold text-red-900 mb-2 text-sm sm:text-base">Don't Risk It!</h4>
                      <p className="text-xs sm:text-sm text-red-800 mb-2">
                        Every year, thousands of Australians unknowingly buy vehicles with hidden problems:
                      </p>
                      <ul className="text-xs sm:text-sm text-red-800 space-y-1 list-disc list-inside">
                        <li>Cars with outstanding finance that can be repossessed</li>
                        <li>Stolen vehicles that police will seize</li>
                        <li>Written-off vehicles that are unsafe to drive</li>
                      </ul>
                      <p className="text-xs sm:text-sm font-bold text-red-900 mt-3">
                        A $19.99 report could save you thousands in losses!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ / Common Questions */}
              <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                  Common Questions
                </h3>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">✅ How quickly will I receive my report?</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Instantly! Your PPSR report will be emailed to you within 60 seconds of payment. You'll also be able to view and download it online immediately.
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">✅ Is this the official PPSR data?</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Yes! We're an authorized PPSR provider. You receive the exact same official data from the government's Personal Property Securities Register.
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">✅ Is this a subscription?</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      No! This is a one-time payment of $19.99 for a single report. You will not be charged again unless you purchase another report in the future.
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">✅ Is my payment secure?</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Absolutely. We use Stripe, the same payment processor trusted by millions of businesses worldwide. Your credit card information is never stored on our servers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Satisfaction Guaranteed */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">SATISFACTION GUARANTEED</h3>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  If you're dissatisfied with the results of your search, <strong>we will gladly help you out or offer a refund.</strong>
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Refunds are processed within 5-7 business days. To request a refund, contact us at <a href="mailto:support@carverify.com.au" className="text-blue-600 underline">support@carverify.com.au</a> within 30 days of your purchase.
                </p>
              </div>

              {/* Legal Compliance */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <p className="text-gray-600 text-xs leading-relaxed text-center">
                  By proceeding with payment, you agree to our <Link href="/terms" className="text-blue-600 underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 underline">Privacy Policy</Link>. All payments are securely processed through Stripe. Your subscription will automatically renew unless cancelled before the renewal date.
                </p>
              </div>

              {/* Payment Section */}
              <div className="bg-white border-2 border-gray-300 rounded-xl p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">FINAL STEP - COMPLETE YOUR PURCHASE</h3>

                <div className="mb-4 sm:mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-semibold text-sm sm:text-base">Selected Plan:</span>
                      <span className="text-blue-600 font-bold text-sm sm:text-base">Casual</span>
                    </div>
                  </div>

                  <div className="text-center text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                    <p>🔒 Secure checkout powered by Stripe</p>
                    <p className="mt-1">Your payment information is encrypted and secure</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    console.log('💳 Proceed to Payment button clicked')
                    setStep('payment')
                  }}
                  disabled={isProcessingPayment}
                  className="w-full py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg sm:text-xl rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] mb-3 sm:mb-4 disabled:opacity-50"
                >
                  {isProcessingPayment ? 'Loading...' : 'Proceed to Payment'}
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-500 text-xs">
                  <div className="flex items-center space-x-1">
                    <span>🔒</span>
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>💳</span>
                    <span>Stripe Verified</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>✓</span>
                    <span>Money Back Guarantee</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 8: Payment Form */}
          {step === 'payment' && vehicle && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-3 sm:mb-4 font-bold">
                  Complete Your Payment
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  You're one step away from your PPSR report
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
                {/* Order Summary */}
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">Order Summary</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan:</span>
                      <span className="font-semibold text-gray-900">
                        {selectedPlan === 'casual' ? 'Casual' : 'Plus'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="font-semibold text-gray-900">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration:</span>
                      <span className="font-semibold text-gray-900">{vehicle.rego}</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 mt-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-bold text-xs sm:text-sm">Report Price:</span>
                      <span className="text-xl sm:text-2xl font-bold text-blue-600">
                        $19.99
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 pt-1">
                      One-time payment • Instant delivery
                    </p>
                  </div>
                </div>

                {/* Payment Form */}
                {paymentError && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-xs sm:text-sm">{paymentError}</p>
                  </div>
                )}

                {clientSecret && subscriptionId ? (
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
                      paymentIntentId={paymentIntentId}
                      customerEmail={email}
                    />
                  </Elements>
                ) : (
                  <div className="space-y-4 py-6">
                    {/* Skeleton loading for payment form */}
                    <div className="animate-pulse space-y-4">
                      <div className="h-12 bg-gray-200 rounded-lg"></div>
                      <div className="h-12 bg-gray-200 rounded-lg"></div>
                      <div className="h-12 bg-gray-200 rounded-lg"></div>
                    </div>
                    <div className="text-center py-4">
                      <div className="inline-flex items-center space-x-2 text-blue-600">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"
                        />
                        <span className="text-sm font-medium">
                          {isProcessingPayment ? 'Initializing secure payment...' : 'Loading payment form...'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Back Button */}
                <button
                  onClick={() => setStep('pricing')}
                  className="mt-3 sm:mt-4 w-full py-2 text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm"
                >
                  ← Back to Pricing
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
