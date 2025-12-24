'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Shield } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const DID_YOU_KNOW_FACTS = [
  "Car Verify checks official PPSR records to protect you from buying stolen or written-off vehicles.",
  "Over 200,000 vehicles in Australia have outstanding finance or are reported stolen.",
  "A PPSR check can reveal if a vehicle has been written off, even if it's been repaired and looks fine.",
  "Over 50,000 vehicles are reported stolen in Australia each year.",
  "Finance owing on a vehicle can transfer to the new owner if not checked.",
  "PPSR checks can reveal if a vehicle has been used as a taxi or rental car.",
  "Some stolen vehicles are re-registered with fake VIN numbers.",
  "Written-off vehicles can sometimes be legally re-registered after repairs."
]

function VehicleLookupLoadingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const rego = searchParams.get('rego')
  const state = searchParams.get('state')
  const vin = searchParams.get('vin')

  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Cycle through facts every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % DID_YOU_KNOW_FACTS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if ((!rego || !state) && !vin) {
      setError('Missing vehicle information')
      return
    }

    lookupVehicle()
  }, [rego, state, vin])

  const lookupVehicle = async () => {
    const startTime = Date.now()
    const MIN_DISPLAY_TIME = 20000 // 20 SECONDS minimum display time
    const TRANSITION_DELAY = 1000 // 1 second after hitting 100%
    let apiData: any = null
    let shouldRedirect = false

    // Animate progress from 0 to 100 over 20 seconds SMOOTHLY
    const duration = MIN_DISPLAY_TIME
    const interval = 100
    const increments = duration / interval
    const progressPerIncrement = 100 / increments

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + progressPerIncrement
        if (newProgress >= 100) {
          // Hit 100%, trigger redirect soon
          shouldRedirect = true
          return 100
        }
        return newProgress
      })
    }, interval)

    try {
      // Call API but DON'T interrupt progress bar
      const response = await fetch('/api/lookup-vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rego, state, vin }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Vehicle lookup failed')
      }

      apiData = await response.json()

    } catch (err) {
      console.error('Vehicle lookup error:', err)
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : 'Something went wrong')
      return
    }

    // Wait until progress hits 100%
    while (!shouldRedirect) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    // Progress hit 100%, wait 1 more second for visual effect
    await new Promise(resolve => setTimeout(resolve, TRANSITION_DELAY))

    clearInterval(progressInterval)

    // Now redirect with the data
    if (apiData && apiData.vehicle) {
      const params = new URLSearchParams({
        rego: rego || '',
        state: state || '',
        vehicle_vin: apiData.vehicle.vin || '',
        vehicle_make: apiData.vehicle.make || '',
        vehicle_model: apiData.vehicle.model || '',
        vehicle_year: apiData.vehicle.year || '',
      })

      router.push(`/vehicle-search?${params.toString()}`)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-start px-4 pt-2 pb-4 max-h-screen overflow-hidden">
        {/* Error State */}
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto w-full text-center"
          >
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 sm:p-8">
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
          /* Loading State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto w-full"
          >
            <div className="text-center mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                We're searching our database for
              </h2>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                {rego ? `${rego} (${state})` : vin}
              </p>
            </div>

            {/* Progress */}
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              {Math.round(progress)}%
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 sm:mb-6">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Car Driving Animation */}
            <div className="mb-6 sm:mb-8 relative overflow-hidden rounded-2xl" style={{ height: '200px' }}>
              {/* Animated gradient background (sky) */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200"></div>

              {/* Animated clouds */}
              <div className="absolute top-2 w-full h-16 overflow-hidden">
                <div className="animate-cloud-slow absolute" style={{ left: '10%', top: '5px' }}>
                  <div className="bg-white/40 rounded-full w-12 h-6 backdrop-blur-sm"></div>
                </div>
                <div className="animate-cloud-medium absolute" style={{ left: '60%', top: '3px' }}>
                  <div className="bg-white/30 rounded-full w-16 h-8 backdrop-blur-sm"></div>
                </div>
                <div className="animate-cloud-fast absolute" style={{ left: '85%', top: '8px' }}>
                  <div className="bg-white/35 rounded-full w-10 h-5 backdrop-blur-sm"></div>
                </div>
              </div>

              {/* Road with perspective - NO YELLOW LINES */}
              <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-gray-600 to-gray-700">
                {/* Side scenery - trees passing by */}
                <div className="absolute left-0 top-0 h-16 w-full overflow-hidden">
                  <div className="animate-scenery-left flex space-x-8">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex-shrink-0">
                        <div className="w-6 h-10 bg-green-600 rounded-t-full relative" style={{ marginLeft: '15px' }}>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-5 bg-amber-800"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* The Car - centered and slightly bouncing */}
              <div className="absolute left-1/2 bottom-16 -translate-x-1/2 animate-car-drive">
                <svg viewBox="0 0 200 100" className="w-40 sm:w-48 drop-shadow-2xl">
                  <defs>
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

                  {/* Main body */}
                  <path
                    d="M 30 70 L 40 60 L 60 50 L 80 48 L 120 48 L 140 50 L 160 60 L 170 70 L 170 80 L 30 80 Z"
                    fill="url(#carGradient)"
                    stroke="#991B1B"
                    strokeWidth="1.5"
                  />

                  {/* Roof/Cabin */}
                  <path
                    d="M 65 50 L 75 38 L 105 36 L 125 38 L 135 50 Z"
                    fill="url(#carGradient)"
                    stroke="#991B1B"
                    strokeWidth="1.5"
                  />

                  {/* Windows */}
                  <path d="M 76 39 L 80 42 L 100 41 Z" fill="url(#windowShine)" opacity="0.9" />
                  <path d="M 106 41 L 110 42 L 124 39 Z" fill="url(#windowShine)" opacity="0.9" />

                  {/* Headlights */}
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
                    <line x1="60" y1="72" x2="60" y2="88" stroke="#6B7280" strokeWidth="1.5" />
                    <line x1="52" y1="80" x2="68" y2="80" stroke="#6B7280" strokeWidth="1.5" />
                    <line x1="55" y1="75" x2="65" y2="85" stroke="#6B7280" strokeWidth="1.5" />
                    <line x1="55" y1="85" x2="65" y2="75" stroke="#6B7280" strokeWidth="1.5" />
                  </g>

                  <g className="animate-wheel-spin" style={{ transformOrigin: '140px 80px' }}>
                    <circle cx="140" cy="80" r="12" fill="url(#wheelGrad)" />
                    <circle cx="140" cy="80" r="9" fill="#374151" />
                    <circle cx="140" cy="80" r="5" fill="#1F2937" />
                    <line x1="140" y1="72" x2="140" y2="88" stroke="#6B7280" strokeWidth="1.5" />
                    <line x1="132" y1="80" x2="148" y2="80" stroke="#6B7280" strokeWidth="1.5" />
                    <line x1="135" y1="75" x2="145" y2="85" stroke="#6B7280" strokeWidth="1.5" />
                    <line x1="135" y1="85" x2="145" y2="75" stroke="#6B7280" strokeWidth="1.5" />
                  </g>

                  {/* Speed lines */}
                  <g opacity="0.4">
                    <line x1="10" y1="55" x2="25" y2="55" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="5" y1="65" x2="22" y2="65" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="8" y1="75" x2="20" y2="75" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Loading Text */}
            <div className="space-y-2 mb-4 text-center">
              <p className="text-sm sm:text-base md:text-lg text-gray-900 font-semibold">
                Looking up millions of records
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                Please wait while we identify your vehicle
              </p>
            </div>

            {/* Did You Know */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <p className="text-blue-600 font-bold mb-2 text-xs sm:text-sm">DID YOU KNOW:</p>
              <div className="relative min-h-[50px] sm:min-h-[60px]">
                {DID_YOU_KNOW_FACTS.map((fact, index) => (
                  <p
                    key={index}
                    className={`text-gray-700 text-xs sm:text-sm transition-all duration-500 absolute inset-0 ${
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
          </motion.div>
        )}
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
    </div>
  )
}

export default function VehicleLookupLoadingPage() {
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
      <VehicleLookupLoadingContent />
    </Suspense>
  )
}
