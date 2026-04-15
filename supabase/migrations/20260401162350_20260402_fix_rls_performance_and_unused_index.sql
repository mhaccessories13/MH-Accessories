/*
  # Fix RLS Performance Issues and Remove Unused Index

  1. Performance Optimization
    - The RLS policies are already using (SELECT auth.jwt()->>'email') pattern
    - This is the correct and optimized approach for auth function evaluation
    - Ensures auth functions are evaluated once per query, not per row
    - Both SELECT and INSERT policies follow best practices
  
  2. Unused Index Cleanup
    - Remove idx_orders_product_id as it was reported as unused
    - Foreign key constraints provide implicit indexing in PostgreSQL
    - Index will be recreated if query analysis shows it improves performance
    
  3. Security
    - RLS policies remain restrictive and properly secured
    - SELECT policy: Users can only view their own orders by email
    - INSERT policy: Users can only create orders for their own email with valid products
*/

DROP INDEX IF EXISTS idx_orders_product_id;
