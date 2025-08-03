-- Migration: Rename 'users' table to 'agents' and remove 'hotel_id' column
-- Run these commands in your Supabase SQL editor or psql

-- Step 1: Remove the hotel_id column from users table
ALTER TABLE users DROP COLUMN IF EXISTS hotel_id;

-- Step 2: Rename the users table to agents
ALTER TABLE users RENAME TO agents;

-- Step 3: Update any foreign key references (if they exist)
-- Note: This will update the foreign key constraint names
-- The actual foreign key relationships will remain intact

-- Step 4: Update any indexes that reference the old table name
-- (This will automatically happen with the table rename)

-- Step 5: Update any Row Level Security (RLS) policies if they exist
-- You may need to manually update policy names that reference 'users'

-- Verification queries:
-- Check that the table was renamed successfully:
-- SELECT * FROM agents LIMIT 5;

-- Check that hotel_id column was removed:
-- \d agents

-- Check foreign key constraints:
-- SELECT conname, conrelid::regclass, confrelid::regclass 
-- FROM pg_constraint 
-- WHERE confrelid = 'agents'::regclass OR conrelid = 'agents'::regclass;
