'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Search, Loader2, ArrowRight } from 'lucide-react'
import { vehicleIdentifierSchema } from '@/lib/vehicle-validation'

const lookupSchema = z.object({
  lookupType: z.enum(['vin', 'rego']),
  vin: z.string().optional(),
  rego: z.string().optional(),
  state: z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT']).optional(),
})

type LookupForm = z.infer<typeof lookupSchema>

export default function VehicleLookupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [lookupType, setLookupType] = useState<'vin' | 'rego'>('rego')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LookupForm>({
    resolver: zodResolver(lookupSchema),
    defaultValues: {
      lookupType: 'rego',
    },
  })

  // Debug: Watch all form values
  const watchedValues = watch()
  console.log('🔍 Form values:', watchedValues)
  console.log('🔍 Form errors:', errors)


  const onSubmit = async (data: LookupForm) => {
    console.log('🚀 Form submitted! onSubmit called')
    setIsLoading(true)

    try {
      // Validate the data based on type
      console.log('Form submission data:', data)
      let vehicleData
      if (data.lookupType === 'vin' && data.vin) {
        vehicleData = { type: 'vin' as const, vin: data.vin }
      } else if (data.lookupType === 'rego' && data.rego && data.state) {
        vehicleData = { type: 'rego' as const, rego: data.rego, state: data.state }
      } else {
        console.error('Invalid input - lookupType:', data.lookupType, 'rego:', data.rego, 'state:', data.state, 'vin:', data.vin)
        throw new Error(`Invalid input - lookupType: ${data.lookupType}, rego: ${data.rego}, state: ${data.state}`)
      }

      // Validate using our schema
      const validatedData = vehicleIdentifierSchema.parse(vehicleData)

      // Redirect to checkout page with vehicle details
      const params = new URLSearchParams()
      if (validatedData.type === 'vin') {
        params.set('vin', validatedData.vin)
      } else {
        params.set('rego', validatedData.rego)
        params.set('state', validatedData.state)
      }

      // Redirect to checkout page
      console.log('Redirecting to:', `/checkout?${params.toString()}`)
      console.log('Validated data:', validatedData)
      window.location.href = `/checkout?${params.toString()}`

    } catch (error) {
      console.error('Report generation error:', error)
      console.error('Form data:', data)
      console.error('Vehicle data:', vehicleData)
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Get Your Vehicle History Report
      </h2>

      <form onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log('❌ Form validation failed:', errors)
      })} className="space-y-6">
        {/* Lookup Type Toggle */}
        <div className="flex bg-white/20 backdrop-blur rounded-xl p-1">
          <button
            type="button"
            onClick={() => {
              setLookupType('rego')
              setValue('lookupType', 'rego')
            }}
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
            onClick={() => {
              setLookupType('vin')
              setValue('lookupType', 'vin')
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              lookupType === 'vin'
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            VIN Number
          </button>
        </div>

        <input type="hidden" {...register('lookupType')} />

        {/* VIN Input */}
        {lookupType === 'vin' && (
          <div>
            <label htmlFor="vin" className="block text-sm font-medium text-white/90 mb-2">
              Vehicle Identification Number (VIN)
            </label>
            <input
              {...register('vin')}
              type="text"
              id="vin"
              placeholder="e.g., WVWZZZ1JZ3W386752"
              className="w-full px-4 py-4 bg-white/20 backdrop-blur border border-white/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-center font-mono text-lg tracking-wider uppercase text-white placeholder-white/50 transition-all duration-300"
              maxLength={17}
            />
            {errors.vin && (
              <p className="mt-1 text-sm text-red-300">Please enter a valid 17-character VIN</p>
            )}
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
                {...register('rego')}
                type="text"
                id="rego"
                placeholder="e.g., ABC123"
                className="w-full px-4 py-4 bg-white/20 backdrop-blur border border-white/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-center font-bold text-lg tracking-wider uppercase text-white placeholder-white/50 transition-all duration-300"
                maxLength={7}
              />
              {errors.rego && (
                <p className="mt-1 text-sm text-red-300">Please enter a valid registration number</p>
              )}
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-white/90 mb-2">
                State/Territory
              </label>
              <select
                {...register('state')}
                id="state"
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
              {errors.state && (
                <p className="mt-1 text-sm text-red-300">Please select a state</p>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          onClick={() => console.log('🖱️ Submit button clicked!')}
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

        {/* Trust Indicators */}
        <div className="border-t border-white/20 pt-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <svg className="h-4 w-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Bank-level Security</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <svg className="h-4 w-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Money-Back Guarantee</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <svg className="h-4 w-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Official Government Data</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}