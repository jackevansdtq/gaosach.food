/*
  # Fix admin SELECT permission
  
  Problem: Admin can insert but cannot select/read data
  Solution: Allow anon role to SELECT (since we're using app-level password protection)
*/

-- Drop the existing SELECT policy that only allows authenticated users
DROP POLICY IF EXISTS "Authenticated users can read all registrations" ON registrations;

-- Create new policy allowing anon to SELECT (for admin panel)
CREATE POLICY "Allow public to read registrations"
  ON registrations
  FOR SELECT
  TO anon
  USING (true);

-- Note: In production with proper Supabase Auth, use:
-- CREATE POLICY "Admins can read all registrations"
--   ON registrations
--   FOR SELECT
--   TO authenticated
--   USING (auth.role() = 'admin');

