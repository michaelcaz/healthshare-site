-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for all users" ON questionnaire_responses;
DROP POLICY IF EXISTS "Users can read own responses" ON questionnaire_responses;

-- Enable RLS
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view their own responses and admins to view all
CREATE POLICY "Users can view own responses or admins view all"
ON questionnaire_responses FOR SELECT
TO authenticated
USING (
    user_id = auth.uid() 
    OR (auth.jwt()->>'role') = 'admin'
    OR user_id IS NULL
);

-- Allow authenticated users to create responses
CREATE POLICY "Users can create responses"
ON questionnaire_responses FOR INSERT
TO authenticated
WITH CHECK (
    user_id = auth.uid()
    OR user_id IS NULL
);

-- Allow anonymous submissions
CREATE POLICY "Allow anonymous submissions"
ON questionnaire_responses FOR INSERT
TO anon
WITH CHECK (user_id IS NULL); 