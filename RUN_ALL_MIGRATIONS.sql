/*
  # Complete Migration for Admin Panel
  Run this entire file in Supabase SQL Editor
*/

-- Step 1: Fix SELECT permission (allow admin to view data)
DROP POLICY IF EXISTS "Authenticated users can read all registrations" ON registrations;

CREATE POLICY "Allow public to read registrations"
  ON registrations
  FOR SELECT
  TO anon
  USING (true);

-- Step 2: Allow UPDATE permission (allow admin to edit data)
DROP POLICY IF EXISTS "Allow update registrations" ON registrations;

CREATE POLICY "Allow update registrations"
  ON registrations
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Step 3: Allow DELETE permission (allow admin to delete data)
DROP POLICY IF EXISTS "Allow delete registrations" ON registrations;

CREATE POLICY "Allow delete registrations"
  ON registrations
  FOR DELETE
  TO anon
  USING (true);

-- Note: These policies allow anon role because we're using
-- app-level password protection. For production, use proper Supabase Auth.

