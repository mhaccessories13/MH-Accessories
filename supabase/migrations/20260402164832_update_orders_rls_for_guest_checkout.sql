/*
  # Update Orders RLS for Guest Checkout

  1. Changes
    - Drop existing RLS policies
    - Add new policies that allow:
      - Admin (specified user ID) to view, update, and delete all orders
      - Authenticated users to manage their own orders (optional)
      - Anyone to insert orders (guest checkout enabled)

  2. Security
    - Admin user ID check for full access
    - User ID check for authenticated users accessing their own orders
    - Guest customers can place orders without authentication
*/

DROP POLICY IF EXISTS "Admin can view all orders" ON orders;
DROP POLICY IF EXISTS "Admin can update all orders" ON orders;
DROP POLICY IF EXISTS "Admin can delete all orders" ON orders;
DROP POLICY IF EXISTS "Customers can create their own orders" ON orders;
DROP POLICY IF EXISTS "Customers can view their own orders" ON orders;
DROP POLICY IF EXISTS "Customers can update their own orders" ON orders;
DROP POLICY IF EXISTS "Customers can delete their own orders" ON orders;

CREATE POLICY "Admin can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    auth.uid() = '00000000-0000-0000-0000-000000000000' OR 
    (user_id IS NOT NULL AND auth.uid() = user_id)
  );

CREATE POLICY "Admin can update all orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = '00000000-0000-0000-0000-000000000000')
  WITH CHECK (auth.uid() = '00000000-0000-0000-0000-000000000000');

CREATE POLICY "Admin can delete all orders"
  ON orders FOR DELETE
  TO authenticated
  USING (auth.uid() = '00000000-0000-0000-0000-000000000000');

CREATE POLICY "Anyone can place an order"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (user_id IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (user_id IS NOT NULL AND auth.uid() = user_id)
  WITH CHECK (user_id IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their own orders"
  ON orders FOR DELETE
  TO authenticated
  USING (user_id IS NOT NULL AND auth.uid() = user_id);
