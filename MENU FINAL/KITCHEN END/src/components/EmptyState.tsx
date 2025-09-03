import React from 'react';
import { ChefHat } from 'lucide-react';
import { FilterStatus } from '../types/Order';

interface EmptyStateProps {
  activeFilter: FilterStatus;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ activeFilter }) => {
  const getEmptyMessage = () => {
    switch (activeFilter) {
      case 'pending':
        return 'No pending orders';
      case 'preparing':
        return 'No orders being prepared';
      case 'ready':
        return 'No orders ready for pickup';
      default:
        return 'No active orders';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      <ChefHat size={48} className="mb-4 text-gray-400" />
      <h3 className="text-xl font-semibold mb-2">{getEmptyMessage()}</h3>
      <p className="text-gray-400">
        {activeFilter === 'all' 
          ? 'New orders will appear here automatically'
          : `Switch to "All" to see all active orders`
        }
      </p>
    </div>
  );
};