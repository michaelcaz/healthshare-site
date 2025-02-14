-- Enable RLS on all tables
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE coverage_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Force RLS on all tables
ALTER TABLE affiliate_clicks FORCE ROW LEVEL SECURITY;
ALTER TABLE coverage_details FORCE ROW LEVEL SECURITY;
ALTER TABLE plans FORCE ROW LEVEL SECURITY;
ALTER TABLE profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE providers FORCE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses FORCE ROW LEVEL SECURITY;
ALTER TABLE user_settings FORCE ROW LEVEL SECURITY;

-- Drop existing policies for user_settings
DROP POLICY IF EXISTS "Users can view own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can insert own settings" ON user_settings;

-- Recreate user_settings policies with strict authentication
CREATE POLICY "Users can view own settings"
ON user_settings FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own settings"
ON user_settings FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert own settings"
ON user_settings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Drop existing policies for profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Recreate profiles policies with strict authentication
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

-- Verify the changes
SELECT 
    tablename,
    policyname,
    permissive,
    roles,
    cmd as operation,
    CASE 
        WHEN cmd = 'SELECT' THEN qual
        WHEN cmd = 'INSERT' THEN with_check
        ELSE qual || ' / ' || COALESCE(with_check, 'none')
    END as definition
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('user_settings', 'profiles')
ORDER BY tablename, policyname; 