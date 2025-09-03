// src/components/OrderStatus.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../config/firebase'; // Your Firestore config
import { doc, onSnapshot } from 'firebase/firestore';
// CORRECT: We now import the newly synchronized Order type
import { Order } from '../types';
import { CheckCircle, ChefHat, Clock, Loader } from 'lucide-react';

interface OrderStatusProps {
  orderId: string;
  onBackToMenu: () => void;
}

export const OrderStatus: React.FC<OrderStatusProps> = ({ orderId, onBackToMenu }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // This useEffect now correctly sets up a LIVE listener that will
  // automatically update the UI when the kitchen changes the order status.
  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const orderRef = doc(db, 'orders', orderId);

    // onSnapshot creates a real-time subscription.
    // The code inside this block will re-run automatically every time
    // the document in Firestore is modified.
    const unsubscribe = onSnapshot(orderRef, (docSnap) => {
      if (docSnap.exists()) {
        // We get the data and cast it to our now-correct local Order type.
        setOrder({ id: docSnap.id, ...docSnap.data() } as Order);
      } else {
        console.error("Order not found!");
        setOrder(null);
      }
      setLoading(false);
    }, (error) => {
        console.error("Error subscribing to order status:", error);
        setLoading(false);
    });

    // When the component unmounts, we unsubscribe from the listener.
    return () => unsubscribe();
  }, [orderId]);

  // Helper function to get correct UI based on the LIVE order status
  const getStatusDetails = () => {
    switch (order?.status) {
      case 'pending': return { icon: <Clock className="w-16 h-16 text-orange-400" />, title: "Order Received", message: "Your thali is in the queue!" };
      case 'preparing': return { icon: <ChefHat className="w-16 h-16 text-blue-400" />, title: "Preparing Your Thali", message: "Our chefs are on it!" };
      case 'ready': return { icon: <CheckCircle className="w-16 h-16 text-green-400" />, title: "Order Ready!", message: "Your thali is ready for pickup!" };
      case 'served': return { icon: <motion.div>🍽️</motion.div>, title: "Order Complete!", message: "Enjoy your meal!" };
      default: return { icon: <Loader className="w-16 h-16 text-gray-400 animate-spin" />, title: "Checking Status...", message: "Just a moment." };
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
        <Loader className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }
  
  if (!order) {
    return (
       <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4 text-white text-center">
         <div>
            <h2 className="text-2xl font-bold">Order Not Found</h2>
            <button
              onClick={onBackToMenu}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl"
            >
              Back to Menu
            </button>
         </div>
       </div>
    );
  }
  
  const { icon, title, message } = getStatusDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-3xl text-white text-center p-8 shadow-2xl border border-white/20"
      >
        <motion.div
          key={order.status} // This makes the icon re-animate when the status changes!
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-6 w-24 h-24 rounded-full flex items-center justify-center bg-white/10"
        >
          {icon}
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        
        <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-blue-200">Order ID:</span>
            <span className="font-mono">{order.id.slice(-8).toUpperCase()}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/10">
            <span className="text-blue-200">Table:</span>
            {/* CORRECTLY displays the table number from the LIVE order object */}
            <span className="font-bold">{order.tableNumber}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-blue-200">Total:</span>
            {/* CORRECTLY displays the total amount from the LIVE order object */}
            <span className="font-bold">₹{order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-lg text-green-300 font-medium mb-8">{message}</p>
        
        <button
          onClick={onBackToMenu}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-transform transform hover:scale-105"
        >
          Order Again
        </button>
      </motion.div>
    </div>
  );
};