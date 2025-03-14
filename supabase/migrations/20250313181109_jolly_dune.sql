/*
  # Create leads table for form submissions

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `course` (text, required)
      - `message` (text)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for authenticated users to read all leads
    - Add policy for anyone to insert leads
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  course text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow anyone to insert leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);