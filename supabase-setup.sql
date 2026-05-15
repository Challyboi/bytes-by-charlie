-- Run this in your Supabase SQL editor (supabase.com → your project → SQL Editor)

CREATE TABLE IF NOT EXISTS comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug text NOT NULL,
  user_id text NOT NULL,
  user_name text NOT NULL,
  user_image text,
  body text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Index for fast per-post queries
CREATE INDEX IF NOT EXISTS comments_post_slug_idx ON comments (post_slug, created_at);

-- Enable Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Anyone can read comments
CREATE POLICY "Public read" ON comments FOR SELECT USING (true);

-- Anyone can insert (we verify auth in the API route via Clerk)
CREATE POLICY "Public insert" ON comments FOR INSERT WITH CHECK (true);

-- Anyone can delete (we verify user ownership in the API route)
CREATE POLICY "Public delete" ON comments FOR DELETE USING (true);
