\dt public.*;

-- List all tables in public schema
SELECT 
    table_name,
    table_type
FROM 
    information_schema.tables 
WHERE 
    table_schema = 'public'
    AND table_type = 'BASE TABLE';

-- Check structure of each table
SELECT 
    table_name, 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public'
ORDER BY 
    table_name, 
    ordinal_position; 