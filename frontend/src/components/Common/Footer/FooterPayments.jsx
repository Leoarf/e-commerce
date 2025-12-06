import React from 'react';
import { SiPaypal } from 'react-icons/si';
import { FiCreditCard } from 'react-icons/fi';
import { PAYMENT_METHODS } from './footerConfig';

const FooterPayments = () => {
  const getIcon = (icon, color) => {
    switch (icon) {
      case 'paypal':
        return <SiPaypal className={`h-3 w-3 ${color}`} />;
      case 'credit':
        return <FiCreditCard className={`h-3 w-3 ${color}`} />;
      default:
        return <FiCreditCard className={`h-3 w-3 ${color}`} />;
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {PAYMENT_METHODS.map((method, index) => (
        <div
          key={index}
          className="flex items-center gap-1 bg-gray-800/80 px-2 py-1 rounded text-xs"
        >
          {getIcon(method.icon, method.color)}
          <span className="text-gray-300">{method.label}</span>
        </div>
      ))}
    </div>
  );
};

export default FooterPayments;
