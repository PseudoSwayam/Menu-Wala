export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: OrderStatus;
  orderTime: number;
  estimatedTime?: number; // ETA in minutes
  etaSetAt?: number; // Timestamp when ETA was set
  totalAmount: number;
  customerName?: string;
  specialInstructions?: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served';

export type FilterStatus = OrderStatus | 'all';

export interface ServedItem {
  itemName: string;
  quantityServed: number;
  totalRevenue: number;
  date: string;
}

export interface PopularItem {
  itemId: string;
  itemName: string;
  orderCount: number;
  date: string;
}