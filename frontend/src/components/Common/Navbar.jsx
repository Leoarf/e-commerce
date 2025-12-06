import React from 'react';
import { useNavbar } from './Navbar/useNavbar';
import NavbarDesktop from './Navbar/NavbarDesktop';
import NavbarMobile from './Navbar/NavbarMobile';
import NavbarDrawer from './Navbar/NavbarDrawer';
import CartDrawer from '../Layout/CartDrawer';

const Navbar = () => {
  const {
    drawerOpen,
    navDrawerOpen,
    cartItemCount,
    user,
    toggleCartDrawer,
    toggleNavDrawer,
  } = useNavbar();

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavbarDesktop
            user={user}
            cartItemCount={cartItemCount}
            toggleCartDrawer={toggleCartDrawer}
            toggleNavDrawer={toggleNavDrawer}
          />
          <NavbarMobile />
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      <NavbarDrawer
        navDrawerOpen={navDrawerOpen}
        toggleNavDrawer={toggleNavDrawer}
        user={user}
      />
    </>
  );
};

export default Navbar;
