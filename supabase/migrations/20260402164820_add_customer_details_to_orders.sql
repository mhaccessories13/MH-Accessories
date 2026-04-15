/*
  # Add Customer Details to Orders Table

  1. New Columns
    - `customer_name` (text) - Customer's full name
    - `customer_email` (text) - Customer's email address
    - `customer_phone` (text) - Customer's phone number
    - `customer_address` (text) - Customer's delivery address
    - `payment_method` (text) - Payment method used

  2. Changes
    - Make `user_id` nullable since customers may check out without authentication
    - Add customer contact and delivery information columns
*/

ALTER TABLE orders
ADD COLUMN IF NOT EXISTS customer_name text,
ADD COLUMN IF NOT EXISTS customer_email text,
ADD COLUMN IF NOT EXISTS customer_phone text,
ADD COLUMN IF NOT EXISTS customer_address text,
ADD COLUMN IF NOT EXISTS payment_method text DEFAULT 'cash_on_delivery';

ALTER TABLE orders
ALTER COLUMN user_id DROP NOT NULL;
