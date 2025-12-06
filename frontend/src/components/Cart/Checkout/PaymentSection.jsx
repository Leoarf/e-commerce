import React from 'react';
import { FiLock } from 'react-icons/fi';
import PayPalButton from '../PayPalButton';

const PaymentSection = ({ total, onSuccess }) => (
  <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
    <div className="flex items-center space-x-3 mb-4 md:mb-6">
      <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <FiLock className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
      </div>
      <div className="min-w-0">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 truncate">
          Payment Method
        </h2>
        <p className="text-gray-600 text-xs md:text-sm truncate">
          Complete your purchase securely
        </p>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="font-medium text-gray-900 text-sm md:text-base">
        Pay with PayPal
      </h3>
      <div className="bg-gray-50 p-4 md:p-6 rounded-lg md:rounded-xl border border-gray-200">
        <PayPalButton
          amount={total}
          onSuccess={onSuccess}
          onError={() => alert('Payment failed. Please try again.')}
        />
      </div>
      <p className="text-xs md:text-sm text-gray-500 text-center">
        You'll be redirected to PayPal to complete your payment
      </p>
    </div>
  </div>
);

export default PaymentSection;
