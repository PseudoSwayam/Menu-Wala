import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
      />
      <p className="mt-4 text-gray-500 font-medium">Loading orders...</p>
    </div>
  );
};