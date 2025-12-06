import React from 'react';
import {
  FiTag,
  FiUsers,
  FiDroplet,
  FiTrendingUp,
  FiLayers,
  FiStar,
  FiDollarSign,
} from 'react-icons/fi';

const iconComponents = {
  tag: FiTag,
  users: FiUsers,
  droplet: FiDroplet,
  trendingUp: FiTrendingUp,
  layers: FiLayers,
  star: FiStar,
  dollarSign: FiDollarSign,
};

export const FilterSection = ({ title, icon, children }) => {
  const Icon = iconComponents[icon] || FiTag;

  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-1 text-gray-700 mb-1">
        <Icon className="h-3 w-3" />
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      {children}
    </div>
  );
};
