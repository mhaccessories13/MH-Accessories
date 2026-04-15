/*
  # Add stock status to products

  1. Changes
    - Add `in_stock` boolean column to products table
    - Default value is true (in stock)
    - Allows admin to toggle stock status for each product
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'in_stock'
  ) THEN
    ALTER TABLE products ADD COLUMN in_stock boolean DEFAULT true NOT NULL;
  END IF;
END $$;
