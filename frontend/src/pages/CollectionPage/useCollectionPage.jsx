import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../../redux/slices/productsSlice';

export const useCollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Convert searchParams to an object only within the useEffect
    const queryParams = Object.fromEntries([...searchParams]);
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  const handleClickOutside = useCallback((e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    // Prevent body scrolling when sidebar is open
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarOpen, handleClickOutside]);

  // Calculate activeFilterCount based on the current searchParams
  const activeFilterCount = useCallback(() => {
    let count = 0;
    const queryParams = Object.fromEntries([...searchParams]); // Convert here

    // Do not count 'collection' as a filter
    Object.keys(queryParams).forEach((key) => {
      if (key === 'collection') return;

      const value = queryParams[key];
      if (!value) return;

      if (key === 'maxPrice') {
        // Only count maxPrice if it's different from 100
        if (parseInt(value) !== 100) count++;
      } else if (key === 'minPrice') {
        // Only count minPrice if it's not 0
        if (parseInt(value) !== 0) count++;
      } else if (key === 'size' || key === 'material' || key === 'brand') {
        // For arrays, count each item.
        const items = value.split(',');
        count += items.length;
      } else {
        // For other filters (category, gender, color)
        count++;
      }
    });

    return count;
  }, [searchParams])(); // Depend on searchParams

  const handleClearFilters = useCallback(() => {
    window.location.search = '';
  }, []);

  return {
    collection,
    products,
    loading,
    error,
    activeFilterCount,
    isSidebarOpen,
    sidebarRef,
    toggleSidebar,
    handleClearFilters,
  };
};
