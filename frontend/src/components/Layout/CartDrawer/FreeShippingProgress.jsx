import React from 'react';
import { FiTruck } from 'react-icons/fi';

const SHIPPING_THRESHOLD = 100;

export const FreeShippingProgress = ({ subtotal }) => {
  if (subtotal >= SHIPPING_THRESHOLD || subtotal <= 0) return null;

  const progressPercentage = Math.min(
    (subtotal / SHIPPING_THRESHOLD) * 100,
    100
  );
  const remainingAmount = (SHIPPING_THRESHOLD - subtotal).toFixed(2);

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-azurio/10 rounded-xl border border-blue-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <FiTruck className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            Free Shipping Progress
          </span>
        </div>
        <span className="text-sm font-bold text-blue-600">
          ${subtotal.toFixed(2)} / ${SHIPPING_THRESHOLD}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-azurio to-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-600 mt-2">
        Add <span className="font-bold text-blue-600">${remainingAmount}</span>{' '}
        more for free shipping
      </p>
    </div>
  );
};
