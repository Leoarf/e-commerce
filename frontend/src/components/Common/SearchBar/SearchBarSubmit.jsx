import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { SEARCH_CONFIG } from './searchBarConfig';

const SearchBarSubmit = ({ searchTerm }) => {
  return (
    <button
      type="submit"
      className="px-3 py-2 md:px-5 md:py-3 bg-gradient-to-r from-azurio to-blue-600 text-white text-sm md:text-base font-medium md:font-semibold rounded-lg md:rounded-xl hover:shadow transition-all flex items-center space-x-1 md:space-x-2 min-w-[80px] md:min-w-[100px] justify-center"
      disabled={!searchTerm.trim()}
      aria-label={SEARCH_CONFIG.ariaLabels.submit}
    >
      <HiMagnifyingGlass className="h-4 w-4 md:h-5 md:w-5" />
      <span className="hidden sm:inline">
        {SEARCH_CONFIG.buttonLabels.search}
      </span>
      <span className="sm:hidden">{SEARCH_CONFIG.buttonLabels.go}</span>
    </button>
  );
};

export default SearchBarSubmit;
