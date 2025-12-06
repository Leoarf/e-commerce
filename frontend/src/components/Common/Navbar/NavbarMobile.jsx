import React from 'react';
import SearchBar from '../SearchBar';

const NavbarMobile = () => (
  <div className="md:hidden py-3 border-t border-gray-100">
    <SearchBar />
  </div>
);

export default NavbarMobile;
