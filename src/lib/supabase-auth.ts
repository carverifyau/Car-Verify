import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client (for use in client components)
export function createClientComponentClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Server-side Supabase client (for use in server components and API routes)
export async function createServerComponentClient() {
  const cookieStore = await cookies()

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // Handle cookie errors in server components
          }
        },
      },
    }
  )
}

// Helper to get current user from server component
export async function getCurrentUser() {
  const supabase = await createServerComponentClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

// Helper to get customer data from server component
export async function getCustomerData() {
  const user = await getCurrentUser()
  if (!user) return null

  const supabase = await createServerComponentClient()
  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('id', user.id)
    .single()

  return customer
}

// Helper to get customer subscription
export async function getCustomerSubscription() {
  const user = await getCurrentUser()
  if (!user) return null

  const supabase = await createServerComponentClient()
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('customer_id', user.id)
    .eq('status', 'active')
    .single()

  return subscription
}

// Helper to get customer reports
export async function getCustomerReports() {
  const user = await getCurrentUser()
  if (!user) return []

  const supabase = await createServerComponentClient()
  const { data: reports } = await supabase
    .from('reports')
    .select('*')
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false })

  return reports || []
}
