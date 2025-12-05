import React from 'react';
import { useFooter } from './Footer/useFooter';
import FooterTop from './Footer/FooterTop';
import FooterLinks from './Footer/FooterLinks';
import FooterBottom from './Footer/FooterBottom';

const Footer = () => {
  const { handleCollectionClick } = useFooter();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 md:py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <FooterTop />
          <FooterLinks handleCollectionClick={handleCollectionClick} />
        </div>
      </div>
      <FooterBottom />
      <div className="h-px bg-gradient-to-r from-transparent via-azurio to-transparent"></div>
    </footer>
  );
};

export default Footer;
