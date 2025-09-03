import React, { useState } from 'react';
import { Plus, Leaf, Flame } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onAddToCart(item);
    setIsAdding(false);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl group">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex space-x-2">
          {item.isVeg && (
            <div className="bg-green-500 rounded-full p-1.5">
              <Leaf className="w-3 h-3 text-white" />
            </div>
          )}
          {item.isSpicy && (
            <div className="bg-red-500 rounded-full p-1.5">
              <Flame className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-amber-400 font-bold text-lg">₹{item.price}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
          {item.name}
        </h3>
        <p className="text-blue-100 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
        
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full flex items-center justify-center py-3 rounded-xl font-medium transition-all duration-300 ${
            isAdding
              ? 'bg-green-500 text-white transform scale-95'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 hover:shadow-lg transform hover:scale-105'
          }`}
        >
          {isAdding ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Added!
            </div>
          ) : (
            <>
              <Plus className="w-5 h-5 mr-2" />
              Add to Thali
            </>
          )}
        </button>
      </div>
    </div>
  );
};