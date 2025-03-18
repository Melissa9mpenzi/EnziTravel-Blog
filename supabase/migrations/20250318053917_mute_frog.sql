/*
  # Create blogs table

  1. New Tables
    - `blogs`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, required)
      - `location` (text, required)
      - `image_url` (text, required)
      - `created_at` (timestamp with time zone, default: now())
      - `updated_at` (timestamp with time zone, default: now())
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `blogs` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  location text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view blogs"
  ON blogs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create blogs"
  ON blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own blogs"
  ON blogs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own blogs"
  ON blogs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE
  ON blogs
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();