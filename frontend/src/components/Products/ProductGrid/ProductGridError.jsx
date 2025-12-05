import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';

const ProductGridError = ({ error }) => {
  return (
    <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6 text-center">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <FiTrendingUp className="h-6 w-6 text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Error Loading Products
      </h3>
      <p className="text-gray-600 mb-4 text-sm">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-gradient-to-r from-azurio to-blue-600 text-white font-medium rounded-lg hover:shadow transition-all text-sm"
      >
        Try Again
      </button>
    </div>
  );
};

export default ProductGridError;
