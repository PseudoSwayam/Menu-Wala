import { Order } from '../types/Order';

export const generateMockOrders = (): Record<string, Order> => {
  const orders: Record<string, Order> = {
    'order_001': {
      id: 'order_001',
      tableNumber: 12,
      status: 'pending',
      orderTime: Date.now() - 1000 * 60 * 5, // 5 minutes ago
      estimatedTime: 15,
      etaSetAt: Date.now() - 1000 * 60 * 2,
      totalAmount: 45.99,
      customerName: 'John Smith',
      items: [
        { id: '1', name: 'Grilled Salmon', quantity: 1, price: 24.99 },
        { id: '2', name: 'Caesar Salad', quantity: 1, price: 12.99 },
        { id: '3', name: 'Garlic Bread', quantity: 1, price: 7.99 },
      ],
      specialInstructions: 'Extra lemon on the salmon, dressing on the side',
    },
    'order_002': {
      id: 'order_002',
      tableNumber: 8,
      status: 'preparing',
      orderTime: Date.now() - 1000 * 60 * 12, // 12 minutes ago
      estimatedTime: 8,
      etaSetAt: Date.now() - 1000 * 60 * 5,
      totalAmount: 67.50,
      customerName: 'Maria Garcia',
      items: [
        { id: '4', name: 'Ribeye Steak', quantity: 1, price: 39.99 },
        { id: '5', name: 'Lobster Bisque', quantity: 1, price: 16.99 },
        { id: '6', name: 'Roasted Vegetables', quantity: 1, price: 10.99 },
      ],
      specialInstructions: 'Medium rare steak',
    },
    'order_003': {
      id: 'order_003',
      tableNumber: 15,
      status: 'ready',
      orderTime: Date.now() - 1000 * 60 * 18, // 18 minutes ago
      totalAmount: 32.97,
      customerName: 'David Wilson',
      items: [
        { id: '7', name: 'Margherita Pizza', quantity: 1, price: 18.99 },
        { id: '8', name: 'Buffalo Wings', quantity: 1, price: 13.98 },
      ],
    },
    'order_004': {
      id: 'order_004',
      tableNumber: 3,
      status: 'pending',
      orderTime: Date.now() - 1000 * 60 * 2, // 2 minutes ago
      totalAmount: 28.97,
      customerName: 'Sarah Johnson',
      items: [
        { id: '9', name: 'Fish and Chips', quantity: 1, price: 19.99 },
        { id: '10', name: 'Coleslaw', quantity: 1, price: 5.99 },
        { id: '11', name: 'Iced Tea', quantity: 1, price: 2.99 },
      ],
    },
    'order_005': {
      id: 'order_005',
      tableNumber: 7,
      status: 'preparing',
      orderTime: Date.now() - 1000 * 60 * 8, // 8 minutes ago
      estimatedTime: 12,
      etaSetAt: Date.now() - 1000 * 60 * 3,
      totalAmount: 52.96,
      customerName: 'Mike Brown',
      items: [
        { id: '12', name: 'Chicken Parmesan', quantity: 2, price: 22.99 },
        { id: '13', name: 'Tiramisu', quantity: 1, price: 6.99 },
      ],
      specialInstructions: 'Gluten-free pasta for one serving',
    },
  };

  return orders;
};