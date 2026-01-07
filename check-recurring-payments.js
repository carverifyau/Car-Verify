require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function checkRecurringPayments() {
  console.log('Checking invoice payment failures...\n');

  const invoices = await stripe.invoices.list({
    limit: 50,
    status: 'open',
  });

  console.log('Found ' + invoices.data.length + ' open/unpaid invoices:\n');

  for (const invoice of invoices.data) {
    const nextAttempt = invoice.next_payment_attempt ? new Date(invoice.next_payment_attempt * 1000).toISOString() : 'No retry';
    console.log('Invoice: ' + invoice.id);
    console.log('  Customer: ' + invoice.customer);
    console.log('  Status: ' + invoice.status);
    console.log('  Amount: ' + (invoice.amount_due / 100).toFixed(2));
    console.log('  Subscription: ' + invoice.subscription);
    console.log('  Attempt count: ' + invoice.attempt_count);
    console.log('  Next attempt: ' + nextAttempt);
    console.log('');
  }

  const failedInvoices = await stripe.invoices.list({
    limit: 50,
    status: 'uncollectible',
  });

  console.log('\nFound ' + failedInvoices.data.length + ' uncollectible invoices\n');
}

checkRecurringPayments().catch(console.error);
