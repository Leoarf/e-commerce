import React from 'react';
import FooterSocial from './FooterSocial';
import FooterContact from './FooterContact';
import { COLLECTIONS_LINKS, SUPPORT_LINKS } from './footerConfig';

const FooterLinks = ({ handleCollectionClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
      {/* Collections */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 pb-2 border-b border-gray-700 inline-block">
          Collections
        </h3>
        <ul className="space-y-2 sm:space-y-3">
          {COLLECTIONS_LINKS.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                onClick={(e) => handleCollectionClick(e, link.href)}
                className="text-gray-400 hover:text-azurio transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base cursor-pointer"
              >
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-azurio flex-shrink-0"></span>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/collections/all"
              onClick={(e) => handleCollectionClick(e, '/collections/all')}
              className="text-azurio hover:text-blue-400 transition-colors duration-300 font-medium mt-3 sm:mt-4 inline-flex items-center gap-1 text-sm sm:text-base cursor-pointer"
            >
              View All Collections
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
      {/* Support */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 pb-2 border-b border-gray-700 inline-block">
          Support
        </h3>
        <ul className="space-y-2 sm:space-y-3">
          {SUPPORT_LINKS.map((item, index) => (
            <li key={index}>
              <span className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base cursor-default">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* Contact & Social */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 pb-2 border-b border-gray-700 inline-block">
          Connect
        </h3>
        <div className="space-y-4 sm:space-y-6">
          <FooterContact />
          <FooterSocial />
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
