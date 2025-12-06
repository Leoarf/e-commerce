import React from 'react';

export const OrderDetailsLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-azurio"></div>
            <span className="text-gray-600">Loading order details...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
