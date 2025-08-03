-- Migration: Setup Platform Kit Functions
-- SQL functions to support the Supabase Platform Kit
-- These functions provide metadata access for the database management dashboard

-- Function to get schema tables (primary method)
CREATE OR REPLACE FUNCTION get_schema_tables(schema_name text DEFAULT 'public')
RETURNS TABLE (
  id int,
  schema text,
  name text,
  rls_enabled boolean,
  rls_forced boolean,
  replica_identity text,
  bytes bigint,
  size text,
  live_rows_estimate bigint,
  dead_rows_estimate bigint,
  comment text
) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT 
    c.oid::int as id,
    n.nspname::text as schema,
    c.relname::text as name,
    c.relrowsecurity::boolean as rls_enabled,
    c.relforcerowsecurity::boolean as rls_forced,
    CASE c.relreplident
      WHEN 'd' THEN 'DEFAULT'
      WHEN 'n' THEN 'NOTHING'
      WHEN 'f' THEN 'FULL'
      WHEN 'i' THEN 'INDEX'
    END::text as replica_identity,
    pg_total_relation_size(c.oid) as bytes,
    pg_size_pretty(pg_total_relation_size(c.oid))::text as size,
    COALESCE(s.n_tup_ins + s.n_tup_upd, 0) as live_rows_estimate,
    COALESCE(s.n_tup_del, 0) as dead_rows_estimate,
    obj_description(c.oid, 'pg_class')::text as comment
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  LEFT JOIN pg_stat_user_tables s ON s.relid = c.oid
  WHERE c.relkind = 'r' 
    AND n.nspname = $1
    AND n.nspname NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
  ORDER BY c.relname;
$$;

-- Fallback function using information_schema (if the above fails)
CREATE OR REPLACE FUNCTION get_tables_fallback(schema_name text DEFAULT 'public')
RETURNS TABLE (
  id int,
  schema text,
  name text,
  rls_enabled boolean,
  rls_forced boolean,
  replica_identity text,
  bytes bigint,
  size text,
  live_rows_estimate bigint,
  dead_rows_estimate bigint,
  comment text
) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT 
    row_number() OVER ()::int as id,
    t.table_schema::text as schema,
    t.table_name::text as name,
    false::boolean as rls_enabled, -- Default values for fallback
    false::boolean as rls_forced,
    'DEFAULT'::text as replica_identity,
    0::bigint as bytes,
    '0 bytes'::text as size,
    0::bigint as live_rows_estimate,
    0::bigint as dead_rows_estimate,
    null::text as comment
  FROM information_schema.tables t
  WHERE t.table_schema = $1
    AND t.table_type = 'BASE TABLE'
  ORDER BY t.table_name;
$$;

-- Function to get available extensions
CREATE OR REPLACE FUNCTION get_available_extensions()
RETURNS TABLE (
  name text,
  schema text,
  default_version text,
  installed_version text,
  comment text
) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT 
    e.name::text,
    null::text as schema,
    e.default_version::text,
    e.installed_version::text,
    e.comment::text
  FROM pg_available_extensions e
  ORDER BY e.name;
$$;

-- Fallback function to get installed extensions
CREATE OR REPLACE FUNCTION get_installed_extensions()
RETURNS TABLE (
  name text,
  schema text,
  default_version text,
  installed_version text,
  comment text
) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT 
    e.extname::text as name,
    n.nspname::text as schema,
    e.extversion::text as default_version,
    e.extversion::text as installed_version,
    'Installed extension'::text as comment
  FROM pg_extension e
  JOIN pg_namespace n ON n.oid = e.extnamespace
  ORDER BY e.extname;
$$;

