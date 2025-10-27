/*
  # Create registrations table for ST25 rice orders

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key) - Unique identifier for each registration
      - `name` (text) - Customer full name
      - `contact` (text) - Customer phone number
      - `address` (text) - Delivery address
      - `rice_type` (text) - Selected rice product type
      - `monthly_consumption` (text) - Monthly rice consumption in kg
      - `project_support` (text) - Optional donation amount to support farmers
      - `created_at` (timestamptz) - Registration timestamp
      
  2. Security
    - Enable RLS on `registrations` table
    - Add policy for public insert (allows anyone to submit registration)
    - Add policy for authenticated users to read all registrations (admin access)
    
  3. Notes
    - This table stores customer registration data for rice orders
    - Public can insert but cannot read their own data (prevents abuse)
    - Only authenticated users (admins) can view registrations
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact text NOT NULL,
  address text NOT NULL,
  rice_type text NOT NULL,
  monthly_consumption text NOT NULL,
  project_support text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert registrations"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (true);
