// src/services/firebaseService.ts

import { db } from '../config/firebase';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { generateMockOrders } from '../utils/mockData';
import { format } from 'date-fns';
import { Order } from '../types/Order';

export const initializeMockData = async () => {
  try {
    const mockOrders = generateMockOrders();
    
    // CORRECTED: An object (Record) is not iterable. We must use Object.values()
    // to get an array of the order objects, which we can then loop through.
    for (const order of Object.values(mockOrders)) {
      // Create a document reference using the ID from the mock order
      const orderRef = doc(db, 'orders', order.id);
      await setDoc(orderRef, order);
    }
    
    await initializeSampleReports();
    
    console.log('Mock data initialized successfully in Firestore');
  } catch (error) {
    console.error('Error initializing mock data:', error);
  }
};

const initializeSampleReports = async () => {
  try {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const sampleServedItems = {
      'Grilled Salmon': {
        itemName: 'Grilled Salmon',
        quantityServed: 8,
        totalRevenue: 199.92,
        date: today,
      },
      'Ribeye Steak': {
        itemName: 'Ribeye Steak',
        quantityServed: 5,
        totalRevenue: 199.95,
        date: today,
      },
      'Margherita Pizza': {
        itemName: 'Margherita Pizza',
        quantityServed: 12,
        totalRevenue: 227.88,
        date: today,
      },
    };
    
    const samplePopularItems = {
      'item_pizza': {
        itemId: 'item_pizza',
        itemName: 'Margherita Pizza',
        orderCount: 12,
        date: today,
      },
      'item_salmon': {
        itemId: 'item_salmon',
        itemName: 'Grilled Salmon',
        orderCount: 8,
        date: today,
      },
      'item_steak': {
        itemId: 'item_steak',
        itemName: 'Ribeye Steak',
        orderCount: 5,
        date: today,
      },
    };
    
    for (const [itemName, data] of Object.entries(sampleServedItems)) {
      const docRef = doc(db, `reports/served-items/${today}`, itemName);
      await setDoc(docRef, data);
    }
    
    for (const [itemId, data] of Object.entries(samplePopularItems)) {
      const docRef = doc(db, `reports/popular-items/${today}`, itemId);
      await setDoc(docRef, data);
    }
  } catch (error) {
    console.error('Error initializing sample reports:', error);
  }
};

export const simulateNewOrder = async () => {
  try {
    const menuItems = [
      { id: 'item_chicken', name: 'Grilled Chicken', price: 22.99 },
      { id: 'item_burger', name: 'Beef Burger', price: 16.99 },
      { id: 'item_salad', name: 'Caesar Salad', price: 12.99 },
      { id: 'item_tacos', name: 'Fish Tacos', price: 18.99 },
      { id: 'item_pasta', name: 'Pasta Carbonara', price: 19.99 },
      { id: 'item_pizza', name: 'Margherita Pizza', price: 17.99 },
    ];
    
    const randomItem = menuItems[Math.floor(Math.random() * menuItems.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    
    // Create an object that matches the 'Order' type perfectly
    const newOrder: Omit<Order, 'id'> = {
      tableNumber: Math.floor(Math.random() * 20) + 1,
      status: 'pending',
      orderTime: Date.now(),
      totalAmount: randomItem.price * quantity,
      customerName: 'New Customer',
      items: [
        {
          id: randomItem.id,
          name: randomItem.name,
          quantity,
          price: randomItem.price,
        },
      ],
    };

    const docRef = await addDoc(collection(db, 'orders'), newOrder);
    console.log('New order simulated with ID:', docRef.id);
  } catch (error) {
    console.error('Error simulating new order:', error);
  }
};