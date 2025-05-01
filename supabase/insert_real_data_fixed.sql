-- Clear existing test data
DELETE FROM coverage_details;
DELETE FROM plans;
DELETE FROM providers;

-- Insert Zion Health
INSERT INTO providers (
    id,
    name,
    website_url,
    description,
    is_active,
    created_at,
    updated_at
)
VALUES (
    'zion-health',
    'Zion Healthshare',
    'https://zionhealthshare.org',
    'A modern healthshare ministry focused on simplicity and transparency',
    true,
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert CrowdHealth
INSERT INTO providers (
    id,
    name,
    website_url,
    description,
    is_active,
    created_at,
    updated_at
)
VALUES (
    'crowdhealth-standard',
    'CrowdHealth',
    'https://www.joincrowdhealth.com',
    'A tech-forward healthshare focused on price transparency and member empowerment',
    true,
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert Sedera
INSERT INTO providers (
    id,
    name,
    website_url,
    description,
    is_active,
    created_at,
    updated_at
)
VALUES (
    'sedera',
    'Sedera',
    'https://sedera.com',
    'A well-established healthshare ministry with comprehensive medical cost sharing',
    true,
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert MPB Health
INSERT INTO providers (
    id,
    name,
    website_url,
    description,
    is_active,
    created_at,
    updated_at
)
VALUES (
    'mpb-health',
    'MPB Health',
    'https://www.mpbhealth.com',
    'A trusted healthshare ministry offering both basic and premium coverage options',
    true,
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert Knew Health
INSERT INTO providers (
    id,
    name,
    website_url,
    description,
    is_active,
    created_at,
    updated_at
)
VALUES (
    'knew-health-standard',
    'Knew Health',
    'https://knewhealth.com',
    'A holistic healthshare focused on both medical cost sharing and wellness',
    true,
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert Zion Direct Plan
INSERT INTO plans (
    id,
    provider_id,
    name,
    description,
    monthly_cost,
    incident_cost,
    maternity_coverage,
    maternity_waiting_period,
    pre_existing_conditions,
    pre_existing_waiting_period,
    is_active,
    created_at,
    updated_at
)
VALUES (
    'zion-healthshare-direct-membership',
    'zion-health',
    'Zion Direct',
    'Direct membership with flexible Initial Unshared Amount options',
    201.00,
    1000.00,
    true,
    12,
    true,
    12,
    true,
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert Zion Essential Plan
INSERT INTO plans (
    id,
    provider_id,
    name,
    description,
    monthly_cost,
    incident_cost,
    maternity_coverage,
    maternity_waiting_period,
    pre_existing_conditions,
    pre_existing_waiting_period,
    is_active,
    created_at,
    updated_at
)
VALUES (
    'zion-essential',
    'zion-health',
    'Essential Membership',
    'Essential coverage with comprehensive benefits',
    201.00,
    1000.00,
    true,
    12,
    true,
    12,
    true,
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert CrowdHealth Basic Plan
INSERT INTO plans (
    id,
    provider_id,
    name,
    description,
    monthly_cost,
    incident_cost,
    maternity_coverage,
    maternity_waiting_period,
    pre_existing_conditions,
    pre_existing_waiting_period,
    is_active,
    created_at,
    updated_at
)
VALUES (
    'crowdhealth-basic',
    'crowdhealth-standard',
    'CrowdHealth Basic',
    'Simple and transparent healthcare cost sharing',
    195.00,
    500.00,
    true,
    10,
    true,
    12,
    true,
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert Sedera Select+ Plan
INSERT INTO plans (
    id,
    provider_id,
    name,
    description,
    monthly_cost,
    incident_cost,
    maternity_coverage,
    maternity_waiting_period,
    pre_existing_conditions,
    pre_existing_waiting_period,
    is_active,
    created_at,
    updated_at
)
VALUES (
    'sedera-select-plus',
    'sedera',
    'SELECT+',
    'Premium healthcare sharing with comprehensive coverage',
    247.00,
    500.00,
    true,
    9,
    true,
    12,
    true,
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert MPB Health Basic Plan
INSERT INTO plans (
    id,
    provider_id,
    name,
    description,
    monthly_cost,
    incident_cost,
    maternity_coverage,
    maternity_waiting_period,
    pre_existing_conditions,
    pre_existing_waiting_period,
    is_active,
    created_at,
    updated_at
)
VALUES (
    'mpb-health-basic',
    'mpb-health',
    'MPB Health Basic',
    'Basic healthcare sharing with essential coverage',
    201.00,
    1000.00,
    true,
    0,
    true,
    12,
    true,
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert MPB Health Premium Plan
INSERT INTO plans (
    id,
    provider_id,
    name,
    description,
    monthly_cost,
    incident_cost,
    maternity_coverage,
    maternity_waiting_period,
    pre_existing_conditions,
    pre_existing_waiting_period,
    is_active,
    created_at,
    updated_at
)
VALUES (
    'mpb-health-premium',
    'mpb-health',
    'MPB Health Premium',
    'Premium healthcare sharing with comprehensive coverage',
    247.00,
    500.00,
    true,
    9,
    true,
    12,
    true,
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert Knew Health Standard Plan
INSERT INTO plans (
    id,
    provider_id,
    name,
    description,
    monthly_cost,
    incident_cost,
    maternity_coverage,
    maternity_waiting_period,
    pre_existing_conditions,
    pre_existing_waiting_period,
    is_active,
    created_at,
    updated_at
)
VALUES (
    'knew-health',
    'knew-health-standard',
    'Standard',
    'Holistic healthcare sharing with wellness focus',
    241.00,
    1000.00,
    true,
    12,
    true,
    12,
    true,
    now(),
    now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert coverage details for all plans
INSERT INTO coverage_details (
    plan_id,
    category,
    subcategory,
    coverage_type,
    coverage_percentage,
    coverage_amount,
    waiting_period_days,
    annual_limit,
    lifetime_limit,
    notes
)
SELECT id as plan_id, category, subcategory, coverage_type, coverage_percentage, coverage_amount, waiting_period_days, annual_limit, lifetime_limit, notes
FROM (
    VALUES
    -- Zion Direct Coverage
    ('zion-healthshare-direct-membership', 'Medical', 'Primary Care', 'Copay', 100, 25.00, 0, NULL, NULL, 'Primary care visits covered after IUA'),
    ('zion-healthshare-direct-membership', 'Medical', 'Specialist', 'Copay', 100, 50.00, 0, NULL, NULL, 'Specialist visits covered after IUA'),
    ('zion-healthshare-direct-membership', 'Medical', 'Emergency', 'Copay', 100, 250.00, 0, NULL, NULL, 'Emergency visits covered after IUA'),
    ('zion-healthshare-direct-membership', 'Maternity', 'Normal Delivery', 'IUA', 100, 2500.00, 365, NULL, NULL, 'Maternity covered after 12 month waiting period'),
    ('zion-healthshare-direct-membership', 'Prescriptions', 'Generic', 'Discount', NULL, NULL, 0, NULL, NULL, 'Prescription discount program included'),
    
    -- CrowdHealth Basic Coverage
    ('crowdhealth-basic', 'Medical', 'Primary Care', 'Copay', 100, 0.00, 0, NULL, NULL, 'Primary care visits included'),
    ('crowdhealth-basic', 'Medical', 'Specialist', 'Copay', 100, 0.00, 0, NULL, NULL, 'Specialist visits included'),
    ('crowdhealth-basic', 'Medical', 'Emergency', 'Member Commitment', 100, 500.00, 0, NULL, NULL, 'Emergency visits subject to member commitment'),
    ('crowdhealth-basic', 'Maternity', 'Normal Delivery', 'Member Commitment', 100, 3000.00, 300, NULL, NULL, 'Maternity covered after 10 month waiting period'),
    ('crowdhealth-basic', 'Prescriptions', 'All', 'Discount', NULL, NULL, 0, NULL, NULL, 'Prescription savings program included'),
    
    -- Sedera Select+ Coverage
    ('sedera-select-plus', 'Medical', 'Primary Care', 'IUA', 100, 500.00, 0, NULL, NULL, 'Primary care subject to IUA'),
    ('sedera-select-plus', 'Medical', 'Specialist', 'IUA', 100, 500.00, 0, NULL, NULL, 'Specialist visits subject to IUA'),
    ('sedera-select-plus', 'Maternity', 'Normal Delivery', 'IUA', 100, 5000.00, 270, NULL, NULL, 'Maternity covered after 9 month waiting period'),
    
    -- MPB Health Basic Coverage
    ('mpb-health-basic', 'Medical', 'Primary Care', 'Copay', 100, 35.00, 0, NULL, NULL, 'Primary care visits covered after copay'),
    ('mpb-health-basic', 'Medical', 'Specialist', 'Copay', 100, 75.00, 0, NULL, NULL, 'Specialist visits covered after copay'),
    ('mpb-health-basic', 'Maternity', 'Normal Delivery', 'IUA', 100, 3000.00, 0, NULL, NULL, 'Maternity covered from day one'),
    
    -- MPB Health Premium Coverage
    ('mpb-health-premium', 'Medical', 'Primary Care', 'Copay', 100, 25.00, 0, NULL, NULL, 'Primary care visits covered after copay'),
    ('mpb-health-premium', 'Medical', 'Specialist', 'Copay', 100, 50.00, 0, NULL, NULL, 'Specialist visits covered after copay'),
    ('mpb-health-premium', 'Maternity', 'Normal Delivery', 'IUA', 100, 5000.00, 270, NULL, NULL, 'Maternity covered after 9 month waiting period')
) AS coverage_data(plan_id, category, subcategory, coverage_type, coverage_percentage, coverage_amount, waiting_period_days, annual_limit, lifetime_limit, notes)
JOIN plans p ON p.id = coverage_data.plan_id;

-- Verify the data
SELECT 'Providers' as table_name, count(*) as count FROM providers
UNION ALL
SELECT 'Plans' as table_name, count(*) as count FROM plans
UNION ALL
SELECT 'Coverage Details' as table_name, count(*) as count FROM coverage_details;

-- Show detailed provider and plan information
SELECT 
    pr.name as provider_name,
    pr.website_url,
    p.name as plan_name,
    p.description,
    p.monthly_cost,
    p.incident_cost,
    p.maternity_coverage,
    p.maternity_waiting_period,
    cd.category,
    cd.subcategory,
    cd.coverage_type,
    cd.coverage_amount,
    cd.notes
FROM providers pr
JOIN plans p ON p.provider_id = pr.id
LEFT JOIN coverage_details cd ON cd.plan_id = p.id
ORDER BY pr.name, p.name, cd.category, cd.subcategory; 