import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChefHat, BarChart3, Users } from 'lucide-react';

export const Navigation: React.FC = () => {
  const navItems = [
    { to: '/', icon: ChefHat, label: 'Kitchen Dashboard' },
    { to: '/reports', icon: BarChart3, label: 'Daily Reports' },
    { to: '/customer/1', icon: Users, label: 'Customer View (Table 1)' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};