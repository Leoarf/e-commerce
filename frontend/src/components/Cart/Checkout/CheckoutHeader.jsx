import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const CheckoutHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <button
        onClick={() => navigate('/collections/all')}
        className="flex items-center space-x-2 text-azurio hover:text-blue-700 font-medium mb-4 group"
      >
        <FiChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Shop</span>
      </button>
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Checkout</h1>
      <p className="text-gray-600 mt-2 text-sm md:text-base">
        Complete your purchase in a few simple steps
      </p>
    </div>
  );
};

export default CheckoutHeader;
