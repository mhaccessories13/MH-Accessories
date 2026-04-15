/*
  # Add user_id column to products

  1. Changes
    - Add user_id column to track product creator
    
  2. Notes
    - This is a prerequisite for proper RLS policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE products ADD COLUMN user_id uuid;
  END IF;
END $$;
