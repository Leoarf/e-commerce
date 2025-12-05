import React from 'react';
import { SHIPPING_CONFIG } from './checkoutConfig';

const PriceBreakdown = ({ cartSummary, shippingCost, totalWithShipping }) => {
  const isFreeShipping = shippingCost === 0;
  const needsMoreForFree = cartSummary.subtotal < SHIPPING_CONFIG.THRESHOLD;

  return (
    <div className="space-y-2 md:space-y-3 border-t border-gray-200 pt-4 md:pt-6">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-sm md:text-base">
          Subtotal ({cartSummary.totalItems} items)
        </span>
        <span className="font-medium text-sm md:text-base">
          ${cartSummary.subtotal.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 text-sm md:text-base">Shipping</span>
          {isFreeShipping ? (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              FREE
            </span>
          ) : (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
              STANDARD
            </span>
          )}
        </div>
        <span
          className={`font-medium text-sm md:text-base ${
            isFreeShipping ? 'text-green-600' : ''
          }`}
        >
          {isFreeShipping ? 'Free' : `$${shippingCost.toFixed(2)}`}
        </span>
      </div>

      {needsMoreForFree && <ShippingProgress subtotal={cartSummary.subtotal} />}

      <div className="border-t border-gray-300 pt-3 md:pt-4 mt-3 md:mt-4">
        <div className="flex justify-between items-center text-base md:text-lg font-bold">
          <span>Total</span>
          <div className="text-right">
            <div className="text-xl md:text-2xl text-azurio">
              ${totalWithShipping.toFixed(2)}
            </div>
            <div className="text-xs md:text-sm text-gray-500 font-normal">
              {isFreeShipping
                ? 'Free shipping applied'
                : 'Includes shipping fee'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShippingProgress = ({ subtotal }) => (
  <div className="mt-3 md:mt-4 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-azurio/10 rounded-lg md:rounded-xl border border-blue-100">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs md:text-sm font-medium text-gray-700">
        Free Shipping Progress
      </span>
      <span className="text-xs md:text-sm font-bold text-blue-600">
        ${subtotal.toFixed(2)} / ${SHIPPING_CONFIG.THRESHOLD}
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
      <div
        className="bg-gradient-to-r from-azurio to-blue-500 h-1.5 md:h-2 rounded-full transition-all duration-500"
        style={{
          width: `${Math.min(
            (subtotal / SHIPPING_CONFIG.THRESHOLD) * 100,
            100
          )}%`,
        }}
      ></div>
    </div>
    <p className="text-xs text-gray-600 mt-2">
      Add{' '}
      <span className="font-bold text-blue-600">
        ${(SHIPPING_CONFIG.THRESHOLD - subtotal).toFixed(2)}
      </span>{' '}
      more for free shipping
    </p>
  </div>
);

export default PriceBreakdown;
