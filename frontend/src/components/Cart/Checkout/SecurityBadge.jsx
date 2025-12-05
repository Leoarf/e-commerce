import React from 'react';
import { FiShield, FiLock } from 'react-icons/fi';

const SecurityBadge = () => (
  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
      <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600">
        <FiShield className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
        <span>Secure Payment</span>
      </div>
      <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600">
        <FiLock className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
        <span>SSL Encrypted</span>
      </div>
    </div>
    <p className="text-center text-xs text-gray-500 mt-2 md:mt-3">
      Your payment information is encrypted and secure. We never store your
      credit card details.
    </p>
  </div>
);

export default SecurityBadge;
