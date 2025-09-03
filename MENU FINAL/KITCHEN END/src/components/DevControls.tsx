import React from 'react';
import { motion } from 'framer-motion';
import { Plus, RefreshCw } from 'lucide-react';
import { initializeMockData, simulateNewOrder } from '../services/firebaseService';

export const DevControls: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={simulateNewOrder}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg font-medium text-sm"
      >
        <Plus size={16} />
        Add Test Order
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={initializeMockData}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg font-medium text-sm"
      >
        <RefreshCw size={16} />
        Reset Data
      </motion.button>
    </div>
  );
};