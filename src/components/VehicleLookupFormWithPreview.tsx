'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle, Shield, Search, Loader2 } from 'lucide-react'
import { analytics } from '@/lib/analytics'
import { supabase, isSupabaseConfigured } from '@/lib/supabase-client'

interface VehicleData {
  make: string;
  model: string;
  year?: number;
  vin?: string;
  body?: string;
  engine?: string;
  fuel?: string;
  colour?: string;
  rego: string;
  state: string;
  dataSource: string;
}

interface Subscription {
  id: string
  status: string
  checks_used: number
  checks_limit: number
}

export default function VehicleLookupFormWithPreview() {
  const router = useRouter()
  const [lookupType, setLookupType] = useState<'vin' | 'rego'>('rego')
  const [vin, setVin] = useState('')
  const [rego, setRego] = useState('')
  const [state, setState] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [validationError, setValidationError] = useState('')
  const [isValidating, setIsValidating] = useState(false)

  // Bumper-style flow states
  const [viewState, setViewState] = useState<'form' | 'loading' | 'confirmed' | 'building-report' | 'agreement' | 'email-capture' | 'pricing'>('form')
  const [progress, setProgress] = useState(0)
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null)
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [reportSection, setReportSection] = useState(0)
  const [reportProgress, setReportProgress] = useState(0)
  const [email, setEmail] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  // Cycling facts for "Did you know"
  const didYouKnowFacts = [
    "Car Verify checks official PPSR records to protect you from buying stolen or written-off vehicles.",
    "Over 200,000 vehicles in Australia have outstanding finance or are reported stolen.",
    "A PPSR check can reveal if a vehicle has been written off, even if it's been repaired and looks fine.",
    "Over 50,000 vehicles are reported stolen in Australia each year.",
    "Finance owing on a vehicle can transfer to the new owner if not checked.",
    "PPSR checks can reveal if a vehicle has been used as a taxi or rental car.",
    "Some stolen vehicles are re-registered with fake VIN numbers.",
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
    if (viewState === 'confirmed') {
      const timer = setTimeout(() => {
        setViewState('building-report')
        setReportSection(0)
        setReportProgress(0)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [viewState])

  // Report building progress (60 seconds total, 3 sections × 20 seconds)
  useEffect(() => {
    if (viewState === 'building-report') {
      const sectionDuration = 20000 // 20 seconds per section
      const interval = 100
      const progressPerIncrement = (100 / (sectionDuration / interval))

      const progressInterval = setInterval(() => {
        setReportProgress(prev => {
          const newProgress = prev + progressPerIncrement

          // Check if section is complete
          if (newProgress >= 100) {
            // Move to next section
            if (reportSection < reportSections.length - 1) {
              setReportSection(s => s + 1)
              return 0
            } else {
              // All sections complete, move to agreement
              clearInterval(progressInterval)
              setViewState('agreement')
              return 100
            }
          }
          return newProgress
        })
      }, interval)

      return () => clearInterval(progressInterval)
    }
  }, [viewState, reportSection])

  // Cycle through "Did You Know" facts every 5 seconds during report building
  useEffect(() => {
    if (viewState === 'building-report') {
      const factInterval = setInterval(() => {
        setCurrentFactIndex(prev => (prev + 1) % didYouKnowFacts.length)
      }, 5000)
      return () => clearInterval(factInterval)
    }
  }, [viewState])

  // Check if user is logged in with subscription
  useEffect(() => {
    checkSubscription()
  }, [])

  const checkSubscription = async () => {
    try {
      // Skip if Supabase is not configured
      if (!isSupabaseConfigured()) {
        setIsCheckingAuth(false)
        return
      }

      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setIsCheckingAuth(false)
        return
      }

      // Check for active subscription
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('id, status, checks_used, checks_limit')
        .eq('customer_id', user.id)
        .single()

      if (sub && sub.status === 'active') {
        setSubscription(sub)
      }
    } catch (error) {
      console.error('Error checking subscription:', error)
    } finally {
      setIsCheckingAuth(false)
    }
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError('')

    if (lookupType === 'rego' && (!rego || !state)) {
      setValidationError('Please enter both registration number and state')
      return
    }

    if (lookupType === 'vin' && !vin) {
      setValidationError('Please enter VIN number')
      return
    }

    // Track form submission
    const vehicleId = lookupType === 'rego' ? `${rego}-${state}` : vin
    analytics.formSubmitted(lookupType, vehicleId)

    // Redirect to dedicated loading page
    if (lookupType === 'rego') {
      router.push(`/vehicle-lookup-loading?rego=${encodeURIComponent(rego)}&state=${encodeURIComponent(state)}`)
    } else {
      router.push(`/vehicle-lookup-loading?vin=${encodeURIComponent(vin)}`)
    }
  }


  const checksRemaining = subscription ? subscription.checks_limit - subscription.checks_used : 0

  // Bumper-style Loading View
  if (viewState === 'loading') {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              We're searching our database for
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">
              {lookupType === 'rego' ? `${rego} (${state})` : vin}
            </p>
          </div>

          {/* Progress */}
          <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            {Math.round(progress)}%
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-12">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Car Driving Animation */}
          <div className="mb-12 relative overflow-hidden rounded-2xl" style={{ height: '300px' }}>
            {/* Animated gradient background (sky) */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200"></div>

            {/* Animated clouds */}
            <div className="absolute top-4 w-full h-20 overflow-hidden">
              <div className="animate-cloud-slow absolute" style={{ left: '10%', top: '10px' }}>
                <div className="bg-white/40 rounded-full w-16 h-8 backdrop-blur-sm"></div>
              </div>
              <div className="animate-cloud-medium absolute" style={{ left: '60%', top: '5px' }}>
                <div className="bg-white/30 rounded-full w-20 h-10 backdrop-blur-sm"></div>
              </div>
              <div className="animate-cloud-fast absolute" style={{ left: '85%', top: '15px' }}>
                <div className="bg-white/35 rounded-full w-12 h-6 backdrop-blur-sm"></div>
              </div>
            </div>

            {/* Road with perspective */}
            <div className="absolute bottom-0 w-full h-48 bg-gradient-to-b from-gray-600 to-gray-700">
              {/* Road edge lines */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                {/* Left edge */}
                <div className="absolute left-0 top-0 h-full w-1 bg-white/30" style={{ transform: 'perspective(100px) rotateX(60deg)' }}></div>
                {/* Right edge */}
                <div className="absolute right-0 top-0 h-full w-1 bg-white/30" style={{ transform: 'perspective(100px) rotateX(60deg)' }}></div>
              </div>

              {/* Animated center lane markings */}
              <div className="absolute left-1/2 top-0 w-full h-full -translate-x-1/2">
                <div className="animate-road-lines">
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="absolute bg-yellow-400 rounded-full"
                      style={{
                        left: '50%',
                        transform: 'translateX(-50%)',
                        top: `${i * 15}%`,
                        width: '4px',
                        height: '30px',
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Side scenery - trees passing by */}
              <div className="absolute left-0 top-0 h-24 w-full overflow-hidden">
                <div className="animate-scenery-left flex space-x-8">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex-shrink-0">
                      {/* Simple tree */}
                      <div className="w-8 h-12 bg-green-600 rounded-t-full relative" style={{ marginLeft: '20px' }}>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-6 bg-amber-800"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* The Car - centered and slightly bouncing */}
            <div className="absolute left-1/2 bottom-20 -translate-x-1/2 animate-car-drive">
              <svg viewBox="0 0 200 100" className="w-48 drop-shadow-2xl">
                <defs>
                  {/* Car body gradient - sleek sports car */}
                  <linearGradient id="carGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#DC2626" />
                  </linearGradient>
                  <linearGradient id="windowShine" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.8" />
                  </linearGradient>
                  <radialGradient id="wheelGrad">
                    <stop offset="0%" stopColor="#1F2937" />
                    <stop offset="70%" stopColor="#111827" />
                    <stop offset="100%" stopColor="#000000" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Car shadow */}
                <ellipse cx="100" cy="92" rx="70" ry="8" fill="#000000" opacity="0.3" />

                {/* Main body - sleek sports car shape */}
                <path
                  d="M 30 70 L 40 60 L 60 50 L 80 48 L 120 48 L 140 50 L 160 60 L 170 70 L 170 80 L 30 80 Z"
                  fill="url(#carGradient)"
                  stroke="#991B1B"
                  strokeWidth="1.5"
                />

                {/* Roof/Cabin - low and aerodynamic */}
                <path
                  d="M 65 50 L 75 38 L 105 36 L 125 38 L 135 50 Z"
                  fill="url(#carGradient)"
                  stroke="#991B1B"
                  strokeWidth="1.5"
                />

                {/* Windows with shine effect */}
                <path
                  d="M 76 39 L 80 42 L 100 41 Z"
                  fill="url(#windowShine)"
                  opacity="0.9"
                />
                <path
                  d="M 106 41 L 110 42 L 124 39 Z"
                  fill="url(#windowShine)"
                  opacity="0.9"
                />

                {/* Headlights with glow */}
                <ellipse cx="28" cy="65" rx="4" ry="3" fill="#FEF3C7" filter="url(#glow)" />
                <ellipse cx="28" cy="65" rx="2" ry="1.5" fill="#FFFFFF" />

                {/* Taillights */}
                <ellipse cx="172" cy="65" rx="4" ry="3" fill="#FCA5A5" opacity="0.9" />
                <ellipse cx="172" cy="65" rx="2" ry="1.5" fill="#EF4444" />

                {/* Side mirror */}
                <rect x="62" y="45" width="4" height="3" rx="1" fill="url(#carGradient)" />

                {/* Wheels with spinning animation */}
                <g className="animate-wheel-spin" style={{ transformOrigin: '60px 80px' }}>
                  <circle cx="60" cy="80" r="12" fill="url(#wheelGrad)" />
                  <circle cx="60" cy="80" r="9" fill="#374151" />
                  <circle cx="60" cy="80" r="5" fill="#1F2937" />
                  {/* Spokes */}
                  <line x1="60" y1="72" x2="60" y2="88" stroke="#6B7280" strokeWidth="1.5" />
                  <line x1="52" y1="80" x2="68" y2="80" stroke="#6B7280" strokeWidth="1.5" />
                  <line x1="55" y1="75" x2="65" y2="85" stroke="#6B7280" strokeWidth="1.5" />
                  <line x1="55" y1="85" x2="65" y2="75" stroke="#6B7280" strokeWidth="1.5" />
                </g>

                <g className="animate-wheel-spin" style={{ transformOrigin: '140px 80px' }}>
                  <circle cx="140" cy="80" r="12" fill="url(#wheelGrad)" />
                  <circle cx="140" cy="80" r="9" fill="#374151" />
                  <circle cx="140" cy="80" r="5" fill="#1F2937" />
                  {/* Spokes */}
                  <line x1="140" y1="72" x2="140" y2="88" stroke="#6B7280" strokeWidth="1.5" />
                  <line x1="132" y1="80" x2="148" y2="80" stroke="#6B7280" strokeWidth="1.5" />
                  <line x1="135" y1="75" x2="145" y2="85" stroke="#6B7280" strokeWidth="1.5" />
                  <line x1="135" y1="85" x2="145" y2="75" stroke="#6B7280" strokeWidth="1.5" />
                </g>

                {/* Speed lines for motion effect */}
                <g opacity="0.4">
                  <line x1="10" y1="55" x2="25" y2="55" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="5" y1="65" x2="22" y2="65" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="8" y1="75" x2="20" y2="75" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          </div>

          <style jsx>{`
            @keyframes cloud-drift {
              from { transform: translateX(100vw); }
              to { transform: translateX(-20vw); }
            }
            @keyframes road-lines {
              from { transform: translateY(-30px); }
              to { transform: translateY(100%); }
            }
            @keyframes scenery-pass {
              from { transform: translateX(100%); }
              to { transform: translateX(-100%); }
            }
            @keyframes car-bounce {
              0%, 100% { transform: translate(-50%, 0); }
              50% { transform: translate(-50%, -2px); }
            }
            @keyframes wheel-rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .animate-cloud-slow {
              animation: cloud-drift 30s linear infinite;
            }
            .animate-cloud-medium {
              animation: cloud-drift 20s linear infinite;
              animation-delay: -5s;
            }
            .animate-cloud-fast {
              animation: cloud-drift 15s linear infinite;
              animation-delay: -10s;
            }
            .animate-road-lines {
              animation: road-lines 2s linear infinite;
            }
            .animate-scenery-left {
              animation: scenery-pass 4s linear infinite;
            }
            .animate-car-drive {
              animation: car-bounce 0.4s ease-in-out infinite;
            }
            .animate-wheel-spin {
              animation: wheel-rotate 0.6s linear infinite;
            }
          `}</style>

          {/* Loading Text */}
          <div className="space-y-4 mb-8">
            <p className="text-lg md:text-xl text-gray-900 font-semibold">
              Looking up millions of records
            </p>
            <p className="text-gray-600">
              Please wait while we identify your vehicle
            </p>
          </div>

          {/* Did You Know - with cycling facts */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 relative overflow-hidden">
            <p className="text-blue-600 font-bold mb-2">DID YOU KNOW:</p>
            <div className="relative" style={{ minHeight: '60px' }}>
              {didYouKnowFacts.map((fact, index) => (
                <p
                  key={index}
                  className={`text-gray-700 transition-all duration-500 absolute inset-0 ${
                    index === currentFactIndex
                      ? 'opacity-100 translate-y-0'
                      : index < currentFactIndex
                      ? 'opacity-0 -translate-y-4'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  {fact}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Bumper-style Vehicle Confirmed View
  if (viewState === 'confirmed' && vehicleData) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl text-gray-900 mb-4 font-bold">
              GREAT, THIS IS A
            </h2>
            <p className="text-3xl md:text-5xl font-bold text-blue-600">
              {vehicleData.year} {vehicleData.make} {vehicleData.model}
            </p>
          </div>

          {/* Vehicle Details Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 mb-8">
            <div className="grid grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-gray-500 text-sm mb-1">Registration</p>
                <p className="text-gray-900 font-semibold text-lg">{vehicleData.rego}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">State</p>
                <p className="text-gray-900 font-semibold text-lg">{vehicleData.state}</p>
              </div>
              {vehicleData.vin && (
                <>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">VIN</p>
                    <p className="text-gray-900 font-semibold text-sm font-mono">{vehicleData.vin}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Year</p>
                    <p className="text-gray-900 font-semibold text-lg">{vehicleData.year}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Auto-transition message */}
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            <p className="text-gray-600">Preparing your report...</p>
          </div>
        </div>
      </div>
    )
  }

  // Building Report View
  if (viewState === 'building-report' && vehicleData) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Building Your PPSR Report
            </h2>
            <p className="text-lg md:text-xl text-gray-700">
              {vehicleData.year} {vehicleData.make} {vehicleData.model}
            </p>
          </div>

          {/* Current Section */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <span className="text-4xl md:text-5xl">{reportSections[reportSection].icon}</span>
              <h3 className="text-xl md:text-2xl font-bold text-blue-600">
                {reportSections[reportSection].title}
              </h3>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-4">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-100"
                style={{ width: `${reportProgress}%` }}
              />
            </div>

            <p className="text-gray-600 text-sm">
              Section {reportSection + 1} of {reportSections.length}
            </p>
          </div>

          {/* All Sections Progress */}
          <div className="mb-12 space-y-3">
            {reportSections.map((section, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl ${
                  index < reportSection
                    ? 'bg-green-50 border border-green-200'
                    : index === reportSection
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{section.icon}</span>
                  <span className={`font-semibold ${
                    index <= reportSection ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {section.title}
                  </span>
                </div>
                {index < reportSection && (
                  <span className="text-green-600 text-2xl">✓</span>
                )}
                {index === reportSection && (
                  <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                )}
              </div>
            ))}
          </div>

          {/* Did You Know */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 relative overflow-hidden">
            <p className="text-blue-600 font-bold mb-2">DID YOU KNOW:</p>
            <div className="relative" style={{ minHeight: '60px' }}>
              {didYouKnowFacts.map((fact, index) => (
                <p
                  key={index}
                  className={`text-gray-700 transition-all duration-500 absolute inset-0 ${
                    index === currentFactIndex
                      ? 'opacity-100 translate-y-0'
                      : index < currentFactIndex
                      ? 'opacity-0 -translate-y-4'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  {fact}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Agreement View
  if (viewState === 'agreement' && vehicleData) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Your Report is Ready!
          </h2>
          <p className="text-lg md:text-xl text-gray-700">
            {vehicleData.year} {vehicleData.make} {vehicleData.model}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-green-600 text-3xl">✓</span>
            <h3 className="text-xl font-bold text-green-900">All Checks Complete</h3>
          </div>
          <p className="text-green-800 text-sm">
            We've completed finance, write-off, and stolen vehicle checks for your vehicle.
          </p>
        </div>

        {/* Checkbox Agreement */}
        <div className="mb-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-2 border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
            />
            <span className="text-gray-700 text-sm">
              I agree to the Terms & Conditions and understand this is a comprehensive PPSR report for {vehicleData.year} {vehicleData.make} {vehicleData.model} ({vehicleData.rego}, {vehicleData.state}).
            </span>
          </label>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => setViewState('email-capture')}
          disabled={!agreeToTerms}
          className="w-full py-4 md:py-5 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg md:text-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Continue
        </button>
      </div>
    )
  }

  // Email Capture View
  if (viewState === 'email-capture' && vehicleData) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Where Should We Send Your Report?
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            Enter your email to receive a copy of your PPSR report
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && email.includes('@') && setViewState('pricing')}
            placeholder="your@email.com"
            className="w-full px-6 py-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 text-lg font-semibold transition-all duration-200"
          />
        </div>

        {/* Benefits */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center space-x-3 text-gray-700">
            <span className="text-blue-600">✓</span>
            <span>Instant PDF delivery</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <span className="text-blue-600">✓</span>
            <span>Comprehensive PPSR report</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <span className="text-blue-600">✓</span>
            <span>Official AFSA certificate</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => setViewState('pricing')}
          disabled={!email.includes('@')}
          className="w-full py-4 md:py-5 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg md:text-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Continue to Pricing
        </button>

        <p className="text-gray-500 text-xs text-center mt-4">
          We'll never spam you or share your email
        </p>
      </div>
    )
  }

  // Pricing View (BeenVerified-style)
  if (viewState === 'pricing' && vehicleData) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Get Your PPSR Report Now
          </h2>
          <p className="text-lg md:text-xl text-gray-700">
            {vehicleData.year} {vehicleData.make} {vehicleData.model} ({vehicleData.rego})
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-2xl mx-auto mb-8">
          {/* Casual Plan */}
          <div className="bg-white border-2 border-blue-400 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-1 bg-blue-100 border border-blue-200 rounded-full mb-4">
                <span className="text-blue-600 font-semibold text-sm">CASUAL PLAN</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Unlimited Reports</h3>
              <div className="mb-4">
                <span className="text-4xl md:text-5xl font-bold text-blue-600">$29.99</span>
                <span className="text-gray-600 text-lg">/month</span>
              </div>
              <p className="text-gray-500 text-xs">Cancel anytime</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-gray-700">
                <span className="text-green-600">✓</span>
                <span className="text-sm">PDF Download</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <span className="text-green-600">✓</span>
                <span className="text-sm">Full Online Access</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <span className="text-green-600">✓</span>
                <span className="text-sm">Unlimited Reports</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <span className="text-green-600">✓</span>
                <span className="text-sm">Market Valuations (coming soon)</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <span className="text-green-600">✓</span>
                <span className="text-sm">Better Deals to Insurance</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <span className="text-green-600">✓</span>
                <span className="text-sm">Better Deals for Finance</span>
              </div>
            </div>

            <button
              onClick={() => {
                // Store all data and proceed to checkout
                const params = new URLSearchParams()
                if (lookupType === 'rego') {
                  params.set('rego', rego)
                  params.set('state', state)
                } else {
                  params.set('vin', vin)
                }
                if (vehicleData.vin) params.set('vehicle_vin', vehicleData.vin)
                params.set('vehicle_make', vehicleData.make)
                params.set('vehicle_model', vehicleData.model)
                if (vehicleData.year) params.set('vehicle_year', vehicleData.year.toString())
                if (email) params.set('email', email)
                params.set('plan', 'casual')
                window.location.href = `/checkout?${params.toString()}`
              }}
              className="w-full py-4 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Subscribe Now - $29.99/month
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-4">
            Secure checkout • SSL encrypted • Cancel anytime
          </p>
          <div className="flex justify-center items-center space-x-6 flex-wrap gap-2">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <p className="text-gray-700 text-xs font-semibold">Money Back Guarantee</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <p className="text-gray-700 text-xs font-semibold">Official PPSR</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <p className="text-gray-700 text-xs font-semibold">Instant Access</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default Form View
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Shield className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Secure Vehicle Check</span>
        </div>
        {subscription && checksRemaining > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 inline-block">
            <p className="text-green-800 font-semibold text-sm">
              ✅ Subscribed • {checksRemaining} check{checksRemaining !== 1 ? 's' : ''} remaining
            </p>
          </div>
        )}
        {subscription && checksRemaining === 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4 inline-block">
            <p className="text-orange-800 font-semibold text-sm">
              ⚠️ No checks remaining this month • Renews on next billing date
            </p>
          </div>
        )}
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Enter Vehicle Details
        </h2>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          {subscription && checksRemaining > 0
            ? 'Submit your report - no payment required!'
            : 'Get your comprehensive vehicle report in seconds'}
        </p>
      </div>

      <form onSubmit={handleCheckout} className="space-y-6">
        {/* Lookup Type Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setLookupType('rego')}
            className={`flex-1 py-4 md:py-3 px-4 rounded-md font-medium transition-all duration-200 text-base md:text-sm ${
              lookupType === 'rego'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Registration
          </button>
          <button
            type="button"
            onClick={() => setLookupType('vin')}
            className={`flex-1 py-4 md:py-3 px-4 rounded-md font-medium transition-all duration-200 text-base md:text-sm ${
              lookupType === 'vin'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            VIN Number
          </button>
        </div>

        {/* VIN Input */}
        {lookupType === 'vin' && (
          <div>
            <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Identification Number (VIN)
              <span className="text-gray-500 font-normal ml-2">
                ({vin.length}/17 characters)
              </span>
            </label>
            <input
              type="text"
              id="vin"
              value={vin}
              onChange={(e) => {
                const value = e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '')
                if (value.length <= 17) {
                  setVin(value)
                  setValidationError('')
                }
              }}
              placeholder="Enter 17-character VIN"
              inputMode="text"
              maxLength={17}
              className={`w-full px-4 py-4 md:py-3 border-2 md:border rounded-lg focus:ring-2 text-center font-mono text-lg md:text-base tracking-wider uppercase text-gray-900 placeholder-gray-500 transition-all duration-200 ${
                vin.length > 0 && vin.length !== 17
                  ? 'border-orange-300 focus:ring-orange-500 focus:border-orange-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            <p className="mt-2 text-xs text-gray-500 text-center">
              Found on dashboard or driver's door • Must be exactly 17 characters
            </p>
            {vin.length > 0 && vin.length !== 17 && (
              <p className="mt-1 text-xs text-orange-600 text-center">
                ⚠️ VIN must be exactly 17 characters ({17 - vin.length} more needed)
              </p>
            )}
          </div>
        )}

        {/* Registration Input */}
        {lookupType === 'rego' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rego" className="block text-sm font-medium text-gray-700 mb-2">
                Registration Number
              </label>
              <input
                type="text"
                id="rego"
                value={rego}
                onChange={(e) => setRego(e.target.value.toUpperCase())}
                placeholder="e.g., ABC123"
                inputMode="text"
                className="w-full px-4 py-4 md:py-3 border-2 md:border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-bold text-lg md:text-base tracking-wider uppercase text-gray-900 placeholder-gray-500 transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State/Territory
              </label>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-4 md:py-3 border-2 md:border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-lg md:text-base transition-all duration-200"
              >
                <option value="">Select State</option>
                <option value="NSW">NSW</option>
                <option value="VIC">VIC</option>
                <option value="QLD">QLD</option>
                <option value="WA">WA</option>
                <option value="SA">SA</option>
                <option value="TAS">TAS</option>
                <option value="NT">NT</option>
                <option value="ACT">ACT</option>
              </select>
            </div>
          </div>
        )}

        {/* Validation Error */}
        {validationError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm font-medium text-center">
              ⚠️ {validationError}
            </p>
          </div>
        )}

        {/* Search Button */}
        <button
          type="submit"
          disabled={
            isScanning ||
            isValidating ||
            (lookupType === 'rego' && (!rego || !state)) ||
            (lookupType === 'vin' && (!vin || vin.length !== 17)) ||
            (subscription && checksRemaining === 0)
          }
          className={`w-full py-5 md:py-4 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold text-xl md:text-lg flex items-center justify-center space-x-2 shadow-lg ${
            subscription && checksRemaining > 0
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isValidating ? (
            <>
              <Loader2 className="h-6 w-6 md:h-5 md:w-5 animate-spin" />
              <span className="md:hidden">Validating...</span>
              <span className="hidden md:inline">Validating Vehicle Details...</span>
            </>
          ) : isScanning ? (
            <>
              <Loader2 className="h-6 w-6 md:h-5 md:w-5 animate-spin" />
              <span className="md:hidden">{subscription && checksRemaining > 0 ? 'Submitting...' : 'Searching...'}</span>
              <span className="hidden md:inline">{subscription && checksRemaining > 0 ? 'Submitting Report...' : 'Searching Official Database...'}</span>
            </>
          ) : (
            <>
              {subscription && checksRemaining > 0 ? (
                <>
                  <CheckCircle className="h-6 w-6 md:h-5 md:w-5" />
                  <span className="md:hidden">Submit Report (Free)</span>
                  <span className="hidden md:inline">Submit Report - No Payment Required</span>
                </>
              ) : (
                <>
                  <Search className="h-6 w-6 md:h-5 md:w-5" />
                  <span className="md:hidden">Get PPSR Check</span>
                  <span className="hidden md:inline">Get Official PPSR Check</span>
                </>
              )}
            </>
          )}
        </button>
      </form>


    </div>
  )
}