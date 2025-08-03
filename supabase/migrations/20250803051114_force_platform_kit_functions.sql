-- PostgreSQL Migration for Supabase
-- Force deploy platform kit functions
-- This migration ensures all functions are properly deployed

-- Simple test function to verify deployment
CREATE OR REPLACE FUNCTION test_platform_kit()
RETURNS TABLE (
  function_name text,
  function_exists boolean
) LANGUAGE sql AS $$
  SELECT 
    'get_schema_tables' as function_name,
    EXISTS(SELECT 1 FROM pg_proc WHERE proname = 'get_schema_tables') as function_exists
  UNION ALL
  SELECT 
    'get_tables_fallback' as function_name,
    EXISTS(SELECT 1 FROM pg_proc WHERE proname = 'get_tables_fallback') as function_exists;
$$;

-- Recreate the main function
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