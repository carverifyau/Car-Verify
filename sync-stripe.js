// Quick script to sync a specific customer from Stripe to Supabase
require('dotenv').config({ path: '.env.local' })
const Stripe = require('stripe')
const { createClient } = require('@supabase/supabase-js')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const email = process.argv[2] || 'team@loomlo.app'

async function syncCustomer(email) {
  console.log('🔍 Searching for customer in Stripe:', email)

  // Find customer in Stripe
  const customers = await stripe.customers.list({ email, limit: 1 })

  if (customers.data.length === 0) {
    console.log('❌ No customer found in Stripe with email:', email)
    return
  }

  const customer = customers.data[0]
  console.log('✅ Found customer:', customer.id, customer.email)

  // Get subscriptions
  const subscriptions = await stripe.subscriptions.list({
    customer: customer.id,
    limit: 10
  })

  console.log(`📊 Found ${subscriptions.data.length} subscription(s)`)

  for (const sub of subscriptions.data) {
    console.log(`\n📋 Subscription: ${sub.id}`)
    console.log(`   Status: ${sub.status}`)
    console.log(`   Period: ${new Date(sub.current_period_start * 1000).toLocaleDateString()} - ${new Date(sub.current_period_end * 1000).toLocaleDateString()}`)
  }

  if (subscriptions.data.length === 0) {
    console.log('❌ No subscriptions found')
    return
  }

  const activeSub = subscriptions.data.find(s => s.status === 'active') || subscriptions.data[0]
  console.log(`\n🎯 Using subscription: ${activeSub.id} (${activeSub.status})`)

  // Find user in Supabase
  console.log('\n🔍 Finding user in Supabase...')
  const { data: users } = await supabase.auth.admin.listUsers()
  let user = users.users.find(u => u.email === email)

  if (!user) {
    console.log('❌ User not found in Supabase. Creating...')
    const { data: newUser, error } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
    })
    if (error) {
      console.error('❌ Error creating user:', error)
      return
    }
    user = newUser.user
    console.log('✅ User created:', user.id)
  } else {
    console.log('✅ User found:', user.id)
  }

  // Update customer record
  console.log('\n📝 Updating customer record...')
  const { error: custError } = await supabase
    .from('customers')
    .upsert({
      id: user.id,
      email: customer.email,
      name: customer.name,
      stripe_customer_id: customer.id,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' })

  if (custError) {
    console.error('❌ Error updating customer:', custError)
    return
  }
  console.log('✅ Customer record updated')

  // Update subscription record
  console.log('\n📝 Updating subscription record...')
  const subData = {
    customer_id: user.id,
    stripe_subscription_id: activeSub.id,
    stripe_price_id: activeSub.items.data[0]?.price.id,
    status: activeSub.status,
    current_period_start: new Date(activeSub.current_period_start * 1000).toISOString(),
    current_period_end: new Date(activeSub.current_period_end * 1000).toISOString(),
    cancel_at: activeSub.cancel_at ? new Date(activeSub.cancel_at * 1000).toISOString() : null,
    canceled_at: activeSub.canceled_at ? new Date(activeSub.canceled_at * 1000).toISOString() : null,
    checks_limit: 10,
    updated_at: new Date().toISOString(),
  }

  // Check if subscription already exists
  const { data: existing } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('stripe_subscription_id', activeSub.id)
    .single()

  if (existing) {
    subData.checks_used = existing.checks_used || 0
  }

  const { error: subError, data: result } = await supabase
    .from('subscriptions')
    .upsert(subData, { onConflict: 'stripe_subscription_id' })
    .select()

  if (subError) {
    console.error('❌ Error updating subscription:', subError)
    return
  }

  console.log('✅ Subscription updated successfully!')
  console.log('\n📊 Final status:')
  console.log('   Customer ID:', customer.id)
  console.log('   Subscription ID:', activeSub.id)
  console.log('   Status:', activeSub.status)
  console.log('   Checks used:', subData.checks_used || 0, '/ 10')
}

syncCustomer(email).catch(console.error)
