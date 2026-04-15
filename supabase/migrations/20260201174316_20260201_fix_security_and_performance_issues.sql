/*
  # Fix Security and Performance Issues

  1. Performance Issues Fixed
    - Added index on `orders.product_id` foreign key for optimal query performance
    
  2. RLS Optimization
    - Updated products table RLS policies to use subquery syntax for auth functions
    - This prevents re-evaluation of auth.uid() for each row during queries
    - Policies affected:
      - "Authenticated users can create products"
      - "Product creator can update their products"
      - "Product creator can delete their products"

  3. Security Issues Fixed
    - Fixed "Anyone can create orders" policy to require authentication
    - Fixed "Users can view their own orders" policy to use proper auth check instead of OR true
    - Both policies now properly restrict access

  4. Note on Auth DB Connection Strategy
    - This requires manual configuration in Supabase dashboard
    - Go to Project Settings > Database > Connection Pooling
    - Switch from fixed connection limit to percentage-based allocation
    - This is not configurable via SQL migrations
*/

-- Add index to foreign key for performance
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);

-- Drop old suboptimal RLS policies from products table
DROP POLICY IF EXISTS "Authenticated users can create products" ON products;
DROP POLICY IF EXISTS "Product creator can update their products" ON products;
DROP POLICY IF EXISTS "Product creator can delete their products" ON products;

-- Recreate RLS policies with optimized subquery syntax
CREATE POLICY "Authenticated users can create products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Product creator can update their products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Product creator can delete their products"
  ON products
  FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Fix overly permissive RLS policies on orders table
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;

-- Create restrictive policies for orders
CREATE POLICY "Authenticated users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (customer_email = (select email from auth.users where id = auth.uid()));
