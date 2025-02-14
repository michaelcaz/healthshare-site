\d+ providers;

-- Get complete table structure with null constraints
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public' 
    AND table_name = 'providers'
ORDER BY 
    ordinal_position;

-- Get constraints
SELECT
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name
FROM
    information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
WHERE
    tc.table_schema = 'public'
    AND tc.table_name = 'providers'; 