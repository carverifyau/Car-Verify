-- Migration to add missing Stripe subscription statuses
-- Stripe sends 'incomplete_expired' when payment fails and expires after 23 hours
-- Stripe sends 'unpaid' when payment fails and won't retry

-- Drop the old constraint
ALTER TABLE subscriptions
DROP CONSTRAINT IF EXISTS subscriptions_status_check;

-- Add new constraint with all valid Stripe subscription statuses
ALTER TABLE subscriptions
ADD CONSTRAINT subscriptions_status_check
CHECK (status IN (
  'active',           -- Subscription is active and paid
  'canceled',         -- Subscription has been canceled
  'incomplete',       -- Payment is pending (initial subscription creation)
  'incomplete_expired', -- Payment failed/expired after 23 hours
  'past_due',         -- Payment failed but will retry
  'trialing',         -- In trial period
  'paused',           -- Subscription is paused
  'unpaid'            -- Payment failed and won't retry
));

-- Add comment
COMMENT ON CONSTRAINT subscriptions_status_check ON subscriptions
IS 'Allows all valid Stripe subscription statuses including incomplete_expired and unpaid';
