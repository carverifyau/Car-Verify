-- Add PPSR PDF storage columns to reports table
-- Run this in Supabase SQL Editor

ALTER TABLE reports
ADD COLUMN IF NOT EXISTS ppsr_pdf_data TEXT,
ADD COLUMN IF NOT EXISTS ppsr_pdf_filename TEXT,
ADD COLUMN IF NOT EXISTS ppsr_certificate_url TEXT,
ADD COLUMN IF NOT EXISTS ppsr_search_result JSONB;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_reports_ppsr_pdf ON reports(ppsr_pdf_filename) WHERE ppsr_pdf_data IS NOT NULL;

-- Verify columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'reports'
  AND column_name LIKE 'ppsr%';
