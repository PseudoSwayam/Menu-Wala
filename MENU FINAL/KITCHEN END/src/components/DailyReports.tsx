import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { useServedItems, usePopularItems } from '../hooks/useReports';
import { format } from 'date-fns';

export const DailyReports: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { servedItems, loading: servedLoading } = useServedItems(selectedDate);
  const { popularItems, loading: popularLoading } = usePopularItems(selectedDate);

  const totalRevenue = servedItems.reduce((sum, item) => sum + item.totalRevenue, 0);
  const totalItemsServed = servedItems.reduce((sum, item) => sum + item.quantityServed, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Daily Reports</h1>
                <p className="text-sm text-gray-500">Sales and popularity analytics</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Items Served</p>
                <p className="text-2xl font-bold text-gray-900">{totalItemsServed}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Unique Items</p>
                <p className="text-2xl font-bold text-gray-900">{servedItems.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Served Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Daily Served Items</h2>
              <p className="text-sm text-gray-500">Revenue breakdown by item</p>
            </div>
            
            <div className="overflow-x-auto">
              {servedLoading ? (
                <div className="p-8 text-center">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-gray-500">Loading served items...</p>
                </div>
              ) : servedItems.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p>No items served on this date</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {servedItems.map((item, index) => (
                      <motion.tr
                        key={item.itemName}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.itemName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantityServed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                          ${item.totalRevenue.toFixed(2)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>

          {/* Popular Items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Popular Items</h2>
              <p className="text-sm text-gray-500">Most ordered items today</p>
            </div>
            
            <div className="overflow-x-auto">
              {popularLoading ? (
                <div className="p-8 text-center">
                  <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-gray-500">Loading popular items...</p>
                </div>
              ) : popularItems.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p>No popular items data for this date</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orders
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {popularItems.map((item, index) => (
                      <motion.tr
                        key={item.itemId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                            index === 0 ? 'bg-yellow-500' : 
                            index === 1 ? 'bg-gray-400' : 
                            index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.itemName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.orderCount} orders
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};