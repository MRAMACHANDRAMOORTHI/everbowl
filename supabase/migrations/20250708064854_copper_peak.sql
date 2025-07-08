/*
  # Add Sample Menu Items

  1. New Data
    - Sample menu items for all categories
    - Realistic prices and descriptions
    - High-quality food images from Pexels

  2. Categories
    - smoothie-bowls
    - cold-press-juices  
    - vegan-wraps
    - energy-shots
*/

-- Insert sample menu items
INSERT INTO menu_items (name, category, price, image, description, isavailable, ingredients, nutrition) VALUES
-- Smoothie Bowls
('Tropical Paradise Bowl', 'smoothie-bowls', 299, 'https://images.pexels.com/photos/1161547/pexels-photo-1161547.jpeg?auto=compress&cs=tinysrgb&w=800', 'A vibrant blend of mango, pineapple, and coconut topped with fresh berries, granola, and chia seeds', true, ARRAY['mango', 'pineapple', 'coconut', 'berries', 'granola', 'chia seeds'], '{"calories": 320, "protein": 8, "carbs": 65, "fat": 12}'),

('Acai Power Bowl', 'smoothie-bowls', 349, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800', 'Antioxidant-rich acai blended with banana and topped with fresh fruits, nuts, and coconut flakes', true, ARRAY['acai', 'banana', 'strawberries', 'blueberries', 'almonds', 'coconut'], '{"calories": 380, "protein": 12, "carbs": 58, "fat": 18}'),

('Green Goddess Bowl', 'smoothie-bowls', 329, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', 'Spinach and avocado smoothie base topped with kiwi, green apple, and hemp seeds', true, ARRAY['spinach', 'avocado', 'kiwi', 'green apple', 'hemp seeds', 'spirulina'], '{"calories": 290, "protein": 10, "carbs": 45, "fat": 15}'),

('Chocolate Protein Bowl', 'smoothie-bowls', 379, 'https://images.pexels.com/photos/1435740/pexels-photo-1435740.jpeg?auto=compress&cs=tinysrgb&w=800', 'Rich cacao and banana smoothie topped with protein granola, dark chocolate chips, and almond butter', true, ARRAY['cacao', 'banana', 'protein powder', 'granola', 'dark chocolate', 'almond butter'], '{"calories": 420, "protein": 25, "carbs": 52, "fat": 20}'),

-- Cold Press Juices
('Green Detox Juice', 'cold-press-juices', 199, 'https://images.pexels.com/photos/1435740/pexels-photo-1435740.jpeg?auto=compress&cs=tinysrgb&w=800', 'Refreshing blend of kale, spinach, cucumber, green apple, and lemon', true, ARRAY['kale', 'spinach', 'cucumber', 'green apple', 'lemon', 'ginger'], '{"calories": 85, "protein": 3, "carbs": 20, "fat": 1}'),

('Immunity Booster', 'cold-press-juices', 229, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800', 'Powerful combination of orange, carrot, ginger, and turmeric to boost your immune system', true, ARRAY['orange', 'carrot', 'ginger', 'turmeric', 'lemon'], '{"calories": 120, "protein": 2, "carbs": 28, "fat": 0}'),

('Beetroot Energizer', 'cold-press-juices', 219, 'https://images.pexels.com/photos/1161547/pexels-photo-1161547.jpeg?auto=compress&cs=tinysrgb&w=800', 'Earthy beetroot with apple, carrot, and ginger for natural energy', true, ARRAY['beetroot', 'apple', 'carrot', 'ginger', 'lemon'], '{"calories": 110, "protein": 3, "carbs": 25, "fat": 1}'),

('Tropical Sunrise', 'cold-press-juices', 249, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', 'Exotic blend of pineapple, mango, orange, and coconut water', true, ARRAY['pineapple', 'mango', 'orange', 'coconut water', 'lime'], '{"calories": 140, "protein": 1, "carbs": 35, "fat": 0}'),

-- Vegan Wraps
('Mediterranean Wrap', 'vegan-wraps', 349, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', 'Fresh vegetables, hummus, olives, and tahini wrapped in a whole wheat tortilla', true, ARRAY['hummus', 'cucumber', 'tomato', 'lettuce', 'olives', 'tahini', 'whole wheat tortilla'], '{"calories": 380, "protein": 15, "carbs": 45, "fat": 18}'),

('Avocado Power Wrap', 'vegan-wraps', 379, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800', 'Creamy avocado with quinoa, black beans, and fresh vegetables', true, ARRAY['avocado', 'quinoa', 'black beans', 'spinach', 'tomato', 'red onion', 'lime'], '{"calories": 420, "protein": 18, "carbs": 48, "fat": 22}'),

('Falafel Delight Wrap', 'vegan-wraps', 399, 'https://images.pexels.com/photos/1161547/pexels-photo-1161547.jpeg?auto=compress&cs=tinysrgb&w=800', 'Homemade falafel with fresh vegetables and garlic tahini sauce', true, ARRAY['falafel', 'lettuce', 'tomato', 'cucumber', 'red cabbage', 'tahini', 'garlic'], '{"calories": 450, "protein": 20, "carbs": 52, "fat": 20}'),

-- Energy Shots
('Ginger Turmeric Shot', 'energy-shots', 149, 'https://images.pexels.com/photos/1435740/pexels-photo-1435740.jpeg?auto=compress&cs=tinysrgb&w=800', 'Powerful anti-inflammatory shot with fresh ginger, turmeric, and lemon', true, ARRAY['ginger', 'turmeric', 'lemon', 'black pepper', 'honey'], '{"calories": 25, "protein": 0, "carbs": 6, "fat": 0}'),

('Wheatgrass Power Shot', 'energy-shots', 129, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800', 'Pure wheatgrass shot packed with chlorophyll and nutrients', true, ARRAY['wheatgrass'], '{"calories": 15, "protein": 1, "carbs": 3, "fat": 0}'),

('Cayenne Lemon Shot', 'energy-shots', 139, 'https://images.pexels.com/photos/1161547/pexels-photo-1161547.jpeg?auto=compress&cs=tinysrgb&w=800', 'Metabolism-boosting shot with cayenne pepper, lemon, and maple syrup', true, ARRAY['lemon', 'cayenne pepper', 'maple syrup', 'water'], '{"calories": 20, "protein": 0, "carbs": 5, "fat": 0}'),

('Green Machine Shot', 'energy-shots', 159, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', 'Concentrated green vegetables shot for instant energy', true, ARRAY['spinach', 'kale', 'cucumber', 'celery', 'lemon', 'ginger'], '{"calories": 18, "protein": 1, "carbs": 4, "fat": 0}');