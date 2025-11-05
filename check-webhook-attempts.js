require('dotenv').config({ path: '.env.local' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function checkWebhookAttempts() {
  console.log('🔍 Checking recent webhook delivery attempts...\n');

  try {
    // Get the webhook endpoint
    const webhooks = await stripe.webhookEndpoints.list({ limit: 1 });

    if (webhooks.data.length === 0) {
      console.log('❌ No webhooks found');
      return;
    }

    const webhook = webhooks.data[0];
    console.log(`Webhook: ${webhook.url}`);
    console.log(`Status: ${webhook.status}\n`);

    // Get recent events
    const events = await stripe.events.list({
      type: 'checkout.session.completed',
      limit: 5
    });

    if (events.data.length === 0) {
      console.log('❌ No checkout.session.completed events found');
      console.log('   Have you made a test payment recently?\n');
      return;
    }

    console.log(`✅ Found ${events.data.length} recent checkout.session.completed event(s):\n`);

    for (const event of events.data) {
      const session = event.data.object;
      console.log(`Event: ${event.id}`);
      console.log(`  Time: ${new Date(event.created * 1000).toLocaleString()}`);
      console.log(`  Session: ${session.id}`);
      console.log(`  Email: ${session.customer_details?.email || 'N/A'}`);
      console.log(`  Amount: $${session.amount_total / 100} ${session.currency.toUpperCase()}`);
      console.log(`  Payment Status: ${session.payment_status}`);
      console.log(`  client_reference_id: ${session.client_reference_id || 'NOT SET ❌'}`);

      if (!session.client_reference_id) {
        console.log('  ⚠️  WARNING: No client_reference_id - vehicle info not passed!');
      }

      console.log('');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkWebhookAttempts();
