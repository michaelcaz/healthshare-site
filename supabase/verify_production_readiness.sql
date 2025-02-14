-- 1. Verify Database Connection and Version
SELECT version();
SELECT current_setting('server_version_num');

-- 2. Verify RLS is enabled and forced for all tables
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

-- 3. Verify all foreign key constraints are in place
SELECT
    tc.table_schema, 
    tc.table_name, 
    kcu.column_name,
    ccu.table_schema AS foreign_table_schema,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_schema = 'public';

-- 4. Verify indexes are in place
SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM
    pg_indexes
WHERE
    schemaname = 'public'
ORDER BY
    tablename,
    indexname;

-- 5. Verify triggers (especially for updated_at columns)
SELECT 
    event_object_schema as table_schema,
    event_object_table as table_name,
    trigger_name,
    event_manipulation,
    action_statement as trigger_definition
FROM information_schema.triggers
WHERE event_object_schema = 'public'
ORDER BY event_object_table;

-- 6. Verify all tables have primary keys
SELECT 
    t.table_schema,
    t.table_name,
    CASE
        WHEN COUNT(c.column_name) > 0 THEN 'Has PK'
        ELSE 'No PK'
    END as primary_key_status
FROM information_schema.tables t
LEFT JOIN information_schema.table_constraints tc 
    ON tc.table_schema = t.table_schema
    AND tc.table_name = t.table_name
    AND tc.constraint_type = 'PRIMARY KEY'
LEFT JOIN information_schema.key_column_usage c
    ON c.constraint_name = tc.constraint_name
WHERE t.table_schema = 'public'
AND t.table_type = 'BASE TABLE'
GROUP BY t.table_schema, t.table_name
ORDER BY t.table_name;

-- 7. Verify all RLS policies
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
ORDER BY tablename, policyname;

-- 8. Check for any invalid indexes
SELECT schemaname, tablename, indexname 
FROM pg_indexes 
WHERE indexdef LIKE '%INVALID%';

-- 9. Verify table and index bloat
SELECT
    current_database(),
    schemaname,
    tablename,
    ROUND((CASE WHEN otta=0 THEN 0.0 ELSE sml.relpages::FLOAT/otta END)::NUMERIC,1) AS tbloat,
    CASE WHEN relpages < otta THEN 0 ELSE bs*(sml.relpages-otta)::BIGINT END AS wastedbytes
FROM (
    SELECT
        schemaname, tablename, cc.reltuples, cc.relpages, bs,
        CEIL((cc.reltuples*((datahdr+ma-
            (CASE WHEN datahdr%ma=0 THEN ma ELSE datahdr%ma END))+nullhdr2+4))/(bs-20::FLOAT)) AS otta
    FROM (
        SELECT
            ma,bs,schemaname,tablename,
            (datawidth+(hdr+ma-(CASE WHEN hdr%ma=0 THEN ma ELSE hdr%ma END)))::NUMERIC AS datahdr,
            (maxfracsum*(nullhdr+ma-(CASE WHEN nullhdr%ma=0 THEN ma ELSE nullhdr%ma END))) AS nullhdr2
        FROM (
            SELECT
                schemaname, tablename, hdr, ma, bs,
                SUM((1-null_frac)*avg_width) AS datawidth,
                MAX(null_frac) AS maxfracsum,
                hdr+(
                    SELECT 1+COUNT(*)/8
                    FROM pg_stats s2
                    WHERE null_frac<>0 AND s2.schemaname = s.schemaname AND s2.tablename = s.tablename
                ) AS nullhdr
            FROM pg_stats s, (
                SELECT
                    (SELECT current_setting('block_size')::NUMERIC) AS bs,
                    CASE WHEN SUBSTRING(v,12,3) IN ('8.0','8.1','8.2') THEN 27 ELSE 23 END AS hdr,
                    CASE WHEN v ~ 'mingw32' THEN 8 ELSE 4 END AS ma
                FROM (SELECT version() AS v) AS foo
            ) AS constants
            GROUP BY 1,2,3,4,5
        ) AS foo
    ) AS rs
    JOIN pg_class cc ON cc.relname = rs.tablename
    JOIN pg_namespace nn ON cc.relnamespace = nn.oid AND nn.nspname = rs.schemaname
    WHERE schemaname = 'public'
) AS sml
WHERE sml.relpages - otta > 0
ORDER BY wastedbytes DESC; 