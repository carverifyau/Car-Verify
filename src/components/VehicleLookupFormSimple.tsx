'use client'

import { useState } from 'react'
import { Search, Loader2, ArrowRight } from 'lucide-react'

export default function VehicleLookupFormSimple() {
  const [isLoading, setIsLoading] = useState(false)
  const [lookupType, setLookupType] = useState<'vin' | 'rego'>('rego')
  const [vin, setVin] = useState('')
  const [rego, setRego] = useState('')
  const [state, setState] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🚀 Simple form submitted!')
    console.log('Type:', lookupType)
    console.log('VIN:', vin)
    console.log('Rego:', rego)
    console.log('State:', state)

    setIsLoading(true)

    try {
      // Build URL params
      const params = new URLSearchParams()

      if (lookupType === 'vin' && vin) {
        params.set('vin', vin)
      } else if (lookupType === 'rego' && rego && state) {
        params.set('rego', rego)
        params.set('state', state)
      } else {
        alert('Please fill in all required fields')
        setIsLoading(false)
        return
      }

      console.log('Redirecting to:', `/checkout?${params.toString()}`)
      window.location.href = `/checkout?${params.toString()}`

    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Get Your Vehicle History Report
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Lookup Type Toggle */}
        <div className="flex bg-white/20 backdrop-blur rounded-xl p-1">
          <button
            type="button"
            onClick={() => setLookupType('rego')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              lookupType === 'rego'
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Registration Number
          </button>
          <button
            type="button"
            onClick={() => setLookupType('vin')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              lookupType === 'vin'
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            VIN Number
          </button>
        </div>

        {/* VIN Input */}
        {lookupType === 'vin' && (
          <div>
            <label htmlFor="vin" className="block text-sm font-medium text-white/90 mb-2">
              Vehicle Identification Number (VIN)
            </label>
            <input
              type="text"
              id="vin"
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              placeholder="e.g., WVWZZZ1JZ3W386752"
              className="w-full px-4 py-4 bg-white/20 backdrop-blur border border-white/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-center font-mono text-lg tracking-wider uppercase text-white placeholder-white/50 transition-all duration-300"
              maxLength={17}
            />
            <p className="mt-1 text-xs text-white/60 text-center">
              17 characters, no spaces (found on dashboard or driver&apos;s door)
            </p>
          </div>
        )}

        {/* Registration Input */}
        {lookupType === 'rego' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rego" className="block text-sm font-medium text-white/90 mb-2">
                Registration Number
              </label>
              <input
                type="text"
                id="rego"
                value={rego}
                onChange={(e) => setRego(e.target.value.toUpperCase())}
                placeholder="e.g., ABC123"
                className="w-full px-4 py-4 bg-white/20 backdrop-blur border border-white/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-center font-bold text-lg tracking-wider uppercase text-white placeholder-white/50 transition-all duration-300"
                maxLength={7}
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-white/90 mb-2">
                State/Territory
              </label>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-4 bg-white/20 backdrop-blur border border-white/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white transition-all duration-300"
              >
                <option value="" className="bg-slate-800">Select State</option>
                <option value="NSW" className="bg-slate-800">NSW</option>
                <option value="VIC" className="bg-slate-800">VIC</option>
                <option value="QLD" className="bg-slate-800">QLD</option>
                <option value="WA" className="bg-slate-800">WA</option>
                <option value="SA" className="bg-slate-800">SA</option>
                <option value="TAS" className="bg-slate-800">TAS</option>
                <option value="NT" className="bg-slate-800">NT</option>
                <option value="ACT" className="bg-slate-800">ACT</option>
              </select>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generating Report...</span>
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              <span>Get Vehicle Report Now</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}