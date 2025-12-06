import React from 'react';
import { STATS_CONFIG } from './userConfig';

const StatsCards = ({ totalUsers, adminCount, customerCount }) => {
  const statsData = [
    { value: totalUsers, label: 'users' },
    { value: adminCount, label: 'users' },
    { value: customerCount, label: 'users' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
      {STATS_CONFIG.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} border ${card.borderColor} rounded-xl p-5 md:p-6 shadow-sm`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-2.5 bg-gradient-to-r ${card.iconBg} rounded-lg`}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span
                className={`text-sm font-medium ${card.badgeColor} px-2.5 py-1 rounded-full`}
              >
                {card.badgeText}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">
              {card.title}
            </h3>
            <div className="flex items-baseline">
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                {statsData[index].value}
              </p>
              <span className="text-sm text-gray-500 ml-2">
                {statsData[index].label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
