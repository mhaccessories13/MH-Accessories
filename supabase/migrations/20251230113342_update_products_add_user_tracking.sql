/*
  # Add user tracking to products table

  1. Changes
    - Add `user_id` column to track product creator
    - Update RLS policies to restrict edit/delete to product creator
    
  2. Security
    - Restrict INSERT to authenticated users
    - Restrict UPDATE and DELETE to product creator only
    - Keep SELECT public for storefront
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

DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

CREATE POLICY "Authenticated users can create products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Product creator can update their products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Product creator can delete their products"
  ON products
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());