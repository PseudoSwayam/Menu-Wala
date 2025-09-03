import React, { useState } from 'react';
import { QrCode, Users } from 'lucide-react';

interface TableInputProps {
  onTableSubmit: (tableNumber: number) => void;
}

export const TableInput: React.FC<TableInputProps> = ({ onTableSubmit }) => {
  const [tableNumber, setTableNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(tableNumber, 10);
    
    if (isNaN(num) || num < 1 || num > 50) {
      setError('Please enter a valid table number (1-50)');
      return;
    }
    
    setError('');
    onTableSubmit(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <QrCode className="w-12 h-12 text-amber-400 mr-3" />
            <h1 className="text-3xl font-bold text-white">Spice Route</h1>
          </div>
          <p className="text-blue-100 text-lg">Welcome to our digital menu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="table" className="block text-white font-medium mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Table Number
            </label>
            <input
              type="number"
              id="table"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Enter your table number"
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
              min="1"
              max="50"
              required
            />
            {error && (
              <p className="text-red-300 text-sm mt-2 animate-pulse">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            View Menu
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-blue-200 text-sm">
            Scan QR code or enter table number to get started
          </p>
        </div>
      </div>
    </div>
  );
};