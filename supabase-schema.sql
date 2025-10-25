-- Create the reports table with proper constraints to prevent duplicates
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id VARCHAR NOT NULL UNIQUE, -- Prevents duplicate reports for same order
  customer_email VARCHAR NOT NULL,
  customer_name VARCHAR,
  vehicle_identifier JSONB NOT NULL,
  report_type VARCHAR NOT NULL CHECK (report_type IN ('BASIC', 'STANDARD', 'PREMIUM')),
  status VARCHAR NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  report_data JSONB
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reports_order_id ON reports(order_id);
CREATE INDEX IF NOT EXISTS idx_reports_customer_email ON reports(customer_email);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_reports_updated_at
    BEFORE UPDATE ON reports
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access (you can adjust these based on your auth setup)
-- For now, we'll allow all operations for service role
CREATE POLICY "Service role can do everything" ON reports
    FOR ALL USING (auth.role() = 'service_role');

-- Allow authenticated users to read their own reports
CREATE POLICY "Users can read their own reports" ON reports
    FOR SELECT USING (auth.email() = customer_email);

-- Comment explaining the schema
COMMENT ON TABLE reports IS 'Vehicle reports generated from Stripe payments with duplicate prevention';
COMMENT ON COLUMN reports.order_id IS 'Stripe session ID or order identifier - must be unique';
COMMENT ON COLUMN reports.vehicle_identifier IS 'JSON object containing VIN or rego/state information';
COMMENT ON COLUMN reports.report_data IS 'Generated report data including PPSR, NEVDIS, and pricing information';