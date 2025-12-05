import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShoppingBag } from 'react-icons/hi2';
import SearchBar from '../SearchBar';

const NavbarIcons = ({
  user,
  cartItemCount,
  toggleCartDrawer,
  showSearch = true,
}) => (
  <>
    {user?.role === 'admin' && (
      <Link
        to="/admin"
        className="hidden sm:block px-3 py-1.5 bg-azurio/10 text-azurio text-xs font-semibold rounded-full hover:bg-azurio hover:text-white transition-all duration-300"
      >
        Admin
      </Link>
    )}
    <Link
      to="/profile"
      className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 group relative"
    >
      <HiOutlineUser className="h-5 w-5 text-gray-600 group-hover:text-azurio" />
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-azurio rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
    </Link>
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
    {showSearch && (
      <div className="hidden md:block">
        <SearchBar />
      </div>
    )}
  </>
);

export default NavbarIcons;
