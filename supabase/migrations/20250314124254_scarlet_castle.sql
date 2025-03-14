/*
  # Create leads and blog posts tables

  1. Tables
    - `leads` for storing form submissions
    - `blog_posts` for storing blog content

  2. Security
    - Enable RLS on both tables
    - Add appropriate policies for access control
*/

-- Create leads table if it doesn't exist
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  course text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies for leads
CREATE POLICY "Allow anyone to insert leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  excerpt text NOT NULL,
  author text NOT NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
CREATE POLICY "Allow public read access to blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add sample blog posts if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'life-at-itm-skills-university') THEN
    INSERT INTO blog_posts (title, slug, excerpt, content, author) VALUES
    (
      'Life at ITM Skills University: A Student''s Perspective',
      'life-at-itm-skills-university',
      'Get an inside look at what it''s like to study at ITM Skills University from a current student''s perspective.',
      'Content about campus life, academics, and student experiences...',
      'Current ITM Student'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'itm-skills-university-programs-guide-2024') THEN
    INSERT INTO blog_posts (title, slug, excerpt, content, author) VALUES
    (
      'Guide to ITM Skills University Programs 2024',
      'itm-skills-university-programs-guide-2024',
      'Comprehensive guide to all programs offered at ITM Skills University for the 2024 academic year.',
      'Detailed information about various programs...',
      'Student Council Member'
    );
  END IF;
END $$;