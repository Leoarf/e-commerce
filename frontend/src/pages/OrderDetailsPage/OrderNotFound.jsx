import React from 'react';
import { FiPackage } from 'react-icons/fi';

export const OrderNotFound = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPackage className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Order not found
          </h3>
          <p className="text-gray-600 mb-6">
            The order you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/my-orders')}
            className="px-6 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
};
