// Test webhook with Payment Link data
const testWebhook = async () => {
  const webhookUrl = 'https://rego-reports.vercel.app/api/webhooks/stripe'

  // Simulate a checkout.session.completed event from a Payment Link
  const testEvent = {
    id: 'evt_test_' + Date.now(),
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test_' + Date.now(),
        customer_details: {
          email: 'test@example.com',
          name: 'Test Customer'
        },
        client_reference_id: JSON.stringify({
          email: 'test@example.com',
          type: 'vin',
          vin: 'TEST123456789',
          rego: '',
          state: ''
        }),
        amount_total: 3499,
        currency: 'aud',
        payment_status: 'paid'
      }
    }
  }

  console.log('🧪 Testing webhook with Payment Link data...')
  console.log('📤 Sending to:', webhookUrl)

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testEvent)
    })

    const data = await response.json()

    console.log('✅ Response Status:', response.status)
    console.log('✅ Response Data:', JSON.stringify(data, null, 2))

    if (data.success) {
      console.log('🎉 SUCCESS! Report created with ID:', data.id)
    } else {
      console.log('❌ FAILED:', data.error || data.message)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testWebhook()
