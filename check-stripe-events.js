require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function checkRecentEvents() {
  console.log('Checking recent Stripe events...\n');

  const events = await stripe.events.list({
    limit: 20,
    types: ['customer.subscription.updated', 'customer.subscription.created'],
  });

  console.log(`Found ${events.data.length} recent subscription events:\n`);

  for (const event of events.data) {
    const sub = event.data.object;
    const date = new Date(event.created * 1000).toISOString();
    console.log(`Date: ${date}`);
    console.log(`   Event: ${event.type}`);
    console.log(`   Subscription: ${sub.id}`);
    console.log(`   Status: ${sub.status}`);
    console.log(`   Customer: ${sub.customer}`);
    console.log('');
  }
}

checkRecentEvents().catch(console.error);
