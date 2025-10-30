'use client'

import { useState, useEffect } from 'react'
import { Shield, Eye, EyeOff } from 'lucide-react'

interface AdminAuthProps {
  children: React.ReactNode
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Check if already authenticated on component mount
  useEffect(() => {
    const authToken = sessionStorage.getItem('admin_auth')
    if (authToken === 'authenticated') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    // Simple password check - in production, this should be a proper API call
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

    if (password === adminPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_auth', 'authenticated')
    } else {
      setError('Invalid password. Please try again.')
    }

    setLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_auth')
    setPassword('')
    setError('')
  }

  if (isAuthenticated) {
    return (
      <div>
        {/* Add logout button to the admin interface */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium shadow-lg"
          >
            Logout
          </button>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <Shield className="h-16 w-16 text-cyan-400 mx-auto" />
            <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-30"></div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-white/70">Enter your password to access the admin dashboard</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading || !password.trim()}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Authenticating...
              </div>
            ) : (
              'Access Admin Dashboard'
            )}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/40 text-xs">
            Unauthorized access is prohibited
          </p>
        </div>
      </div>
    </div>
  )
}