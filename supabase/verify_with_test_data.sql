-- 1. Insert test provider
INSERT INTO providers (
    name, 
    description, 
    website_url, 
    slug,
    trust_score,
    features,
    risks
)
VALUES (
    'Test Provider', 
    'Test healthcare provider',
    'https://test-provider.com',
    'test-provider',
    85,  -- Changed to integer (0-100 scale)
    '[
        {
            "title": "Large Network",
            "description": "Access to nationwide healthcare providers"
        },
        {
            "title": "24/7 Support",
            "description": "Round-the-clock customer service"
        }
    ]'::jsonb,
    '[
        {
            "title": "Waiting Period",
            "description": "30-day waiting period for certain services"
        },
        {
            "title": "Coverage Limits",
            "description": "Annual limits apply to some services"
        }
    ]'::jsonb
)
ON CONFLICT (slug) DO NOTHING
RETURNING id;

-- 2. Insert test plan
INSERT INTO plans (
    provider_id,
    name,
    slug,
    monthly_cost,
    features,
    cost_sharing,
    network_info,
    prescription_coverage,
    updated_at
)
SELECT 
    id as provider_id,
    'Test Plan',
    'test-plan',
    299.99,
    '[
        {
            "title": "Comprehensive Coverage",
            "description": "Full medical, dental, and vision coverage"
        },
        {
            "title": "Preventive Care",
            "description": "100% coverage for preventive services"
        }
    ]'::jsonb,
    '{
        "deductible": 1000,
        "out_of_pocket_max": 5000,
        "copay": {
            "primary_care": 25,
            "specialist": 50,
            "emergency": 250
        }
    }'::jsonb,
    '{
        "network_type": "PPO",
        "network_size": "Large",
        "out_of_network_coverage": true
    }'::jsonb,
    '{
        "generic": {
            "copay": 10,
            "coverage": "90%"
        },
        "brand": {
            "copay": 30,
            "coverage": "70%"
        }
    }'::jsonb,
    now()  -- Set updated_at to current timestamp
FROM providers
WHERE slug = 'test-provider'
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert test coverage details
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
SELECT 
    p.id as plan_id,
    'Medical',  -- Required
    'Primary Care',  -- Optional
    'Copay',  -- Required
    80,  -- Coverage percentage (optional)
    25.00,  -- Copay amount (optional)
    30,  -- Waiting period (optional, defaults to 0)
    5000.00,  -- Annual limit (optional)
    1000000.00,  -- Lifetime limit (optional)
    'Includes routine check-ups and preventive care'  -- Optional notes
FROM plans p
JOIN providers pr ON p.provider_id = pr.id
WHERE pr.slug = 'test-provider' AND p.slug = 'test-plan'
ON CONFLICT DO NOTHING;

-- 4. Verify data
SELECT 'Providers' as table_name, count(*) as count FROM providers
UNION ALL
SELECT 'Plans' as table_name, count(*) as count FROM plans
UNION ALL
SELECT 'Coverage Details' as table_name, count(*) as count FROM coverage_details;

-- 5. Verify relationships and data
SELECT 
    pr.name as provider_name,
    pr.website_url,
    pr.slug as provider_slug,
    pr.trust_score,
    pr.features as provider_features,
    pr.risks,
    p.name as plan_name,
    p.slug as plan_slug,
    p.monthly_cost,
    p.features as plan_features,
    p.cost_sharing,
    p.network_info,
    p.prescription_coverage,
    cd.category,
    cd.subcategory,
    cd.coverage_type,
    cd.coverage_percentage,
    cd.coverage_amount,
    cd.annual_limit,
    cd.lifetime_limit,
    cd.notes
FROM providers pr
JOIN plans p ON p.provider_id = pr.id
JOIN coverage_details cd ON cd.plan_id = p.id
WHERE pr.slug = 'test-provider';

-- 6. Verify public access (these should work without auth)
SELECT count(*) as public_plans_count FROM plans;
SELECT count(*) as public_providers_count FROM providers;
SELECT count(*) as public_coverage_count FROM coverage_details;

-- 7. Verify protected access (these should fail without auth)
SELECT count(*) as profiles_count FROM profiles;
SELECT count(*) as user_settings_count FROM user_settings; 