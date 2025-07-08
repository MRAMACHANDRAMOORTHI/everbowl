/*
  # Ever Bowl Database Schema

  1. New Tables
    - `users` - User profiles and authentication data
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `address` (text, optional)
      - `favorite_items` (text array, optional)
      - `created_at` (timestamp)
    
    - `menu_items` - Food items and menu management
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text)
      - `price` (numeric)
      - `image` (text, URL)
      - `description` (text)
      - `isAvailable` (boolean)
      - `ingredients` (text array, optional)
      - `nutrition` (jsonb, optional)
      - `created_at` (timestamp)
    
    - `orders` - Order management and tracking
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `item_ids` (text array)
      - `total_amount` (numeric)
      - `status` (text)
      - `delivery_address` (text, optional)
      - `created_at` (timestamp)
    
    - `admin` - Admin user management
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `role` (text)
      - `created_at` (timestamp)
    
    - `feedback` - Customer feedback and reviews
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `message` (text)
      - `rating` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for admin users to manage all data
    - Add policies for public access to menu items
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  address text,
  favorite_items text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('smoothie-bowls', 'cold-press-juices', 'vegan-wraps', 'energy-shots')),
  price numeric NOT NULL CHECK (price > 0),
  image text NOT NULL,
  description text NOT NULL,
  isAvailable boolean DEFAULT true,
  ingredients text[] DEFAULT '{}',
  nutrition jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  item_ids text[] NOT NULL,
  total_amount numeric NOT NULL CHECK (total_amount > 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'delivered', 'cancelled')),
  delivery_address text,
  created_at timestamptz DEFAULT now()
);

-- Create admin table
CREATE TABLE IF NOT EXISTS admin (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at timestamptz DEFAULT now()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  message text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policies for menu_items table
CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Only admins can manage menu items"
  ON menu_items
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin
      WHERE admin.email = auth.jwt() ->> 'email'
    )
  );

-- Policies for orders table
CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin
      WHERE admin.email = auth.jwt() ->> 'email'
    )
  );

-- Policies for admin table
CREATE POLICY "Admins can read admin data"
  ON admin
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin
      WHERE admin.email = auth.jwt() ->> 'email'
    )
  );

-- Policies for feedback table
CREATE POLICY "Users can read all feedback"
  ON feedback
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own feedback"
  ON feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own feedback"
  ON feedback
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all feedback"
  ON feedback
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin
      WHERE admin.email = auth.jwt() ->> 'email'
    )
  );

-- Insert sample menu items
INSERT INTO menu_items (name, category, price, image, description, ingredients, nutrition) VALUES
  (
    'Tropical Paradise Bowl',
    'smoothie-bowls',
    299,
    'https://images.pexels.com/photos/1161547/pexels-photo-1161547.jpeg?auto=compress&cs=tinysrgb&w=800',
    'A refreshing blend of tropical fruits with coconut and chia seeds',
    ARRAY['Mango', 'Pineapple', 'Coconut', 'Chia seeds', 'Banana', 'Granola'],
    '{"calories": 320, "protein": 8, "carbs": 45, "fat": 12}'::jsonb
  ),
  (
    'Green Power Smoothie',
    'cold-press-juices',
    199,
    'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Nutrient-packed green smoothie with spinach, kale, and apple',
    ARRAY['Spinach', 'Kale', 'Apple', 'Ginger', 'Lemon', 'Cucumber'],
    '{"calories": 150, "protein": 5, "carbs": 25, "fat": 2}'::jsonb
  ),
  (
    'Mediterranean Wrap',
    'vegan-wraps',
    349,
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Fresh vegetables wrapped in whole grain tortilla with hummus',
    ARRAY['Hummus', 'Spinach', 'Tomatoes', 'Cucumber', 'Red onion', 'Tahini'],
    '{"calories": 280, "protein": 12, "carbs": 35, "fat": 8}'::jsonb
  ),
  (
    'Immunity Booster',
    'energy-shots',
    149,
    'https://images.pexels.com/photos/1435740/pexels-photo-1435740.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Powerful immunity shot with turmeric, ginger, and lemon',
    ARRAY['Turmeric', 'Ginger', 'Lemon', 'Honey', 'Black pepper'],
    '{"calories": 45, "protein": 1, "carbs": 10, "fat": 0}'::jsonb
  ),
  (
    'Berry Bliss Bowl',
    'smoothie-bowls',
    279,
    'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Antioxidant-rich berry bowl with almonds and honey',
    ARRAY['Blueberries', 'Strawberries', 'Raspberries', 'Almonds', 'Honey', 'Oats'],
    '{"calories": 290, "protein": 10, "carbs": 42, "fat": 9}'::jsonb
  ),
  (
    'Detox Green Juice',
    'cold-press-juices',
    219,
    'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Cleansing green juice with celery, cucumber, and mint',
    ARRAY['Celery', 'Cucumber', 'Mint', 'Parsley', 'Lemon', 'Ginger'],
    '{"calories": 120, "protein": 3, "carbs": 20, "fat": 1}'::jsonb
  );

-- Insert sample admin user
INSERT INTO admin (email, role) VALUES
  ('admin@everbowl.com', 'super_admin');