import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo = () => (
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
);

export default NavbarLogo;
