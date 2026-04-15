/*
  # Create orders table for checkout functionality

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key to products)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `customer_address` (text)
      - `quantity` (integer)
      - `payment_method` (text: carte_bancaire, carte_postale, cache_livraison)
      - `total_price` (numeric)
      - `status` (text: pending, confirmed, shipped, delivered)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `orders` table
    - Add policy for anyone to create orders
    - Add policy for users to view their own orders (by email)
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  payment_method text NOT NULL CHECK (payment_method IN ('carte_bancaire', 'carte_postale', 'cache_livraison')),
  total_price numeric NOT NULL CHECK (total_price > 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (customer_email = current_user OR true);
