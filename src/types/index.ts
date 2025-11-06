/**
 * Shared TypeScript types and interfaces
 */

// Order related types
export interface Order {
  id: string
  customerName: string
  phoneNumber: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  notes?: string
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'delivered'
  | 'cancelled'

// Customer related types
export interface Customer {
  id: string
  name: string
  phoneNumber: string
  address?: string
  orderHistory: string[] // Array of order IDs
}

// Restaurant/Menu related types
export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  available: boolean
  imageUrl?: string
}

export interface MenuCategory {
  id: string
  name: string
  description?: string
  items: MenuItem[]
}

// WhatsApp related types
export interface WhatsAppMessage {
  id: string
  from: string
  to: string
  body: string
  timestamp: string
  type: 'text' | 'image' | 'document' | 'location'
}

// UI State types
export interface UIState {
  isLoading: boolean
  error: string | null
  successMessage: string | null
}
