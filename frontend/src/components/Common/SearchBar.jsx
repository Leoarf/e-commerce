import React from 'react';
import { useState } from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchProductsByFilters,
  setFilters,
} from '../../redux/slices/productsSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        const input = document.querySelector('#search-input');
        if (input) input.focus();
      }, 100);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;

    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    const input = document.querySelector('#search-input');
    if (input) input.focus();
  };

  return (
    <div className="relative">
      {/* Botão de pesquisa (visível quando fechado) */}
      {!isOpen && (
        <button
          onClick={handleSearchToggle}
          className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:scale-105 group"
          aria-label="Open search"
        >
          <HiMagnifyingGlass className="h-4 w-4 md:h-5 md:w-5 text-gray-600 group-hover:text-azurio transition-colors" />
        </button>
      )}

      {/* Overlay de fundo quando aberto */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={handleSearchToggle}
        />
      )}

      {/* Barra de pesquisa (visível quando aberto) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-300 ease-out ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white shadow-xl border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center space-x-2 md:space-x-4">
                {/* Campo de busca */}
                <div className="flex-1 relative">
                  <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2">
                    <HiMagnifyingGlass className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                  </div>

                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-300 md:border-2 md:border-gray-200 rounded-lg md:rounded-xl pl-9 md:pl-12 pr-8 md:pr-12 py-2 md:py-3 text-sm md:text-base text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-azurio focus:border-transparent transition-all"
                    autoComplete="off"
                  />

                  {/* Botão limpar (só aparece quando há texto) */}
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Clear search"
                    >
                      <HiMiniXMark className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  )}
                </div>

                {/* Botão de busca */}
                <button
                  type="submit"
                  className="px-3 py-2 md:px-5 md:py-3 bg-gradient-to-r from-azurio to-blue-600 text-white text-sm md:text-base font-medium md:font-semibold rounded-lg md:rounded-xl hover:shadow transition-all flex items-center space-x-1 md:space-x-2 min-w-[80px] md:min-w-[100px] justify-center"
                  disabled={!searchTerm.trim()}
                >
                  <HiMagnifyingGlass className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline">Search</span>
                  <span className="sm:hidden">Go</span>
                </button>

                {/* Botão fechar */}
                <button
                  type="button"
                  onClick={handleSearchToggle}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close search"
                >
                  <HiMiniXMark className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;