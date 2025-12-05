import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useFilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    color: '',
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || '',
      gender: params.gender || '',
      color: params.color || '',
      size: params.size ? params.size.split(',') : [],
      material: params.material ? params.material.split(',') : [],
      brand: params.brand ? params.brand.split(',') : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const updateURLParams = useCallback(
    (newFilters) => {
      const params = new URLSearchParams();
      Object.keys(newFilters).forEach((key) => {
        if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
          params.append(key, newFilters[key].join(','));
        } else if (newFilters[key] !== '') {
          if (key === 'maxPrice' && newFilters[key] == 100) {
            // Não adiciona o parâmetro
          } else {
            params.append(key, newFilters[key]);
          }
        }
      });
      setSearchParams(params);
      navigate(`?${params.toString()}`);
    },
    [navigate, setSearchParams]
  );

  const handleFilterChange = useCallback(
    (e) => {
      const { name, value, checked, type } = e.target;
      let newFilters = { ...filters };

      if (type === 'checkbox') {
        if (checked) {
          newFilters[name] = [...(newFilters[name] || []), value];
        } else {
          newFilters[name] = newFilters[name].filter((item) => item !== value);
        }
      } else {
        newFilters[name] = value;
      }

      setFilters(newFilters);
      updateURLParams(newFilters);
      scrollToTop();
    },
    [filters, updateURLParams, scrollToTop]
  );

  const handleColorClick = useCallback(
    (colorName) => {
      const newFilters = {
        ...filters,
        color: filters.color === colorName ? '' : colorName,
      };
      setFilters(newFilters);
      updateURLParams(newFilters);
      scrollToTop();
    },
    [filters, updateURLParams, scrollToTop]
  );

  const handlePriceChange = useCallback(
    (e) => {
      const newPrice = parseInt(e.target.value);
      setPriceRange([0, newPrice]);
      const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
      setFilters(newFilters);
      updateURLParams(newFilters);
    },
    [filters, updateURLParams]
  );

  const clearAllFilters = useCallback(() => {
    const resetFilters = {
      category: '',
      gender: '',
      color: '',
      size: [],
      material: [],
      brand: [],
      minPrice: 0,
      maxPrice: 100,
    };
    setFilters(resetFilters);
    setPriceRange([0, 100]);
    navigate('');
    scrollToTop();
  }, [navigate, scrollToTop]);

  const activeFilterCount = useMemo(() => {
    return Object.keys(filters).reduce((count, key) => {
      if (key === 'maxPrice') {
        const params = Object.fromEntries([...searchParams]);
        const hasMaxPriceInParams = params.maxPrice !== undefined;
        const isDefaultPrice = filters[key] == 100;

        if (!isDefaultPrice || (hasMaxPriceInParams && filters[key] != 100)) {
          return count + 1;
        }
        return count;
      } else if (key === 'minPrice') {
        const params = Object.fromEntries([...searchParams]);
        const hasMinPriceInParams = params.minPrice !== undefined;
        const isDefaultMinPrice = filters[key] == 0;

        if (!isDefaultMinPrice || (hasMinPriceInParams && filters[key] != 0)) {
          return count + 1;
        }
        return count;
      } else if (Array.isArray(filters[key])) {
        return count + filters[key].length;
      } else {
        return count + (filters[key] ? 1 : 0);
      }
    }, 0);
  }, [filters, searchParams]);

  return {
    filters,
    priceRange,
    activeFilterCount,
    handleFilterChange,
    handleColorClick,
    handlePriceChange,
    clearAllFilters,
  };
};
