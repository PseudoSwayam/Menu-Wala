import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, DollarSign, Timer } from 'lucide-react';
import { Order, OrderStatus } from '../types/Order';
import { ETAInput } from './ETAInput';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  onETAChange: (orderId: string, eta: number) => void;
}

const statusColors = {
  pending: 'bg-orange-50 border-orange-200 text-orange-800',
  preparing: 'bg-blue-50 border-blue-200 text-blue-800',
  ready: 'bg-green-50 border-green-200 text-green-800',
  served: 'bg-gray-50 border-gray-200 text-gray-800',
};

const statusOptions: { value: OrderStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Pending', color: 'bg-orange-500 hover:bg-orange-600' },
  { value: 'preparing', label: 'Preparing', color: 'bg-blue-500 hover:bg-blue-600' },
  { value: 'ready', label: 'Ready', color: 'bg-green-500 hover:bg-green-600' },
];

export const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange, onETAChange }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeElapsed = (timestamp: number) => {
    const now = Date.now();
    const elapsed = Math.floor((now - timestamp) / 1000 / 60);
    return elapsed;
  };

  const getRemainingETA = () => {
    if (!order.estimatedTime || !order.etaSetAt) return null;
    
    const now = Date.now();
    const elapsedSinceETA = Math.floor((now - order.etaSetAt) / 1000 / 60);
    const remaining = order.estimatedTime - elapsedSinceETA;
    
    return Math.max(0, remaining);
  };

  const timeElapsed = getTimeElapsed(order.orderTime);
  const remainingETA = getRemainingETA();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-xl shadow-sm border-2 p-6 ${statusColors[order.status]} transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">Order #{order.id.slice(-4)}</h3>
            <div className="flex items-center gap-1 text-gray-600">
              <Users size={16} />
              <span className="text-sm font-medium">Table {order.tableNumber}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{formatTime(order.orderTime)}</span>
            </div>
            <span className={`font-medium ${timeElapsed > 15 ? 'text-red-500' : timeElapsed > 10 ? 'text-orange-500' : 'text-green-500'}`}>
              {timeElapsed}m ago
            </span>
            {remainingETA !== null && (
              <div className="flex items-center gap-1">
                <Timer size={14} />
                <span className={`font-medium ${remainingETA <= 2 ? 'text-red-500' : remainingETA <= 5 ? 'text-orange-500' : 'text-green-500'}`}>
                  {remainingETA}m left
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-gray-900">
            <DollarSign size={16} />
            <span className="text-lg font-bold">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <ETAInput
          currentETA={order.estimatedTime}
          onETAChange={(eta) => onETAChange(order.id, eta)}
        />
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Items:</h4>
        <div className="space-y-1">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-800">
                {item.quantity}x {item.name}
              </span>
              <span className="text-gray-600 font-medium">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        {order.specialInstructions && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs font-medium text-yellow-800">Special Instructions:</p>
            <p className="text-sm text-yellow-700">{order.specialInstructions}</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onStatusChange(order.id, option.value)}
            disabled={order.status === option.value}
            className={`
              flex-1 py-2 px-3 rounded-lg text-white font-medium text-sm transition-all duration-200
              ${order.status === option.value 
                ? 'bg-gray-400 cursor-not-allowed' 
                : `${option.color} transform hover:scale-105 active:scale-95`
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};