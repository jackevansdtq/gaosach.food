/*
  # Update RLS policies for admin management
  
  1. Add UPDATE policy for admin to edit registrations
  2. Add DELETE policy for admin to delete registrations
  3. Note: Currently using anon role with password protection in app
     For production, should use proper Supabase Auth
*/

-- Allow UPDATE for all users (protected by app-level password)
DROP POLICY IF EXISTS "Allow update registrations" ON registrations;
CREATE POLICY "Allow update registrations"
  ON registrations
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow DELETE for all users (protected by app-level password)
DROP POLICY IF EXISTS "Allow delete registrations" ON registrations;
CREATE POLICY "Allow delete registrations"
  ON registrations
  FOR DELETE
  TO anon
  USING (true);

-- Note: In production, replace anon with authenticated and proper role check
-- Example production version:
-- CREATE POLICY "Admins can update registrations"
--   ON registrations
--   FOR UPDATE
--   TO authenticated
--   USING (auth.role() = 'admin');

