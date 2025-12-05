import React from 'react';
import { useSearchBar } from './SearchBar/useSearchBar';
import SearchBarToggle from './SearchBar/SearchBarToggle';
import SearchBarOverlay from './SearchBar/SearchBarOverlay';
import SearchBarForm from './SearchBar/SearchBarForm';

const SearchBar = () => {
  const {
    searchTerm,
    isOpen,
    handleSearchToggle,
    handleSearch,
    handleClearSearch,
    updateSearchTerm,
  } = useSearchBar();

  return (
    <div className="relative">
      <SearchBarToggle isOpen={isOpen} onToggle={handleSearchToggle} />

      <SearchBarOverlay isOpen={isOpen} onClose={handleSearchToggle} />

      <SearchBarForm
        isOpen={isOpen}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        onUpdateTerm={updateSearchTerm}
        onClose={handleSearchToggle}
      />
    </div>
  );
};

export default SearchBar;
