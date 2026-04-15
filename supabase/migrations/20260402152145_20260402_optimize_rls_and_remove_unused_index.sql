/*
  # Optimize RLS Performance and Remove Unused Index

  1. RLS Policy Optimization
    - Fix "Users can view their own orders" policy to use (SELECT auth.jwt()) pattern
    - Fix "Authenticated users can create orders" policy to use (SELECT auth.jwt()) pattern
    - These changes prevent re-evaluation of auth functions for each row, improving query performance at scale

  2. Remove Unused Index
    - Drop unused `idx_orders_product_id` index that is not being utilized by the query planner
    
  3. Security
    - All RLS policies remain restrictive and properly secured
    - No changes to access control, only performance optimization
*/

-- Recreate SELECT policy with optimized auth function call
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;

CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (customer_email = (SELECT auth.jwt()->>'email'));

-- Recreate INSERT policy with optimized auth function call
DROP POLICY IF EXISTS "Authenticated users can create orders" ON orders;

CREATE POLICY "Authenticated users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (
    customer_email = (SELECT auth.jwt()->>'email')
    AND EXISTS (SELECT 1 FROM products WHERE id = product_id)
  );

-- Remove unused index
DROP INDEX IF EXISTS idx_orders_product_id;
