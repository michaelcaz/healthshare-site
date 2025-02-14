-- Get complete table structure for coverage_details
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
    AND table_name = 'coverage_details'
ORDER BY 
    ordinal_position; 