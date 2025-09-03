// src/hooks/useCart.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { CartItem, MenuItem } from '../types';

// 1. Define the shape of the context data
interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (item: MenuItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

// 2. Create the context with a default value that matches the type, preventing errors
const CartContext = createContext<CartContextType>({
  cartItems: [],
  isCartOpen: false,
  setIsCartOpen: () => {},
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getTotalPrice: () => 0,
  getTotalItems: () => 0,
});

// 3. Create the Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('restaurant-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('restaurant-cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('restaurant-cart');
    }
  }, [cartItems]);

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  
  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('restaurant-cart');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 4. Create the hook for components to easily use the context
export const useCart = () => {
  return useContext(CartContext);
};