import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

const ProductDetailsActions = ({ quantity, onQuantityChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
      <div className="flex items-center space-x-4 max-w-xs">
        <button
          onClick={() => onQuantityChange('minus')}
          className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
        >
          <FiMinus className="text-lg" />
        </button>
        <div className="flex-1 text-center">
          <span className="text-2xl font-bold text-gray-900">{quantity}</span>
        </div>
        <button
          onClick={() => onQuantityChange('plus')}
          className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
        >
          <FiPlus className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsActions;
