import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { HiOutlineUser } from 'react-icons/hi2';
import { MOBILE_LINKS } from './navbarConfig';

const NavbarDrawer = ({ navDrawerOpen, toggleNavDrawer, user }) => (
  <div
    className={`fixed inset-0 z-50 transform transition-all duration-300 ease-in-out ${
      navDrawerOpen
        ? 'opacity-100 translate-x-0'
        : 'opacity-0 -translate-x-full'
    }`}
  >
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={toggleNavDrawer}
    />
    <div className="relative w-80 max-w-full h-full bg-white shadow-xl">
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
      <div className="p-6">
        <div className="space-y-1">
          {user?.role === 'admin' && (
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
          {MOBILE_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={toggleNavDrawer}
              className="flex items-center px-4 py-3 text-gray-700 hover:text-azurio hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
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
);

export default NavbarDrawer;
