/*
  # Fix Remaining Security and Performance Issues

  1. RLS Policy Optimization
    - Updated "Users can view their own orders" to use constant subquery syntax
    - This prevents auth function re-evaluation per row
    - Changed from: customer_email = (select email from auth.users...)
    - To use auth.jwt() for better performance

  2. Index Management
    - Removed unused `idx_orders_product_id` index that wasn't improving performance
    - Foreign keys still have implicit indexes in PostgreSQL

  3. Security Policy Fix
    - Fixed "Authenticated users can create orders" to validate order data
    - Now requires customer_email to be provided instead of allowing blank checks
    - Prevents creation of orders with invalid/empty email addresses
*/

-- Remove unused index
DROP INDEX IF EXISTS idx_orders_product_id;

-- Optimize the SELECT policy with cached auth value
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;

CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (customer_email = (select auth.jwt()->>'email'));

-- Fix the INSERT policy to require meaningful validation
DROP POLICY IF EXISTS "Authenticated users can create orders" ON orders;

CREATE POLICY "Authenticated users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (customer_email = (select auth.jwt()->>'email'));
