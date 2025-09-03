// src/components/OrderConfirmation.tsx

import React, { useState } from 'react';
import { Check, Clock, ArrowLeft, Leaf, Flame } from 'lucide-react';
import { useFirebase } from '../hooks/useFirebase';
import { useCart } from '../hooks/useCart';
// IMPORTANT: We now import the corrected Order and NEW OrderItem types
import { Order, OrderItem } from '../types/index';
import { toast } from 'react-hot-toast';

interface OrderConfirmationProps {
  tableNumber: number;
  onBackToMenu: () => void;
  onOrderPlaced: (orderId: string) => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  tableNumber,
  onBackToMenu,
  onOrderPlaced
}) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice(); 
  
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { createOrder } = useFirebase();

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
      
    setIsPlacingOrder(true);
    
    try {
      // Step 1: Map the cart items to the new, strict OrderItem type.
      const orderItems: OrderItem[] = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));
      
      // Step 2: Create the final order data object. Because we fixed the local Order type,
      // this object is now 100% valid both locally and for the kitchen app.
      const orderData: Omit<Order, 'id'> = {
        tableNumber: tableNumber,
        items: orderItems,
        status: 'pending',
        orderTime: Date.now(),
        totalAmount: totalPrice,
      };

      const orderId = await createOrder(orderData);
      clearCart();
      onOrderPlaced(orderId);

    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={onBackToMenu}
                className="text-white hover:text-blue-100 transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">Order Summary</h1>
                <p className="text-white/90 mt-1">Table {tableNumber}</p>
              </div>
              <div className="w-10" />
            </div>
          </div>

          {/* Order Items */}
          <div className="max-h-96 overflow-y-auto">
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="mr-2">🍽️</span>
                Your Thali ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} {cartItems.reduce((sum, item) => sum + item.quantity, 0) === 1 ? 'item' : 'items'})
              </h2>
              
              {cartItems.map((item, index) => (
                <div key={item.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="absolute -top-2 -left-2 bg-amber-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-semibold text-lg leading-tight">{item.name}</h3>
                        <div className="flex items-center space-x-1 ml-2">
                          {item.isVeg && (
                            <div className="bg-green-500 rounded-full p-1">
                              <Leaf className="w-3 h-3 text-white" />
                            </div>
                          )}
                          {item.isSpicy && (
                            <div className="bg-red-500 rounded-full p-1">
                              <Flame className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-blue-200 text-sm mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-amber-400 font-medium">₹{item.price}</span>
                          <span className="text-blue-300">×</span>
                          <span className="bg-white/10 text-white font-bold px-3 py-1 rounded-lg">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-amber-400 font-bold text-lg">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white/5 border-t border-white/10 p-6">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-blue-200">
                <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-blue-200">
                <span>GST (5%):</span>
                <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-blue-200">
                <span>Service Charge (10%):</span>
                <span>₹{(totalPrice * 0.10).toFixed(2)}</span>
              </div>
              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">Grand Total:</span>
                  <span className="text-3xl font-bold text-amber-400">
                    ₹{(totalPrice * 1.15).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirmOrder}
              disabled={isPlacingOrder || cartItems.length === 0}
              className={`w-full font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${
                isPlacingOrder
                  ? 'bg-green-500 text-white transform scale-95'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 shadow-lg'
              }`}
            >
              {isPlacingOrder ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  Placing Order...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-3" />
                  Confirm Order
                </>
              )}
            </button>

            <p className="text-blue-200 text-center text-sm mt-4 flex items-center justify-center">
              <Clock className="w-4 h-4 mr-1" />
              Estimated preparation time will be shown after confirmation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};