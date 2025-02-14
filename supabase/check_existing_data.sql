-- Check providers
SELECT 
    name,
    website_url,
    trust_score,
    features,
    risks
FROM providers
ORDER BY name;

-- Check plans with their providers
SELECT 
    pr.name as provider_name,
    p.name as plan_name,
    p.monthly_cost,
    p.features,
    p.cost_sharing,
    p.network_info,
    p.prescription_coverage
FROM plans p
JOIN providers pr ON p.provider_id = pr.id
ORDER BY pr.name, p.monthly_cost; 