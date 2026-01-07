require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function fixSubscriptionsWithoutPaymentMethod() {
  console.log('Finding active subscriptions without payment methods...\n');

  let hasMore = true;
  let startingAfter = undefined;
  let fixedCount = 0;
  let failedCount = 0;
  let skippedCount = 0;

  while (hasMore) {
    const subscriptions = await stripe.subscriptions.list({
      limit: 100,
      status: 'active',
      starting_after: startingAfter,
    });

    for (const sub of subscriptions.data) {
      // Check if subscription has a default payment method
      if (!sub.default_payment_method) {
        console.log(`\nSubscription ${sub.id} has no payment method`);
        console.log(`  Customer: ${sub.customer}`);

        // Try to find a payment method for this customer
        const customer = await stripe.customers.retrieve(sub.customer);

        if (customer.invoice_settings && customer.invoice_settings.default_payment_method) {
          console.log(`  Found customer default payment method: ${customer.invoice_settings.default_payment_method}`);

          try {
            // Update subscription with customer's default payment method
            await stripe.subscriptions.update(sub.id, {
              default_payment_method: customer.invoice_settings.default_payment_method,
            });
            console.log(`  ✅ Fixed! Set payment method on subscription`);
            fixedCount++;
          } catch (error) {
            console.log(`  ❌ Failed to update: ${error.message}`);
            failedCount++;
          }
        } else {
          console.log(`  ⚠️ Customer has no default payment method - needs manual intervention`);
          console.log(`  Customer email: ${customer.email}`);
          skippedCount++;
        }
      }
    }

    hasMore = subscriptions.has_more;
    if (hasMore) {
      startingAfter = subscriptions.data[subscriptions.data.length - 1].id;
    }
  }

  console.log('\n📊 SUMMARY:');
  console.log(`Fixed: ${fixedCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log(`Skipped (no customer payment method): ${skippedCount}`);
}

fixSubscriptionsWithoutPaymentMethod().catch(console.error);
