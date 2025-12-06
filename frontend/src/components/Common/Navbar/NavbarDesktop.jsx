import React from 'react';
import NavbarLogo from './NavbarLogo';
import NavbarLinks from './NavbarLinks';
import NavbarIcons from './NavbarIcons';
import { HiBars3BottomRight } from 'react-icons/hi2';

const NavbarDesktop = ({
  user,
  cartItemCount,
  toggleCartDrawer,
  toggleNavDrawer,
}) => {
  return (
    <div className="flex items-center justify-between h-16 md:h-20">
      <NavbarLogo />
      <NavbarLinks />
      <div className="flex items-center space-x-3">
        <NavbarIcons
          user={user}
          cartItemCount={cartItemCount}
          toggleCartDrawer={toggleCartDrawer}
          showSearch={true}
        />
        <button
          onClick={toggleNavDrawer}
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
        >
          <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default NavbarDesktop;
