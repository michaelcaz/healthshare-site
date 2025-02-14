-- Drop existing policies
DROP POLICY IF EXISTS "Public read access to coverage details" ON coverage_details;

-- Enable RLS
ALTER TABLE coverage_details ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can view coverage details"
ON coverage_details FOR SELECT
TO public
USING (true);

-- Only admins can modify
CREATE POLICY "Only admins can modify coverage details"
ON coverage_details FOR ALL
TO authenticated
USING ((auth.jwt()->>'role') = 'admin'); 