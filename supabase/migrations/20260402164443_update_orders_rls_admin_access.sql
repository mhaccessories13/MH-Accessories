/*
  # Update Orders RLS - Admin Only Visibility

  1. Changes
    - Remove existing order RLS policies
    - Add new policies where:
      - Admin (you) can see ALL orders
      - Customers can only see and manage their own orders
    - Uses a designated admin user ID to determine admin access

  2. Security
    - Admin policies check against a specific user ID
    - Customer policies remain unchanged for their own data
    - No unauthorized access to other customers' orders
*/

DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;
DROP POLICY IF EXISTS "Users can delete their own orders" ON orders;

CREATE POLICY "Admin can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    auth.uid() = '00000000-0000-0000-0000-000000000000' OR 
    auth.uid() = user_id
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

CREATE POLICY "Customers can create their own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Customers can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Customers can update their own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Customers can delete their own orders"
  ON orders FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
