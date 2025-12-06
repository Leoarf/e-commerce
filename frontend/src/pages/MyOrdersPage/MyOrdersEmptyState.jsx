import React from 'react';
import { FiPackage } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MyOrdersEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="p-12 text-center">
      <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <FiPackage className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No orders yet
      </h3>
      <p className="text-gray-600 mb-6">
        Start shopping to see your orders here
      </p>
      <button
        onClick={() => navigate('/collections/all')}
        className="px-6 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
      >
        Start Shopping
      </button>
    </div>
  );
};

export default MyOrdersEmptyState;
