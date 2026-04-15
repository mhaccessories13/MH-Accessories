/*
  # Fix RLS Policies - Security and Performance

  1. Security Fixes
    - Replace auth.uid() with (select auth.uid()) in all policies for better performance
    - Fix "Always True" policies by adding proper ownership checks
    - Consolidate duplicate permissive policies
    
  2. Products Table
    - Anyone can view products (SELECT)
    - Only authenticated users can create products (with user_id ownership)
    - Only product owners can update/delete their products
    
  3. Orders Table
    - Anyone can place orders (INSERT) for guest checkout
    - Authenticated users can view/update/delete their own orders
    - Admin users (product creators) can view/update/delete orders for their products
    - Use (select auth.uid()) for performance
    
  4. Performance
    - Drop unused indexes
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_orders_user_id;
DROP INDEX IF EXISTS idx_orders_created_at;
DROP INDEX IF EXISTS idx_orders_product_id;

-- Fix products table policies
DROP POLICY IF EXISTS "Authenticated users can create products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;
DROP POLICY IF EXISTS "Product creator can update their products" ON products;
DROP POLICY IF EXISTS "Product creator can delete their products" ON products;
DROP POLICY IF EXISTS "Anyone can view products" ON products;

-- Products: Anyone can view
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

-- Products: Only authenticated users can create products
CREATE POLICY "Authenticated users can create products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

-- Products: Only product owner can update
CREATE POLICY "Users can update own products"
  ON products FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- Products: Only product owner can delete
CREATE POLICY "Users can delete own products"
  ON products FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Fix orders table policies - drop all existing ones
DROP POLICY IF EXISTS "Admin can view all orders" ON orders;
DROP POLICY IF EXISTS "Admin can update all orders" ON orders;
DROP POLICY IF EXISTS "Admin can delete all orders" ON orders;
DROP POLICY IF EXISTS "Anyone can place an order" ON orders;
DROP POLICY IF EXISTS "Authenticated users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can update their own orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can delete their own orders" ON orders;

-- Orders: Anyone can insert orders (guest checkout support)
CREATE POLICY "Anyone can place an order"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Orders: Authenticated users can view their own orders
CREATE POLICY "Authenticated users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Orders: Admin users (product creators) can view orders for their products
CREATE POLICY "Admin can view orders for their products"
  ON orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = orders.product_id
      AND products.user_id = (select auth.uid())
    )
  );

-- Orders: Authenticated users can update their own orders
CREATE POLICY "Authenticated users can update their own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- Orders: Admin users can update orders for their products
CREATE POLICY "Admin can update orders for their products"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = orders.product_id
      AND products.user_id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = orders.product_id
      AND products.user_id = (select auth.uid())
    )
  );

-- Orders: Authenticated users can delete their own orders
CREATE POLICY "Authenticated users can delete their own orders"
  ON orders FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Orders: Admin users can delete orders for their products
CREATE POLICY "Admin can delete orders for their products"
  ON orders FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = orders.product_id
      AND products.user_id = (select auth.uid())
    )
  );
