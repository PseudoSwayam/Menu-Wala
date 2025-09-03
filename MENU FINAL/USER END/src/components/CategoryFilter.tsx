import React from 'react';
import { MenuCategory, MENU_CATEGORIES } from '../types';

interface CategoryFilterProps {
  activeCategory: MenuCategory | 'all';
  onCategoryChange: (category: MenuCategory | 'all') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryChange
}) => {
  const allCategories = [
    { id: 'all' as const, label: 'All Items', icon: '🍽️' },
    ...MENU_CATEGORIES
  ];

  return (
    <div className="sticky top-0 bg-slate-900/90 backdrop-blur-lg z-40 border-b border-white/10">
      <div className="px-4 py-4">
        <div className="flex overflow-x-auto space-x-3 scrollbar-hide">
          {allCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex-shrink-0 px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-amber-500 text-white shadow-lg transform scale-105'
                  : 'bg-white/10 text-blue-100 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};