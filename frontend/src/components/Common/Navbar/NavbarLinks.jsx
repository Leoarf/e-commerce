import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from './navbarConfig';

const NavbarLinks = () => (
  <div className="hidden md:flex items-center space-x-1">
    {NAV_LINKS.map((link) => (
      <Link
        key={link.label}
        to={link.path}
        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-azurio hover:bg-gray-50 rounded-lg transition-all duration-300"
      >
        {link.label}
      </Link>
    ))}
  </div>
);

export default NavbarLinks;
