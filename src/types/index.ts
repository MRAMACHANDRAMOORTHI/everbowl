export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: 'admin' | 'user';
  favoriteItems: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  category:
    | 'classic-fruit-bowls'
    | 'assorted-fruit-bowls'
    | 'smoothie-bowls'
    | 'cold-press-juices'
    | 'fruit-shakes'
    | 'wellness-shots'
    | 'sorbets'
    | 'smoothies';
  price: number;
  imageUrl: string;
  description: string;
  isAvailable: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  createdAt: Date;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  customizations?: string[];
}

export interface Feedback {
  id: string;
  userId: string;
  message: string;
  rating: number;
  createdAt: Date;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customizations?: string[];
}
