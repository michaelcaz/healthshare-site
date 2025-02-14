-- Enable Row Level Security for all tables
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE coverage_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Plans: Anyone can read, only admins can modify
CREATE POLICY "Plans are publicly viewable"
ON plans FOR SELECT
TO public
USING (true);

CREATE POLICY "Only admins can modify plans"
ON plans FOR ALL
TO authenticated
USING ((auth.jwt()->>'role') = 'admin');

-- Providers: Anyone can read, only admins can modify
CREATE POLICY "Providers are publicly viewable"
ON providers FOR SELECT
TO public
USING (true);

CREATE POLICY "Only admins can modify providers"
ON providers FOR ALL
TO authenticated
USING ((auth.jwt()->>'role') = 'admin');

-- Questionnaire Responses: Users can see their own responses, admins can see all
CREATE POLICY "Users can view their own responses"
ON questionnaire_responses FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR (auth.jwt()->>'role') = 'admin');

CREATE POLICY "Users can create their own responses"
ON questionnaire_responses FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow anonymous questionnaire submissions"
ON questionnaire_responses FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

-- Profiles: Users can only access their own profile
CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid()::text = profiles.id::text);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid()::text = profiles.id::text);

CREATE POLICY "Users can create their own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = id::text);

-- User Settings: Users can only access their own settings
CREATE POLICY "Users can view their own settings"
ON user_settings FOR SELECT
TO authenticated
USING (auth.uid()::text = user_settings.id::text);

CREATE POLICY "Users can update their own settings"
ON user_settings FOR UPDATE
TO authenticated
USING (auth.uid()::text = user_settings.id::text);

CREATE POLICY "Users can create their own settings"
ON user_settings FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = id::text);

-- Affiliate Clicks: Anyone can create, only admins can view
CREATE POLICY "Anyone can create affiliate clicks"
ON affiliate_clicks FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Only admins can view affiliate clicks"
ON affiliate_clicks FOR SELECT
TO authenticated
USING ((auth.jwt()->>'role') = 'admin');

-- Coverage Details: Anyone can read, only admins can modify
CREATE POLICY "Coverage details are publicly viewable"
ON coverage_details FOR SELECT
TO public
USING (true);

CREATE POLICY "Only admins can modify coverage details"
ON coverage_details FOR ALL
TO authenticated
USING ((auth.jwt()->>'role') = 'admin'); 