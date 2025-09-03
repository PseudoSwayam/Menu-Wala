import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, CheckCircle, ChefHat, Timer } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, limit } from 'firebase/firestore';
import { Order } from '../types/Order';

interface CustomerOrderViewProps {
  tableNumber: number;
}

export const CustomerOrderView: React.FC<CustomerOrderViewProps> = ({ tableNumber }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // CORRECTED: Querying by 'tableNumber' to match your Order type
    const q = query(
      collection(db, "orders"),
      where("tableNumber", "==", tableNumber),
      where("status", "!=", "served"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setOrder(null);
      } else {
        const orderData = snapshot.docs[0].data() as Order;
        const orderId = snapshot.docs[0].id;
        setOrder({ ...orderData, id: orderId });
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching customer order:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [tableNumber]);

  const getRemainingTime = () => {
    // CORRECTED: Using 'estimatedTime' to match your Order type
    if (!order?.estimatedTime || !order?.etaSetAt) return null;
    
    const now = Date.now();
    const elapsedSinceETA = Math.floor((now - order.etaSetAt) / 1000 / 60);
    const remaining = order.estimatedTime - elapsedSinceETA;
    
    return Math.max(0, remaining);
  };

  const getStatusIcon = () => {
    switch (order?.status) {
      case 'pending': return <Clock className="w-6 h-6 text-orange-500" />;
      case 'preparing': return <ChefHat className="w-6 h-6 text-blue-500" />;
      case 'ready': return <CheckCircle className="w-6 h-6 text-green-500" />;
      default: return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusMessage = () => {
    const remainingTime = getRemainingTime();
    
    switch (order?.status) {
      case 'pending':
        return remainingTime 
          ? `Your order will be ready in approximately ${remainingTime} minutes`
          : 'Your order has been received and will be prepared shortly';
      case 'preparing':
        return remainingTime 
          ? `Your order is being prepared and will be ready in ${remainingTime} minutes`
          : 'Your order is being prepared';
      case 'ready':
        return 'Your order is ready for pickup!';
      default:
        return 'No active order found for this table';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Active Order</h2>
          <p className="text-gray-600">Table {tableNumber} has no active orders at the moment.</p>
        </div>
      </div>
    );
  }

  const remainingTime = getRemainingTime();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Table {tableNumber}</h1>
                <p className="text-blue-100">Order #{order.id.slice(-4)}</p>
              </div>
              <div className="text-right">
                {/* CORRECTED: Using 'totalAmount' and ₹ symbol to match type */}
                <div className="text-3xl font-bold">₹{order.totalAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              {getStatusIcon()}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 capitalize">
                  {order.status}
                </h3>
                <p className="text-gray-600">{getStatusMessage()}</p>
              </div>
            </div>

            {remainingTime !== null && remainingTime > 0 && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6"
              >
                <div className="flex items-center gap-2 text-green-700">
                  <Timer className="w-5 h-5" />
                  <span className="font-semibold">Estimated Time</span>
                </div>
                <div className="text-2xl font-bold text-green-800 mt-1">
                  {remainingTime} minute{remainingTime !== 1 ? 's' : ''}
                </div>
              </motion.div>
            )}

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Your Order</h4>
              {order.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-gray-800">{item.name}</span>
                    {/* CORRECTED: Using 'quantity' to match OrderItem type */}
                    <span className="text-gray-500 ml-2">×{item.quantity}</span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </motion.div>
              ))}
            </div>

            {order.specialInstructions && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h5 className="font-semibold text-yellow-800 mb-1">Special Instructions</h5>
                <p className="text-yellow-700">{order.specialInstructions}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};