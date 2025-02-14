-- Create tables
CREATE TABLE IF NOT EXISTS providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    website TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES providers(id),
    name TEXT NOT NULL,
    description TEXT,
    monthly_cost DECIMAL,
    incident_cost DECIMAL,
    maternity_coverage BOOLEAN DEFAULT false,
    maternity_waiting_period INTEGER,
    pre_existing_conditions BOOLEAN DEFAULT false,
    pre_existing_waiting_period INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS coverage_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id UUID REFERENCES plans(id),
    coverage_type TEXT NOT NULL,
    coverage_limit DECIMAL,
    waiting_period INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS questionnaire_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    response_data JSONB NOT NULL,
    selected_plan_id UUID REFERENCES plans(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email_notifications BOOLEAN DEFAULT true,
    marketing_emails BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS affiliate_clicks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES providers(id),
    user_id UUID REFERENCES auth.users(id),
    questionnaire_id UUID REFERENCES questionnaire_responses(id),
    clicked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    source_page TEXT,
    utm_params JSONB,
    user_agent TEXT,
    ip_address TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_user_id ON questionnaire_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_plans_provider_id ON plans(provider_id);
CREATE INDEX IF NOT EXISTS idx_coverage_details_plan_id ON coverage_details(plan_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_provider_id ON affiliate_clicks(provider_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_user_id ON affiliate_clicks(user_id);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_providers_updated_at
    BEFORE UPDATE ON providers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plans_updated_at
    BEFORE UPDATE ON plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coverage_details_updated_at
    BEFORE UPDATE ON coverage_details
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
    BEFORE UPDATE ON user_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 