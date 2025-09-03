import React, { useState } from 'react';
import { Timer, Check } from 'lucide-react';

interface ETAInputProps {
  currentETA?: number;
  onETAChange: (eta: number) => void;
}

export const ETAInput: React.FC<ETAInputProps> = ({ currentETA, onETAChange }) => {
  const [eta, setETA] = useState(currentETA?.toString() || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = () => {
    const etaNumber = parseInt(eta);
    if (etaNumber > 0 && etaNumber <= 120) {
      onETAChange(etaNumber);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setETA(currentETA?.toString() || '');
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 w-full p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors duration-200"
      >
        <Timer size={16} className="text-gray-600" />
        <span className="text-sm text-gray-700">
          {currentETA ? `ETA: ${currentETA} minutes` : 'Set ETA'}
        </span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Timer size={16} className="text-gray-600" />
      <input
        type="number"
        value={eta}
        onChange={(e) => setETA(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Minutes"
        min="1"
        max="120"
        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <button
        onClick={handleSubmit}
        className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200"
      >
        <Check size={14} />
      </button>
    </div>
  );
};