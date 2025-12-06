import React from 'react';
import FooterPayments from './FooterPayments';
import { BOTTOM_LINKS } from './footerConfig';

const FooterBottom = () => {
  return (
    <div className="border-t border-gray-800">
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-7xl">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
            © 2025 Leonardo. All rights reserved.
          </p>
          <div className="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:items-center md:gap-4">
            <span className="text-gray-400 text-xs sm:text-sm">
              Accepting payments via
            </span>
            <FooterPayments />
          </div>
          <div className="text-gray-500 text-xs sm:text-sm flex flex-wrap justify-center gap-1 sm:gap-2">
            {BOTTOM_LINKS.map((label, index) => (
              <React.Fragment key={index}>
                <span className="text-gray-500 hover:text-gray-300 transition-colors duration-300 cursor-default">
                  {label}
                </span>
                {index < BOTTOM_LINKS.length - 1 && (
                  <span className="text-gray-600">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
