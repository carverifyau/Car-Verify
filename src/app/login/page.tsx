'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Mail, ArrowRight } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log('Sending OTP to:', email)
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
      })

      console.log('OTP Response:', { data, error })

      if (error) {
        throw error
      }

      setShowOtpInput(true)
    } catch (err) {
      console.error('OTP Send Error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log('Verifying OTP for:', email)
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      })

      console.log('Verify Response:', { data, error })

      if (error) {
        throw error
      }

      console.log('✅ OTP verified successfully! Session:', data.session)

      // Wait for session to be saved in localStorage/cookies
      await new Promise(resolve => setTimeout(resolve, 500))

      // Use Next.js router for proper navigation with session
      router.push('/account')
      router.refresh()
    } catch (err) {
      console.error('OTP Verify Error:', err)
      setError(err instanceof Error ? err.message : 'Invalid code. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Car Verify</span>
          </div>
          <p className="text-gray-600">Access your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sign In
          </h1>

          <form onSubmit={showOtpInput ? handleVerifyOtp : handleSendCode} className="space-y-6">
            {!showOtpInput ? (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                />
                <p className="mt-2 text-xs text-gray-500">
                  We'll send you a 6-digit code to sign in
                </p>
              </div>
            ) : (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900 text-sm">
                    Code sent to <strong>{email}</strong>
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    required
                    maxLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-center text-2xl tracking-widest font-mono text-gray-900"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Check your email for the verification code
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowOtpInput(false)
                      setOtp('')
                      setError(null)
                    }}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Use a different email
                  </button>
                </div>
              </>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || (!showOtpInput && !email) || (showOtpInput && otp.length !== 6)}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>{showOtpInput ? 'Verifying code...' : 'Sending code...'}</span>
                </>
              ) : (
                <>
                  <span>{showOtpInput ? 'Verify Code' : 'Send Code'}</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Get your first PPSR check
              </a>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            🔒 Secure authentication powered by Supabase
            <br />
            No passwords needed - we'll email you a 6-digit code
          </p>
        </div>
      </div>
    </div>
  )
}
