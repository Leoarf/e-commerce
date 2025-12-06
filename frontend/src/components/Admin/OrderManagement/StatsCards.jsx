import React from 'react';
import { FaDollarSign, FaShoppingCart, FaClock } from 'react-icons/fa';

const StatsCards = ({ totalOrders, totalRevenue, pendingOrders }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
      {/* Total Orders */}
      <div className="bg-gradient-to-br from-blue-50 to-azurio/10 border border-blue-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-gradient-to-r from-azurio to-blue-500 rounded-lg">
            <FaShoppingCart className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
            Total
          </span>
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">Total Orders</h3>
        <div className="flex items-baseline">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            {totalOrders}
          </p>
          <span className="text-sm text-gray-500 ml-2">orders</span>
        </div>
      </div>
      {/* Total Revenue */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
            <FaDollarSign className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2.5 py-1 rounded-full">
            Revenue
          </span>
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">
          Total Revenue
        </h3>
        <div className="flex items-baseline">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            ${totalRevenue.toFixed(2)}
          </p>
          <span className="text-sm text-gray-500 ml-2">USD</span>
        </div>
      </div>
      {/* Pending Orders */}
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg">
            <FaClock className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-2.5 py-1 rounded-full">
            Pending
          </span>
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">
          Pending Orders
        </h3>
        <div className="flex items-baseline">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            {pendingOrders}
          </p>
          <span className="text-sm text-gray-500 ml-2">to process</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
