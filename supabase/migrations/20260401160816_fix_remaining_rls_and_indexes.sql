/*
  # Fix Remaining Security Issues

  1. Fix INSERT RLS Policy
    - Replace "Authenticated users can create orders" policy with a restrictive policy
    - Prevents creation of orders by restricting to product_id matching available products
    - Requires valid product_id and email matching
  
  2. Drop Unused Index
    - Remove idx_orders_product_id index as it's not being utilized
    - Will be added back if needed based on query patterns
  
  Security improvements:
    - INSERT policy no longer allows unrestricted access
    - Only authenticated users can create orders with valid products
    - Proper data validation through RLS
*/

DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;

CREATE POLICY "Authenticated users can create orders"
  ON public.orders
  FOR INSERT
  TO authenticated
  WITH CHECK (
    customer_email = (SELECT auth.jwt()->>'email')
    AND EXISTS (SELECT 1 FROM products WHERE id = product_id)
  );

DROP INDEX IF EXISTS idx_orders_product_id;
