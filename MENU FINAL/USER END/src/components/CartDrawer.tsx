import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  totalPrice: number;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 shadow-2xl transform transition-transform duration-300 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <ShoppingBag className="w-6 h-6 mr-3 text-amber-400" />
            Your Thali
          </h2>
          <button
            onClick={onClose}
            className="text-blue-100 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-blue-300 mx-auto mb-4 opacity-50" />
              <p className="text-blue-100 text-lg">Your thali is empty</p>
              <p className="text-blue-300 text-sm mt-2">Add some delicious items to get started!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-amber-400 font-bold">₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-white/10 p-6 space-y-4 flex-shrink-0">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-white">Total:</span>
              <span className="text-2xl font-bold text-amber-400">₹{totalPrice}</span>
            </div>
            <button
              onClick={onProceedToCheckout}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Order Your Thali
            </button>
          </div>
        )}
      </div>
    </div>
  );
};