-- Create customers table to store user account info
CREATE TABLE IF NOT EXISTS customers (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  name VARCHAR,
  stripe_customer_id VARCHAR UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create subscriptions table to track customer subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  stripe_subscription_id VARCHAR UNIQUE NOT NULL,
  stripe_price_id VARCHAR,
  status VARCHAR NOT NULL CHECK (status IN ('active', 'canceled', 'incomplete', 'past_due', 'trialing', 'paused')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at TIMESTAMP WITH TIME ZONE,
  canceled_at TIMESTAMP WITH TIME ZONE,
  checks_used INTEGER DEFAULT 0,
  checks_limit INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_stripe_customer_id ON customers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer_id ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Update reports table to link to customers
ALTER TABLE reports
ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_reports_customer_id ON reports(customer_id);

-- Create trigger to automatically update updated_at for customers
CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to automatically update updated_at for subscriptions
CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for customers table
CREATE POLICY "Service role can do everything on customers" ON customers
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Users can read their own customer data" ON customers
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own customer data" ON customers
    FOR UPDATE USING (auth.uid() = id);

-- Create policies for subscriptions table
CREATE POLICY "Service role can do everything on subscriptions" ON subscriptions
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Users can read their own subscriptions" ON subscriptions
    FOR SELECT USING (
        customer_id IN (
            SELECT id FROM customers WHERE auth.uid() = id
        )
    );

-- Update reports RLS policies to include customer_id
DROP POLICY IF EXISTS "Users can read their own reports" ON reports;

CREATE POLICY "Users can read their own reports" ON reports
    FOR SELECT USING (
        auth.uid() = customer_id OR
        auth.email() = customer_email
    );

-- Comments
COMMENT ON TABLE customers IS 'Customer account information linked to Stripe';
COMMENT ON TABLE subscriptions IS 'Customer subscription status and usage tracking';
COMMENT ON COLUMN subscriptions.checks_used IS 'Number of PPSR checks used this billing period';
COMMENT ON COLUMN subscriptions.checks_limit IS 'Maximum checks allowed per billing period';
