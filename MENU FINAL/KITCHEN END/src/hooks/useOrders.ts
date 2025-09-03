// src/hooks/useOrders.ts

import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, setDoc, increment, orderBy } from 'firebase/firestore';
import { Order, OrderStatus } from '../types/Order';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper functions are defined before being called to prevent scope issues.
  const recordServedItems = async (order: Order) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    for (const item of order.items) {
      try {
        const itemRef = doc(db, `reports/served-items/${today}`, item.name);
        await setDoc(itemRef, {
          itemName: item.name,
          date: today,
          // CORRECTED: Use 'item.quantity' to match your OrderItem type
          quantityServed: increment(item.quantity),
          totalRevenue: increment(item.quantity * item.price),
        }, { merge: true });
      } catch (error) {
        console.error(`Error recording served item ${item.name}:`, error);
      }
    }
  };

  const updatePopularItems = async (order: Order) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    for (const item of order.items) {
      try {
        const popularItemRef = doc(db, `reports/popular-items/${today}`, item.name);
        await setDoc(popularItemRef, {
          itemName: item.name,
          date: today,
          // CORRECTED: Use 'item.quantity' to match your OrderItem type
          orderCount: increment(item.quantity),
        }, { merge: true });
      } catch (error) {
        console.error(`Error updating popular item ${item.name}:`, error);
      }
    }
  };
  
  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    const orderRef = doc(db, "orders", orderId);
    try {
      if (status === 'served') {
        const order = orders.find(o => o.id === orderId);
        if (order) {
          await recordServedItems(order);
          await updatePopularItems(order);
        }
      }
      await updateDoc(orderRef, { status });
      toast.success(`Order #${orderId.slice(-4)} marked as ${status}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };
  
  const updateOrderETA = async (orderId: string, eta: number) => {
    const orderRef = doc(db, "orders", orderId);
    try {
      // CORRECTED: Use 'estimatedTime' to match your Order type
      await updateDoc(orderRef, { 
        estimatedTime: eta,
        etaSetAt: Date.now() 
      });
      toast.success(`ETA updated to ${eta} minutes`);
    } catch (error) {
      console.error('Error updating ETA:', error);
      toast.error('Failed to update ETA');
    }
  };

  useEffect(() => {
    // CORRECTED: Use 'orderTime' to match your Order type for sorting.
    // This will require a composite index in Firestore for 'status' and 'orderTime'.
    const q = query(
      collection(db, "orders"), 
      where("status", "!=", "served"), 
      orderBy("orderTime", "asc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersArray = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Order[];
      
      setOrders(ordersArray);
      setLoading(false);
    }, (error) => {
      console.error("Firebase Error! This is likely a Firestore index issue. Check the browser console for a link to create the required index.", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    orders,
    loading,
    updateOrderStatus,
    updateOrderETA,
  };
};