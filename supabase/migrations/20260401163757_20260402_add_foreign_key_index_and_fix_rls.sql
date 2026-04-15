/*
  # Add Foreign Key Index and Fix RLS Policies

  1. Foreign Key Indexing
    - Add index on `orders.product_id` to improve query performance
    - Foreign keys benefit from covering indexes for better join performance
    - Prevents sequential scans on large datasets
  
  2. RLS Policy Optimization
    - Ensure "Users can view their own orders" uses optimal pattern
    - Ensure "Authenticated users can create orders" uses optimal pattern
    - Both policies must use (SELECT auth.jwt()->>'email') to evaluate once per query
    
  3. Security
    - All RLS policies remain restrictive and properly secured
    - SELECT policy restricts to user's own orders
    - INSERT policy restricts to user's own email with valid products
*/

-- Add index on foreign key for better performance
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);

-- Drop and recreate SELECT policy to ensure optimal pattern
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;

CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (customer_email = (SELECT auth.jwt()->>'email'));

-- Drop and recreate INSERT policy to ensure optimal pattern
DROP POLICY IF EXISTS "Authenticated users can create orders" ON orders;

CREATE POLICY "Authenticated users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (
    customer_email = (SELECT auth.jwt()->>'email')
    AND EXISTS (SELECT 1 FROM products WHERE id = product_id)
  );
