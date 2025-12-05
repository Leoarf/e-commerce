import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchProductsByFilters,
  setFilters,
} from '../../../redux/slices/productsSlice';

export const useSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    if (isOpen) {
      setSearchTerm('');
    }
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

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  return {
    searchTerm,
    isOpen,
    handleSearchToggle,
    handleSearch,
    handleClearSearch,
    updateSearchTerm,
  };
};
