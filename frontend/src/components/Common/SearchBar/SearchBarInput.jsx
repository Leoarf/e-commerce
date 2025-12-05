import React from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { SEARCH_CONFIG } from './searchBarConfig';

const SearchBarInput = ({ searchTerm, onUpdateTerm, onClear }) => {
  return (
    <div className="flex-1 relative">
      <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2">
        <HiMagnifyingGlass className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
      </div>

      <input
        id="search-input"
        type="text"
        placeholder={SEARCH_CONFIG.placeholder}
        value={searchTerm}
        onChange={(e) => onUpdateTerm(e.target.value)}
        className="w-full bg-white border border-gray-300 md:border-2 md:border-gray-200 rounded-lg md:rounded-xl pl-9 md:pl-12 pr-8 md:pr-12 py-2 md:py-3 text-sm md:text-base text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-azurio focus:border-transparent transition-all"
        autoComplete="off"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={SEARCH_CONFIG.ariaLabels.clear}
        >
          <HiMiniXMark className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBarInput;
