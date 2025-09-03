import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FilterStatus } from '../types/Order';
import { useOrders } from '../hooks/useOrders';
import { useNotifications } from '../hooks/useNotifications';
import { OrderCard } from './OrderCard';
import { FilterTabs } from './FilterTabs';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';

export const Dashboard: React.FC = () => {
  const { orders, loading, updateOrderStatus, updateOrderETA } = useOrders();
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all');
  
  // Enable notifications
  useNotifications();

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') return orders;
    return orders.filter(order => order.status === activeFilter);
  }, [orders, activeFilter]);

  const orderCounts = useMemo(() => {
    const counts = {
      all: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      preparing: orders.filter(o => o.status === 'preparing').length,
      ready: orders.filter(o => o.status === 'ready').length,
      served: orders.filter(o => o.status === 'served').length,
    };
    return counts;
  }, [orders]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kitchen Dashboard</h1>
          <p className="text-gray-600">
            {orders.length} active order{orders.length !== 1 ? 's' : ''} • Real-time updates
          </p>
        </div>

        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          orderCounts={orderCounts}
        />

        <AnimatePresence mode="wait">
          {filteredOrders.length === 0 ? (
            <EmptyState activeFilter={activeFilter} />
          ) : (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence>
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={updateOrderStatus}
                    onETAChange={updateOrderETA}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};