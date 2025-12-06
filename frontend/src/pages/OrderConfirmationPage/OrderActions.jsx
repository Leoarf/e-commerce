import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiHome } from 'react-icons/fi';

export const OrderActions = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/my-orders')}
          className="p-4 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col items-center justify-center space-y-2"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FiShoppingBag className="h-5 w-5 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">View All Orders</span>
          <span className="text-xs text-gray-500 text-center">
            Track all your purchases
          </span>
        </button>
        <button
          onClick={() => navigate('/collections/all')}
          className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col items-center justify-center space-y-2"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FiHome className="h-5 w-5 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">Continue Shopping</span>
          <span className="text-xs text-gray-500 text-center">
            Discover more amazing products
          </span>
        </button>
      </div>
    </div>
  );
};
