import React from 'react';
import SearchBarInput from './SearchBarInput';
import SearchBarSubmit from './SearchBarSubmit';
import { HiMiniXMark } from 'react-icons/hi2';
import { SEARCH_CONFIG } from './searchBarConfig';

const SearchBarForm = ({
  isOpen,
  searchTerm,
  onSearch,
  onClear,
  onUpdateTerm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-300 ease-out ${
        isOpen
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white shadow-xl border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <form onSubmit={onSearch} className="relative">
            <div className="flex items-center space-x-2 md:space-x-4">
              <SearchBarInput
                searchTerm={searchTerm}
                onUpdateTerm={onUpdateTerm}
                onClear={onClear}
              />

              <SearchBarSubmit searchTerm={searchTerm} />

              <button
                type="button"
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={SEARCH_CONFIG.ariaLabels.close}
              >
                <HiMiniXMark className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBarForm;
