import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from 'react-icons/hi2';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-azurio rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Azurio
                </span>
              </Link>
            </div>
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/collections/all?gender=Men"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-azurio hover:bg-gray-50 rounded-lg transition-all duration-300"
              >
                Men
              </Link>
              <Link
                to="/collections/all?gender=Women"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-azurio hover:bg-gray-50 rounded-lg transition-all duration-300"
              >
                Women
              </Link>
              <Link
                to="/collections/all?category=Top Wear"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-azurio hover:bg-gray-50 rounded-lg transition-all duration-300"
              >
                Top wear
              </Link>
              <Link
                to="/collections/all?category=Bottom Wear"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-azurio hover:bg-gray-50 rounded-lg transition-all duration-300"
              >
                Bottom wear
              </Link>
            </div>
            {/* Right Section - Icons & Search */}
            <div className="flex items-center space-x-3">
              {/* Admin Badge */}
              {user && user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="hidden sm:block px-3 py-1.5 bg-azurio/10 text-azurio text-xs font-semibold rounded-full hover:bg-azurio hover:text-white transition-all duration-300"
                >
                  Admin
                </Link>
              )}
              {/* Profile */}
              <Link
                to="/profile"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 group relative"
              >
                <HiOutlineUser className="h-5 w-5 text-gray-600 group-hover:text-azurio" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-azurio rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
              {/* Cart */}
              <button
                onClick={toggleCartDrawer}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 relative group"
              >
                <HiOutlineShoppingBag className="h-5 w-5 text-gray-600 group-hover:text-azurio" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-azurio text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    {cartItemCount}
                  </span>
                )}
              </button>
              {/* Search */}
              <div className="hidden md:block">
                <SearchBar />
              </div>
              {/* Mobile Menu Button */}
              <button
                onClick={toggleNavDrawer}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
          {/* Mobile Search Bar */}
          <div className="md:hidden py-3 border-t border-gray-100">
            <SearchBar />
          </div>
        </div>
      </nav>
      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 transform transition-all duration-300 ease-in-out ${
          navDrawerOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-full'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleNavDrawer}
        />
        {/* Drawer Panel */}
        <div className="relative w-80 max-w-full h-full bg-white shadow-xl">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-azurio rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Azurio</span>
            </div>
            <button
              onClick={toggleNavDrawer}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <IoMdClose className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          {/* Drawer Content */}
          <div className="p-6">
            <div className="space-y-1">
              {user && user.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={toggleNavDrawer}
                  className="flex items-center px-4 py-3 text-sm font-medium text-azurio bg-azurio/10 rounded-lg mb-4"
                >
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Collections
              </h3>
              <Link
                to="/collections/all?gender=Men"
                onClick={toggleNavDrawer}
                className="flex items-center px-4 py-3 text-gray-700 hover:text-azurio hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="font-medium">Men</span>
              </Link>
              <Link
                to="/collections/all?gender=Women"
                onClick={toggleNavDrawer}
                className="flex items-center px-4 py-3 text-gray-700 hover:text-azurio hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="font-medium">Women</span>
              </Link>
              <Link
                to="/collections/all?category=Top Wear"
                onClick={toggleNavDrawer}
                className="flex items-center px-4 py-3 text-gray-700 hover:text-azurio hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="font-medium">Top Wear</span>
              </Link>
              <Link
                to="/collections/all?category=Bottom Wear"
                onClick={toggleNavDrawer}
                className="flex items-center px-4 py-3 text-gray-700 hover:text-azurio hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="font-medium">Bottom Wear</span>
              </Link>
              <div className="pt-6 mt-6 border-t border-gray-100">
                <Link
                  to="/profile"
                  onClick={toggleNavDrawer}
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-azurio hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <HiOutlineUser className="h-5 w-5 mr-3" />
                  <span className="font-medium">My Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
