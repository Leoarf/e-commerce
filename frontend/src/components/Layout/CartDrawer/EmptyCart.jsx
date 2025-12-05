import React from 'react';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';

export const EmptyCart = ({ onContinueShopping }) => (
  <div className="flex flex-col items-center justify-center h-full py-16 px-4 text-center">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <FiShoppingBag className="h-12 w-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
    <p className="text-gray-600 mb-8 max-w-sm">
      Looks like you haven't added any products to your cart yet.
    </p>
    <button
      onClick={onContinueShopping}
      className="px-6 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2 group"
    >
      <span>Start Shopping</span>
      <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);
