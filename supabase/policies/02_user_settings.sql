-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can create own settings" ON user_settings;

-- Enable RLS
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own settings
CREATE POLICY "Users can view own settings"
ON user_settings FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow users to update their own settings
CREATE POLICY "Users can update own settings"
ON user_settings FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Allow users to insert their own settings
CREATE POLICY "Users can create own settings"
ON user_settings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id); 