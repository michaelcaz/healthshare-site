-- 1. Fix user_settings to be authenticated only (not public)
DROP POLICY IF EXISTS "Users can view own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can insert own settings" ON user_settings;

CREATE POLICY "Users can view own settings"
ON user_settings FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
ON user_settings FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
ON user_settings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 2. Fix profiles to be authenticated only (not public)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- 3. Fix affiliate_clicks to have admin view access
DROP POLICY IF EXISTS "Users can view own clicks" ON affiliate_clicks;

CREATE POLICY "Users can view own clicks or admins view all"
ON affiliate_clicks FOR SELECT
TO authenticated
USING (
    user_id = auth.uid() 
    OR (auth.jwt()->>'role') = 'admin'
);

-- 4. Force RLS on all tables for additional security
ALTER TABLE affiliate_clicks FORCE ROW LEVEL SECURITY;
ALTER TABLE coverage_details FORCE ROW LEVEL SECURITY;
ALTER TABLE plans FORCE ROW LEVEL SECURITY;
ALTER TABLE profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE providers FORCE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses FORCE ROW LEVEL SECURITY;
ALTER TABLE user_settings FORCE ROW LEVEL SECURITY; 