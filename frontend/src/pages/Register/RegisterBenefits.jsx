import React from 'react';

export const RegisterBenefits = () => {
  const benefits = [
    {
      title: 'Free Shipping',
      description: 'On orders over $100',
    },
    {
      title: 'Exclusive Access',
      description: 'To new collections',
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 text-center">
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-blue-50 to-azurio/10 p-4 rounded-xl border border-blue-100"
        >
          <div className="text-lg font-semibold text-gray-900 mb-1">
            {benefit.title}
          </div>
          <div className="text-sm text-gray-600">{benefit.description}</div>
        </div>
      ))}
    </div>
  );
};
