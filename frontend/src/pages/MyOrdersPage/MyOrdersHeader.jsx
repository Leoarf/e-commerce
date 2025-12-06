import React from 'react';

const MyOrdersHeader = ({ orders, currentPage, totalPages }) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Order History</h2>
          <p className="text-gray-600 text-sm mt-1">
            Track and manage all your orders
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center space-x-4">
          {/* Status Legend */}
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-gray-600">Processing</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-gray-600">Shipped</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Delivered</span>
            </div>
          </div>
          {/* Page Info */}
          {orders.length > 0 && (
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersHeader;
