import React from 'react';
import { FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';

const ProductDetailsFeatures = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <FiTruck className="text-blue-600 text-lg" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">Free Shipping</h4>
          <p className="text-xs text-gray-600">On orders over $100</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <FiShield className="text-green-600 text-lg" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">
            2 Year Warranty
          </h4>
          <p className="text-xs text-gray-600">Quality guaranteed</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
          <FiRefreshCw className="text-yellow-600 text-lg" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">Easy Returns</h4>
          <p className="text-xs text-gray-600">30 days return policy</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsFeatures;
