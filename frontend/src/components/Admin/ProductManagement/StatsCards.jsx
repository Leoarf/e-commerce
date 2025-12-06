import React from 'react';
import { FaBox, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { STATS_CONFIG } from './productConfig';

const iconMap = {
  FaBox: FaBox,
  FaDollarSign: FaDollarSign,
  FaChartLine: FaChartLine,
};

const StatsCards = ({ totalProducts, totalValue, averagePrice }) => {
  const statsData = [
    { value: totalProducts, label: 'products', suffix: '' },
    { value: `$${totalValue.toFixed(2)}`, label: 'USD', suffix: '' },
    { value: `$${averagePrice}`, label: 'per item', suffix: '' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
      {STATS_CONFIG.map((card, index) => {
        const Icon = iconMap[card.icon];
        return (
          <div
            key={card.id}
            className={`bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} border ${card.borderColor} rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}
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
                {card.id === 'total'
                  ? 'Total'
                  : card.id === 'value'
                  ? 'Value'
                  : 'Average'}
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
