// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { TableInput } from './components/TableInput';
import { MenuPage } from './components/MenuPage';
import { OrderConfirmation } from './components/OrderConfirmation';
import { OrderStatus } from './components/OrderStatus';
// CHANGE: Import the Provider, not the hook
import { CartProvider } from './hooks/useCart';
import { storage } from './utils/localStorage';

type AppState = 'table-input' | 'menu' | 'checkout' | 'order-status';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('table-input');
  const [tableNumber, setTableNumber] = useState<number>(0);
  const [currentOrderId, setCurrentOrderId] = useState<string>('');

  // !!! REMOVE THIS ENTIRE LINE !!!
  // const { cartItems, getTotalPrice, clearCart } = useCart();
  // This was creating a separate state instance.

  useEffect(() => {
    const savedOrderId = storage.getCurrentOrderId();
    const savedTableNumber = storage.getTableNumber();
    if (savedOrderId && savedTableNumber) {
      setTableNumber(savedTableNumber);
      setCurrentOrderId(savedOrderId);
      setCurrentState('order-status');
    } else {
      setCurrentState('table-input');
    }
  }, []);

  const handleTableSubmit = (table: number) => {
    setTableNumber(table);
    storage.setTableNumber(table);
    setCurrentState('menu');
  };

  const handleProceedToCheckout = () => {
    setCurrentState('checkout');
  };

  // CHANGE: The handleOrderPlaced no longer needs clearCart passed to it
  const handleOrderPlaced = (orderId: string) => {
    setCurrentOrderId(orderId);
    storage.setCurrentOrderId(orderId);
    // The OrderConfirmation component will call clearCart itself now
    setCurrentState('order-status');
  };

  const handleBackToMenu = () => {
    storage.clearAll();
    setCurrentOrderId('');
    setTableNumber(0);
    setCurrentState('table-input');
  };

  const renderCurrentPage = () => {
    switch (currentState) {
      case 'table-input':
        return <TableInput onTableSubmit={handleTableSubmit} />;
      case 'menu':
        return <MenuPage tableNumber={tableNumber} onProceedToCheckout={handleProceedToCheckout} />;
      case 'checkout':
        // CHANGE: No more props for cart items.
        // The component will get them from the context itself.
        return (
          <OrderConfirmation
            tableNumber={tableNumber}
            onBackToMenu={() => setCurrentState('menu')}
            onOrderPlaced={handleOrderPlaced}
          />
        );
      case 'order-status':
        return <OrderStatus orderId={currentOrderId} onBackToMenu={handleBackToMenu} />;
      default:
        return <TableInput onTableSubmit={handleTableSubmit} />;
    }
  };

  return (
    // WRAP the entire app with the CartProvider
    <CartProvider>
      <div className="font-sans antialiased">
        {renderCurrentPage()}
        <Toaster 
          position="top-center"
          toastOptions={{ /* ...toast options... */ }}
        />
      </div>
    </CartProvider>
  );
}

export default App;