import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export type Database = {
  public: {
    Tables: {
      reports: {
        Row: {
          id: string
          order_id: string
          customer_email: string
          customer_name: string | null
          vehicle_identifier: any
          report_type: string
          status: string
          created_at: string
          updated_at: string
          report_data: any | null
        }
        Insert: {
          id?: string
          order_id: string
          customer_email: string
          customer_name?: string | null
          vehicle_identifier: any
          report_type: string
          status?: string
          created_at?: string
          updated_at?: string
          report_data?: any | null
        }
        Update: {
          id?: string
          order_id?: string
          customer_email?: string
          customer_name?: string | null
          vehicle_identifier?: any
          report_type?: string
          status?: string
          created_at?: string
          updated_at?: string
          report_data?: any | null
        }
      }
    }
  }
}