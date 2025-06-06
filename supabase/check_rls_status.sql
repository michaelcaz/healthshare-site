-- Check RLS status for all tables
SELECT 
    t.table_name,
    CASE 
        WHEN pc.relrowsecurity = true THEN 'Enabled'
        ELSE 'Disabled'
    END as rls_status,
    CASE 
        WHEN pc.relforcerowsecurity = true THEN 'Yes'
        ELSE 'No'
    END as force_rls
FROM information_schema.tables t
JOIN pg_class pc ON pc.relname = t.table_name
WHERE t.table_schema = 'public'
AND t.table_type = 'BASE TABLE'
ORDER BY t.table_name; 