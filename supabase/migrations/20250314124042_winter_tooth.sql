/*
  # Add blog posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (text)
      - `excerpt` (text)
      - `author` (text)
      - `published_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on blog_posts table
    - Add policies for public read access
    - Add policies for authenticated write access

  Note: Email notifications have been removed to prevent connection issues
*/

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

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow public read access to blog posts" ON blog_posts;
    DROP POLICY IF EXISTS "Allow authenticated users to manage blog posts" ON blog_posts;
EXCEPTION
    WHEN undefined_object THEN 
        NULL;
END $$;

-- Create policies
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