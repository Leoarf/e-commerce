import React from 'react';
import { FiCreditCard } from 'react-icons/fi';

export const PaymentInfoSection = ({ orderDetails, paymentStatus }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <FiCreditCard className="h-5 w-5 text-azurio" />
        <span>Payment Information</span>
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Method</span>
          <span className="font-medium capitalize">
            {orderDetails.paymentMethod || 'PayPal'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Status</span>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${paymentStatus.bgColor} ${paymentStatus.textColor}`}
          >
            {paymentStatus.text}
          </div>
        </div>
        {orderDetails.paidAt && (
          <div className="pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Paid on:</span>{' '}
              {new Date(orderDetails.paidAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
