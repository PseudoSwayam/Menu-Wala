import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export const CartButton: React.FC<CartButtonProps> = ({ itemCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-full shadow-2xl hover:from-amber-600 hover:to-orange-600 transform hover:scale-110 transition-all duration-300 z-50 border-2 border-white/20"
    >
      <div className="relative">
        <ShoppingBag className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </div>
    </button>
  );
};