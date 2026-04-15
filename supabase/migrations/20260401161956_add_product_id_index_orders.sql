/*
  # Add Covering Index for Foreign Key

  1. Index Addition
    - Add idx_orders_product_id index on product_id column
    - Improves query performance for foreign key lookups
    - Prevents suboptimal performance when filtering or joining on product_id
*/

CREATE INDEX IF NOT EXISTS idx_orders_product_id ON public.orders(product_id);
