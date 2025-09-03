import React, { useState, useEffect } from 'react';
import { MenuCategory, MenuItem } from '../types';
import { CategoryFilter } from './CategoryFilter';
import { MenuItemCard } from './MenuItemCard';
import { CartButton } from './CartButton';
import { CartDrawer } from './CartDrawer';
import { useCart } from '../hooks/useCart';
import menuData from '../data/menu.json';
import toast from 'react-hot-toast';

interface MenuPageProps {
  tableNumber: number;
  onProceedToCheckout: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ tableNumber, onProceedToCheckout }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [menuItems] = useState<MenuItem[]>(menuData.menuItems as MenuItem[]);
  
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems
  } = useCart();

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    toast.success(`${item.name} added to thali!`, {
      icon: '🍽️',
      duration: 2000,
    });
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your thali is empty! Add some items first.');
      return;
    }
    setIsCartOpen(false);
    onProceedToCheckout();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-900/90 backdrop-blur-lg border-b border-white/10 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Spice Route</h1>
              <p className="text-blue-200 text-sm">Table {tableNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-200 text-sm">Digital Menu</p>
              <p className="text-amber-400 font-medium">Order & Enjoy</p>
            </div>
          </div>
        </div>
      </header>

      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Menu Items */}
      <main className="px-4 py-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-blue-200 text-lg">No items found in this category</p>
          </div>
        )}
      </main>

      <CartButton
        itemCount={getTotalItems()}
        onClick={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        totalPrice={getTotalPrice()}
        onProceedToCheckout={handleProceedToCheckout}
      />
    </div>
  );
};