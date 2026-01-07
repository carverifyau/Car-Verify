require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function checkIncompleteSubscriptions() {
  console.log('🔍 Checking incomplete subscriptions...\n');

  let hasMore = true;
  let startingAfter = undefined;
  let totalCount = 0;
  let incompleteCount = 0;
  let activeCount = 0;
  let statusCounts = {};

  while (hasMore) {
    const subscriptions = await stripe.subscriptions.list({
      limit: 100,
      starting_after: startingAfter,
    });

    for (const sub of subscriptions.data) {
      totalCount++;
      statusCounts[sub.status] = (statusCounts[sub.status] || 0) + 1;

      if (sub.status === 'incomplete' || sub.status === 'incomplete_expired') {
        incompleteCount++;
        console.log(`❌ ${sub.id} - ${sub.status} - Customer: ${sub.customer}`);
      } else if (sub.status === 'active') {
        activeCount++;
      }
    }

    hasMore = subscriptions.has_more;
    if (hasMore) {
      startingAfter = subscriptions.data[subscriptions.data.length - 1].id;
    }
  }

  console.log('\n📊 SUMMARY:');
  console.log(`Total subscriptions: ${totalCount}`);
  console.log(`Active: ${activeCount}`);
  console.log(`Incomplete: ${incompleteCount}`);
  console.log('\nStatus breakdown:');
  for (const [status, count] of Object.entries(statusCounts)) {
    console.log(`  ${status}: ${count}`);
  }
}

checkIncompleteSubscriptions().catch(console.error);
