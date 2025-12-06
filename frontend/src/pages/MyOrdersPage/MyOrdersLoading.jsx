import React from 'react';

const MyOrdersLoading = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-center space-x-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-azurio"></div>
        <span className="text-gray-600">Loading your orders...</span>
      </div>
    </div>
  );
};

export default MyOrdersLoading;
