// Run this to delete old $29.99 price and force recreation at $0.50
// Usage: STRIPE_SECRET_KEY="your_key" node delete-old-prices.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function deleteOldPrices() {
  console.log('Fetching all prices...');

  const prices = await stripe.prices.list({
    limit: 100,
  });

  console.log(`Found ${prices.data.length} prices`);

  for (const price of prices.data) {
    if (price.unit_amount === 2999 && price.currency === 'aud') {
      console.log(`\nFound $29.99 price: ${price.id}`);
      console.log(`  Product: ${price.product}`);
      console.log(`  Active: ${price.active}`);

      // Archive the price (can't delete, but can deactivate)
      await stripe.prices.update(price.id, {
        active: false
      });

      console.log(`  ✅ Deactivated price ${price.id}`);
    }
  }

  console.log('\n✅ Done! Old prices deactivated.');
  console.log('Next subscription will create new $0.50 price.');
}

deleteOldPrices().catch(console.error);
