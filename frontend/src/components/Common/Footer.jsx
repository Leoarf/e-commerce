import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { FiPhoneCall, FiMail, FiMapPin, FiCreditCard } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { SiPaypal } from 'react-icons/si';

const Footer = () => {
  const navigate = useNavigate();

  // Função para rolar até o topo ao clicar em links de coleções
  const handleCollectionClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');

    // Navega para a rota
    navigate(href);

    // Rola até o topo da página
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Top Section */}
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 md:py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Brand & Newsletter */}
          <div className="px-1 sm:px-2">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-azurio to-blue-400 bg-clip-text text-transparent">
                Azurio
              </h2>
              <p className="text-gray-400 mt-2 max-w-md text-sm sm:text-base">
                Elevating everyday style with premium collections designed for
                modern living.
              </p>
            </div>
            {/* Newsletter */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-700">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <HiOutlineMail className="h-5 w-5 sm:h-6 sm:w-6 text-azurio" />
                <h3 className="text-lg sm:text-xl font-semibold">
                  Stay Updated
                </h3>
              </div>
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                Subscribe to our newsletter for exclusive updates, early access,
                and special offers.
              </p>
              <form className="space-y-3 sm:space-y-4">
                <div className="w-full">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-azurio focus:border-transparent transition-all text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-medium rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-azurio/20 transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center sm:text-left">
                  By subscribing, you agree to our Privacy Policy
                </p>
              </form>
            </div>
          </div>
          {/* Right Column - Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {/* Collections */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 pb-2 border-b border-gray-700 inline-block">
                Collections
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a
                    href="collections/all?category=Top+Wear&gender=Men&size=&material=&brand=&maxPrice=100"
                    onClick={handleCollectionClick}
                    className="text-gray-400 hover:text-azurio transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-azurio flex-shrink-0"></span>
                    Men's Top Wear
                  </a>
                </li>
                <li>
                  <a
                    href="collections/all?category=Top+Wear&gender=Women&size=&material=&brand=&maxPrice=100"
                    onClick={handleCollectionClick}
                    className="text-gray-400 hover:text-azurio transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-azurio flex-shrink-0"></span>
                    Women's Top Wear
                  </a>
                </li>
                <li>
                  <a
                    href="collections/all?category=Bottom+Wear&gender=Men&size=&material=&brand=&maxPrice=100"
                    onClick={handleCollectionClick}
                    className="text-gray-400 hover:text-azurio transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-azurio flex-shrink-0"></span>
                    Men's Bottom Wear
                  </a>
                </li>
                <li>
                  <a
                    href="collections/all?category=Bottom+Wear&gender=Women&size=&material=&brand=&maxPrice=100"
                    onClick={handleCollectionClick}
                    className="text-gray-400 hover:text-azurio transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-azurio flex-shrink-0"></span>
                    Women's Bottom Wear
                  </a>
                </li>
                <li>
                  <a
                    href="/collections/all"
                    onClick={handleCollectionClick}
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
                {[
                  'Contact Us',
                  'Shipping & Returns',
                  'Size Guide',
                  'FAQs',
                  'Privacy Policy',
                  'Terms of Service',
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                    >
                      {item}
                    </Link>
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
                {/* Contact Info */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 text-gray-400 text-sm sm:text-base">
                    <FiPhoneCall className="h-4 w-4 flex-shrink-0" />
                    <span>0123-456-789</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm sm:text-base">
                    <FiMail className="h-4 w-4 flex-shrink-0" />
                    <span>support@azurio.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm sm:text-base">
                    <FiMapPin className="h-4 w-4 flex-shrink-0" />
                    <span>123 Fashion St, New York</span>
                  </div>
                </div>
                {/* Social Media */}
                <div>
                  <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    Follow Us
                  </p>
                  <div className="flex gap-2 sm:gap-3">
                    {[
                      {
                        icon: <TbBrandMeta className="h-4 w-4 sm:h-5 sm:w-5" />,
                        bg: 'hover:bg-blue-600',
                      },
                      {
                        icon: (
                          <IoLogoInstagram className="h-4 w-4 sm:h-5 sm:w-5" />
                        ),
                        bg: 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600',
                      },
                      {
                        icon: (
                          <RiTwitterXLine className="h-4 w-4 sm:h-5 sm:w-5" />
                        ),
                        bg: 'hover:bg-black',
                      },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href="#"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-300 hover:scale-110"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
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
              <div className="flex flex-wrap justify-center gap-2">
                <div className="flex items-center gap-1 bg-gray-800/80 px-2 py-1 rounded text-xs">
                  <SiPaypal className="h-3 w-3 text-blue-400" />
                  <span className="text-gray-300">PayPal</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-800/80 px-2 py-1 rounded text-xs">
                  <FiCreditCard className="h-3 w-3 text-green-400" />
                  <span className="text-gray-300">Credit Card</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-800/80 px-2 py-1 rounded text-xs">
                  <FiCreditCard className="h-3 w-3 text-purple-400" />
                  <span className="text-gray-300">Debit Card</span>
                </div>
              </div>
            </div>
            <div className="text-gray-500 text-xs sm:text-sm flex flex-wrap justify-center gap-1 sm:gap-2">
              <Link to="#" className="hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="#" className="hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="#" className="hover:text-gray-300 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative Element */}
      <div className="h-px bg-gradient-to-r from-transparent via-azurio to-transparent"></div>
    </footer>
  );
};

export default Footer;
