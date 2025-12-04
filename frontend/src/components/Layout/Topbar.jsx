import React from 'react';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';

const Topbar = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <TbBrandMeta className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <IoLogoInstagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="X (Twitter)"
            >
              <RiTwitterXLine className="h-3.5 w-3.5" />
            </a>
          </div>
          {/* Main Message - Center */}
          <div className="text-center flex-1 px-2">
            <span className="text-xs sm:text-sm font-medium tracking-wide">
              <span className="hidden sm:inline">
                🌎 Global delivery made simple — speed and reliability
                guaranteed!
              </span>
              <span className="sm:hidden">🚚 Fast global delivery</span>
            </span>
          </div>
          {/* Contact Info - Desktop */}
          <div className="hidden md:block">
            <a
              href="tel:+1234567890"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              📞 +0 (123) 456-789
            </a>
          </div>
          {/* Social Links - Mobile (simplified) */}
          <div className="flex md:hidden items-center space-x-3">
            <a
              href="tel:+1234567890"
              className="text-xs font-medium p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              📞 Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
