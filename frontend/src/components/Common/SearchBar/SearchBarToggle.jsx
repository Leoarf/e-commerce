import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const SearchBarToggle = ({ isOpen, onToggle }) => {
  if (isOpen) return null;

  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:scale-105 group"
      aria-label="Open search"
    >
      <HiMagnifyingGlass className="h-4 w-4 md:h-5 md:w-5 text-gray-600 group-hover:text-azurio transition-colors" />
    </button>
  );
};

export default SearchBarToggle;
