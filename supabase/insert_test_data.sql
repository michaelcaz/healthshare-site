-- Insert test provider
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
    85,
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
ON CONFLICT (slug) DO NOTHING;

-- Insert test plan
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
    'Basic Health Plan',
    'basic-health-plan',
    299.99,
    '[
        {
            "title": "Essential Coverage",
            "description": "Comprehensive medical coverage"
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
    now()
FROM providers
WHERE slug = 'test-provider'
ON CONFLICT (slug) DO NOTHING;

-- Verify the data
SELECT 
    pr.name as provider_name,
    pr.website_url,
    pr.trust_score,
    p.name as plan_name,
    p.monthly_cost,
    p.features,
    p.cost_sharing
FROM providers pr
LEFT JOIN plans p ON p.provider_id = pr.id
WHERE pr.slug = 'test-provider'; 