'use client'

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@/lib/supabase-auth'
import { LogOut } from 'lucide-react'

export default function SignOutButton() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <LogOut className="h-4 w-4" />
      <span>Sign Out</span>
    </button>
  )
}
