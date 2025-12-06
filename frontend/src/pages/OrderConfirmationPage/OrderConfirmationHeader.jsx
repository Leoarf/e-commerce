import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

export const OrderConfirmationHeader = ({ user }) => {
  return (
    <div className="text-center mb-12">
      <div className="relative inline-block">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <FiCheckCircle className="h-12 w-12 md:h-16 md:w-16 text-emerald-600" />
        </div>
        <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-yellow-600 font-bold text-lg">✓</span>
          </div>
        </div>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
        Order Confirmed!
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Thank you for your purchase, {user?.name?.split(' ')[0] || 'Customer'}!
        We're preparing your order for shipment.
      </p>
    </div>
  );
};
