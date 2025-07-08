export interface User {
  id: string
  email: string
  name: string
  address?: string
  favorite_items?: string[]
  created_at: string
}

export interface MenuItem {
  id: string
  name: string
  category: 'smoothie-bowls' | 'cold-press-juices' | 'vegan-wraps' | 'energy-shots'
  price: number
  image: string
  description: string
  isavailable: boolean
  ingredients?: string[]
  nutrition?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  created_at?: string
}

export interface Order {
  id: string
  user_id: string
  item_ids: string[]
  total_amount: number
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  created_at: string
  delivery_address?: string
}

export interface Feedback {
  id: string
  user_id: string
  message: string
  rating: number
  created_at: string
}

export interface Admin {
  id: string
  email: string
  role: 'admin' | 'super_admin'
}