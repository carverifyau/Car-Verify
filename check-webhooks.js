require('dotenv').config({ path: '.env.local' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function checkWebhooks() {
  console.log('🔍 Checking configured webhooks...\n');

  try {
    const webhooks = await stripe.webhookEndpoints.list({ limit: 10 });

    if (webhooks.data.length === 0) {
      console.log('❌ NO WEBHOOKS CONFIGURED!');
      console.log('\nThis is why your payments aren\'t creating reports.');
      console.log('\nYou need to add a webhook endpoint in Stripe Dashboard:');
      console.log('https://dashboard.stripe.com/test/webhooks\n');
      return;
    }

    console.log(`✅ Found ${webhooks.data.length} webhook(s):\n`);

    webhooks.data.forEach((wh, i) => {
      console.log(`Webhook ${i + 1}:`);
      console.log(`  URL: ${wh.url}`);
      console.log(`  Status: ${wh.status}`);
      console.log(`  Events: ${wh.enabled_events.join(', ')}`);
      console.log(`  Created: ${new Date(wh.created * 1000).toISOString()}`);
      console.log('');
    });

    // Check if the correct URL is configured
    const correctUrl = 'https://rego-reports.vercel.app/api/webhooks/stripe';
    const hasCorrectUrl = webhooks.data.some(wh => wh.url === correctUrl);

    if (!hasCorrectUrl) {
      console.log(`⚠️  ISSUE: None of your webhooks point to: ${correctUrl}`);
      console.log('   You need to add this URL in your Stripe Dashboard.\n');
    } else {
      console.log(`✅ Webhook configured correctly for: ${correctUrl}\n`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkWebhooks();
