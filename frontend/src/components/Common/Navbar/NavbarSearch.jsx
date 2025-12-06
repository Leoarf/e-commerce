import React from 'react';
import SearchBar from '../SearchBar';

const NavbarSearch = ({ isMobile = false }) => (
  <div
    className={
      isMobile ? 'md:hidden py-3 border-t border-gray-100' : 'hidden md:block'
    }
  >
    <SearchBar />
  </div>
);

export default NavbarSearch;
