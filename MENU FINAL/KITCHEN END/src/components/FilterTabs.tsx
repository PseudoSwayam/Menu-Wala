import React from 'react';
import { motion } from 'framer-motion';
import { FilterStatus } from '../types/Order';

interface FilterTabsProps {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  orderCounts: Record<FilterStatus, number>;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange, orderCounts }) => {
  const filters: { value: FilterStatus; label: string; color: string }[] = [
    { value: 'all', label: 'All', color: 'bg-gray-500' },
    { value: 'pending', label: 'Pending', color: 'bg-orange-500' },
    { value: 'preparing', label: 'Preparing', color: 'bg-blue-500' },
    { value: 'ready', label: 'Ready', color: 'bg-green-500' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <motion.button
          key={filter.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter.value)}
          className={`
            relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 min-w-20
            ${activeFilter === filter.value
              ? `${filter.color} text-white shadow-lg`
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }
          `}
        >
          <span>{filter.label}</span>
          {orderCounts[filter.value] > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`
                ml-2 px-2 py-0.5 rounded-full text-xs font-bold
                ${activeFilter === filter.value
                  ? 'bg-white/20 text-white'
                  : `${filter.color} text-white`
                }
              `}
            >
              {orderCounts[filter.value]}
            </motion.span>
          )}
          {activeFilter === filter.value && (
            <motion.div
              layoutId="activeFilterIndicator"
              className="absolute inset-0 bg-white/10 rounded-full"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};