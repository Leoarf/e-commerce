import React from 'react';

export const OrderSummarySection = ({
  orderDetails,
  subtotal,
  totalItemsCount,
  shippingCost,
  paymentStatus,
  formatCurrency,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            Subtotal ({totalItemsCount} items)
          </span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping</span>
          <span
            className={`font-medium ${
              shippingCost === 0 ? 'text-green-600' : ''
            }`}
          >
            {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
          </span>
        </div>
        {orderDetails.taxPrice && orderDetails.taxPrice > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">
              {formatCurrency(orderDetails.taxPrice)}
            </span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-4 mt-2">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-azurio">
              {formatCurrency(orderDetails.totalPrice)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {paymentStatus.text === 'Paid'
              ? 'Payment completed'
              : 'Payment pending'}
          </p>
        </div>
      </div>
    </div>
  );
};
