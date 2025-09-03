import { useState } from 'react';
import { collection, addDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Order } from '../types';
import toast from 'react-hot-toast';

export const useFirebase = () => {
  const [loading, setLoading] = useState(false);

  const createOrder = async (order: Omit<Order, 'id'>) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'orders'), order);
      toast.success('Order placed successfully!');
      return docRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const subscribeToOrder = (orderId: string, callback: (order: Order) => void) => {
    const unsubscribe = onSnapshot(doc(db, 'orders', orderId), (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() } as Order);
      }
    });
    
    return unsubscribe;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status'], eta?: number) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status, ...(eta && { eta }) });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return {
    createOrder,
    subscribeToOrder,
    updateOrderStatus,
    loading
  };
};