-- Function to get table columns with metadata
CREATE OR REPLACE FUNCTION get_table_columns(table_name text, table_schema text DEFAULT 'public')
RETURNS TABLE (
  table_id int,
  schema text,
  "table" text,
  id text,
  ordinal_position int,
  name text,
  default_value text,
  data_type text,
  format text,
  is_identity boolean,
  identity_generation text,
  is_generated boolean,
  is_nullable boolean,
  is_updatable boolean,
  is_unique boolean,
  enums text[],
  "check" text,
  "comment" text
) LANGUAGE sql AS $$
  SELECT 
    c.table_catalog::int as table_id,
    c.table_schema::text as schema,
    c.table_name::text as "table",
    (c.table_catalog || '.' || c.ordinal_position)::text as id,
    c.ordinal_position::int,
    c.column_name::text as name,
    c.column_default::text as default_value,
    c.data_type::text,
    CASE 
      WHEN c.data_type = 'USER-DEFINED' THEN c.udt_name
      ELSE c.data_type
    END::text as format,
    (c.is_identity = 'YES')::boolean as is_identity,
    c.identity_generation::text,
    (c.is_generated = 'ALWAYS')::boolean as is_generated,
    (c.is_nullable = 'YES')::boolean as is_nullable,
    (c.is_updatable = 'YES')::boolean as is_updatable,
    false::boolean as is_unique, -- Simplified for now
    ARRAY[]::text[] as enums, -- Simplified for now
    null::text as "check",
    null::text as "comment"
  FROM information_schema.columns c
  WHERE c.table_name = $1 AND c.table_schema = $2
  ORDER BY c.ordinal_position;
$$;

-- Function to get table relationships
CREATE OR REPLACE FUNCTION get_table_relationships(table_name text, table_schema text DEFAULT 'public')
RETURNS TABLE (
  id int,
  constraint_name text,
  source_schema text,
  source_table_name text,
  source_column_name text,
  target_table_schema text,
  target_table_name text,
  target_column_name text
) LANGUAGE sql AS $$
  SELECT DISTINCT
    row_number() OVER ()::int as id,
    tc.constraint_name::text,
    tc.table_schema::text as source_schema,
    tc.table_name::text as source_table_name,
    kcu.column_name::text as source_column_name,
    ccu.table_schema::text as target_table_schema,
    ccu.table_name::text as target_table_name,
    ccu.column_name::text as target_column_name
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
  WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_name = $1
    AND tc.table_schema = $2;
$$;

-- Function to enable RLS on a table
CREATE OR REPLACE FUNCTION enable_rls(table_name text, table_schema text DEFAULT 'public')
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  EXECUTE format('ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY', table_schema, table_name);
  RETURN true;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to enable RLS: %', SQLERRM;
END;
$$;

-- Function to disable RLS on a table
CREATE OR REPLACE FUNCTION disable_rls(table_name text, table_schema text DEFAULT 'public')
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  EXECUTE format('ALTER TABLE %I.%I DISABLE ROW LEVEL SECURITY', table_schema, table_name);
  RETURN true;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to disable RLS: %', SQLERRM;
END;
$$;

-- Function to create RLS policy
CREATE OR REPLACE FUNCTION create_rls_policy(
  table_name text,
  table_schema text,
  policy_name text,
  policy_operation text,
  policy_definition text
)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  EXECUTE format(
    'CREATE POLICY %I ON %I.%I FOR %s USING (%s)',
    policy_name,
    table_schema,
    table_name,
    policy_operation,
    policy_definition
  );
  RETURN true;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to create policy: %', SQLERRM;
END;
$$;

-- Function to enable extension
CREATE OR REPLACE FUNCTION enable_extension(extension_name text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  EXECUTE format('CREATE EXTENSION IF NOT EXISTS %I', extension_name);
  RETURN true;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to enable extension: %', SQLERRM;
END;
$$;

-- Function to get table statistics
CREATE OR REPLACE FUNCTION get_table_stats(table_name text, table_schema text DEFAULT 'public')
RETURNS TABLE (
  table_size text,
  row_count bigint,
  total_size text
) LANGUAGE sql AS $$
  SELECT 
    pg_size_pretty(pg_total_relation_size(c.oid))::text as table_size,
    (SELECT n_tup_ins + n_tup_upd + n_tup_del FROM pg_stat_user_tables WHERE relname = $1 AND schemaname = $2) as row_count,
    pg_size_pretty(pg_database_size(current_database()))::text as total_size
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE c.relname = $1 AND n.nspname = $2 AND c.relkind = 'r';
$$;

-- Function to get database size
CREATE OR REPLACE FUNCTION get_database_size()
RETURNS TABLE (
  database_name text,
  size_bytes bigint,
  size_pretty text
) LANGUAGE sql AS $$
  SELECT 
    current_database()::text,
    pg_database_size(current_database()),
    pg_size_pretty(pg_database_size(current_database()))::text;
$$;