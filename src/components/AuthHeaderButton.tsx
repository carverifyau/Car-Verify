'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { User, LogIn } from 'lucide-react'
import Link from 'next/link'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function AuthHeaderButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session)
      setIsLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (isLoading) {
    return null // Or a skeleton loader
  }

  if (isLoggedIn) {
    return (
      <Link
        href="/account"
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        <User className="h-4 w-4" />
        <span className="hidden md:inline">My Account</span>
      </Link>
    )
  }

  return (
    <Link
      href="/login"
      className="flex items-center space-x-2 border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
    >
      <LogIn className="h-4 w-4" />
      <span className="hidden md:inline">Login</span>
    </Link>
  )
}
