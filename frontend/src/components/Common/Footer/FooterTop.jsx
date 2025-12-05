import React from 'react';
import FooterNewsletter from './FooterNewsletter';

const FooterTop = () => {
  return (
    <div className="px-1 sm:px-2">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-azurio to-blue-400 bg-clip-text text-transparent">
          Azurio
        </h2>
        <p className="text-gray-400 mt-2 max-w-md text-sm sm:text-base">
          Elevating everyday style with premium collections designed for modern
          living.
        </p>
      </div>
      <FooterNewsletter />
    </div>
  );
};

export default FooterTop;
