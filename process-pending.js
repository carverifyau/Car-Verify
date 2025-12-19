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

// Import PPSR Cloud client
const { PPSRCloudClient } = require('./src/lib/ppsr-cloud-node.js')

async function processPendingReport(reportId) {
  console.log(`\n🔄 Processing report: ${reportId}\n`)

  // Get report
  const { data: report, error } = await supabaseAdmin
    .from('reports')
    .select('*')
    .eq('id', reportId)
    .single()

  if (error || !report) {
    console.error('❌ Report not found:', error)
    return
  }

  console.log(`📋 Report found:`)
  console.log(`  Email: ${report.customer_email}`)
  console.log(`  Rego: ${report.vehicle_identifier.rego}`)
  console.log(`  State: ${report.vehicle_identifier.state}`)
  console.log(`  Status: ${report.status}\n`)

  try {
    console.log('🚗 Fetching PPSR certificate...')

    const ppsrClient = new PPSRCloudClient()
    const result = await ppsrClient.performPPSRCheck({
      registrationPlate: report.vehicle_identifier.rego,
      registrationState: report.vehicle_identifier.state,
      vin: report.vehicle_identifier.vin
    })

    console.log('✅ PPSR check successful!')
    console.log(`  Certificate: ${result.filename}`)
    console.log(`  Search Number: ${result.searchNumber}`)

    // Update report
    await supabaseAdmin
      .from('reports')
      .update({ status: 'completed' })
      .eq('id', reportId)

    console.log('\n✅ Report marked as completed')

  } catch (error) {
    console.error('\n❌ PPSR processing failed:')
    console.error(`  Message: ${error.message}`)
    console.error(`  Stack: ${error.stack}`)
  }
}

const reportId = process.argv[2]
if (!reportId) {
  console.error('Usage: node process-pending.js <report-id>')
  process.exit(1)
}

processPendingReport(reportId)
