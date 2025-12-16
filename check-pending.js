require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function checkPendingReports() {
  const { data, error } = await supabaseAdmin
    .from('reports')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    console.error('❌ Error fetching reports:', error)
    return
  }

  console.log(`📋 Found ${data.length} pending reports:\n`)
  data.forEach(report => {
    console.log(`ID: ${report.id}`)
    console.log(`Email: ${report.customer_email}`)
    console.log(`Rego: ${report.vehicle_identifier.rego} (${report.vehicle_identifier.state})`)
    console.log(`Created: ${report.created_at}`)
    console.log(`---`)
  })
}

checkPendingReports()
