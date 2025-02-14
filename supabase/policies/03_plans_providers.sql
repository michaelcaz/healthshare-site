-- Enable RLS
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;

-- Plans policies
CREATE POLICY "Public can view plans"
ON plans FOR SELECT
TO public
USING (true);

CREATE POLICY "Only admins can modify plans"
ON plans FOR ALL
TO authenticated
USING ((auth.jwt()->>'role') = 'admin');

-- Providers policies
CREATE POLICY "Public can view providers"
ON providers FOR SELECT
TO public
USING (true);

CREATE POLICY "Only admins can modify providers"
ON providers FOR ALL
TO authenticated
USING ((auth.jwt()->>'role') = 'admin'); 