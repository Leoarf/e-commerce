import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ item }) => {
  const { label, icon: Icon, path, external = false } = item;

  if (external) {
    return (
      <a
        href={path}
        className="py-2.5 px-4 rounded-lg flex items-center space-x-3 transition-all duration-200 ease-out text-gray-300 hover:bg-gray-800/50 hover:text-white"
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-800 transition-colors duration-200">
          <Icon className="h-3.5 w-3.5" />
        </div>
        <span className="text-sm md:text-base">{label}</span>
      </a>
    );
  }

  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <div
          className={`
            py-2.5 px-4 rounded-lg flex items-center space-x-3 transition-all duration-200 ease-out
            ${
              isActive
                ? 'bg-gradient-to-r from-azurio/20 to-blue-600/20 text-white border-l-2 border-azurio'
                : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
            }
          `}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
              isActive ? 'bg-azurio' : 'bg-gray-800'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm md:text-base">{label}</span>
        </div>
      )}
    </NavLink>
  );
};

export default NavItem;
