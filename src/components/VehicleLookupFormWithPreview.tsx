'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Shield, Search, Loader2 } from 'lucide-react'

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

export default function VehicleLookupFormWithPreview() {
  const [lookupType, setLookupType] = useState<'vin' | 'rego'>('rego')
  const [vin, setVin] = useState('')
  const [rego, setRego] = useState('')
  const [state, setState] = useState('')
  const [isScanning, setIsScanning] = useState(false)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()

    if (lookupType === 'rego' && (!rego || !state)) {
      alert('Please enter both registration number and state')
      return
    }

    if (lookupType === 'vin' && !vin) {
      alert('Please enter VIN number')
      return
    }

    // Show scanning animation
    setIsScanning(true)

    // Simulate scanning delay for legitimacy
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Create a pending report and go to checkout
    const reportData = {
      rego: lookupType === 'rego' ? rego : '',
      state: lookupType === 'rego' ? state : '',
      vin: lookupType === 'vin' ? vin : '',
      timestamp: new Date().toISOString(),
      customerId: 'cust_' + Date.now()
    }

    // Store in localStorage to simulate creating a pending report
    const pendingReports = JSON.parse(localStorage.getItem('pendingReports') || '[]')
    pendingReports.push({ id: 'RPT' + Date.now(), ...reportData, status: 'pending' })
    localStorage.setItem('pendingReports', JSON.stringify(pendingReports))

    const params = new URLSearchParams()
    if (lookupType === 'rego') {
      params.set('rego', rego)
      params.set('state', state)
    } else {
      params.set('vin', vin)
    }

    window.location.href = `/checkout?${params.toString()}`
  }


  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Shield className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Secure Vehicle Check</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Enter Vehicle Details
        </h2>
        <p className="text-sm md:text-base text-gray-600 mt-2">Get your comprehensive vehicle report in seconds</p>
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
            </label>
            <input
              type="text"
              id="vin"
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              placeholder="Enter 17-character VIN"
              inputMode="text"
              className="w-full px-4 py-4 md:py-3 border-2 md:border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-mono text-lg md:text-base tracking-wider uppercase text-gray-900 placeholder-gray-500 transition-all duration-200"
              maxLength={17}
            />
            <p className="mt-2 text-xs text-gray-500 text-center">
              17 characters, no spaces (found on dashboard or driver's door)
            </p>
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
                maxLength={7}
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

        {/* Search Button */}
        <button
          type="submit"
          disabled={isScanning || (lookupType === 'rego' && (!rego || !state)) || (lookupType === 'vin' && !vin)}
          className="w-full bg-blue-600 text-white py-5 md:py-4 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold text-xl md:text-lg flex items-center justify-center space-x-2 shadow-lg"
        >
          {isScanning ? (
            <>
              <Loader2 className="h-6 w-6 md:h-5 md:w-5 animate-spin" />
              <span className="md:hidden">Searching...</span>
              <span className="hidden md:inline">Searching Official Database...</span>
            </>
          ) : (
            <>
              <Search className="h-6 w-6 md:h-5 md:w-5" />
              <span className="md:hidden">Get PPSR Check - $14.99</span>
              <span className="hidden md:inline">Get Official PPSR Check - $14.99</span>
            </>
          )}
        </button>
      </form>


    </div>
  )
}