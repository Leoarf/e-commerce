import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  FiTag,
  FiUsers,
  FiDroplet,
  FiTrendingUp,
  FiLayers,
  FiStar,
  FiDollarSign,
  FiX,
  FiCheck,
  FiFilter,
} from 'react-icons/fi';

const FilterSidebar = () => {
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

  const categories = ['Top Wear', 'Bottom Wear'];
  const colors = [
    { name: 'Red', hex: '#EF4444' },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Black', hex: '#000000' },
    { name: 'Green', hex: '#10B981' },
    { name: 'Yellow', hex: '#F59E0B' },
    { name: 'Gray', hex: '#6B7280' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Pink', hex: '#EC4899' },
    { name: 'Navy', hex: '#1E40AF' },
  ];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const materials = [
    'Cotton',
    'Cotton Blend',
    'Denim',
    'Viscose',
    'Fleece',
    'Polyester',
    'Linen Blend',
    'Wool Blend',
    'Silk Blend',
  ];
  const brands = [
    'Urban Threads',
    'Modern Fit',
    'Street Style',
    'Beach Breeze',
    'Urban Chic',
    'Polo Classics',
    'Street Vibes',
    'Heritage Wear',
    'Winter Basics',
    'Everyday Comfort',
    'ActiveWear',
    'UrbanStyle',
    'ChillZone',
    'DenimCo',
    'SportX',
    'ExecutiveStyle',
    'StreetWear',
    'LoungeWear',
    'ElegantStyle',
    'DenimStyle',
    'ElegantWear',
    'ComfyFit',
    'ChicStyle',
    'BreezyVibes', // Not all brands currently featured in backend products are included!
  ];
  const genders = ['Men', 'Women'];

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleFilterChange = (e) => {
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
  };

  const handleColorClick = (colorName) => {
    const newFilters = {
      ...filters,
      color: filters.color === colorName ? '' : colorName,
    };
    setFilters(newFilters);
    updateURLParams(newFilters);
    scrollToTop();
  };

  const updateURLParams = (newFilters) => {
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
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value);
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const clearAllFilters = () => {
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
  };

  const activeFilterCount = Object.keys(filters).reduce((count, key) => {
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

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      {/* Header Compacto */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-azurio/10 to-blue-100 rounded flex items-center justify-center">
            <FiFilter className="h-3 w-3 text-azurio" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
            <p className="text-xs text-gray-500">
              {activeFilterCount > 0
                ? `${activeFilterCount} active`
                : 'No filters applied'}
            </p>
          </div>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-azurio hover:text-blue-700 font-medium flex items-center space-x-1 px-2 py-1 hover:bg-azurio/5 rounded"
          >
            <FiX className="h-3 w-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {/* Category Filter */}
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-gray-700 mb-1">
            <FiTag className="h-3 w-3" />
            <h3 className="text-xs font-medium">Category</h3>
          </div>
          <div className="flex flex-wrap gap-1">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={handleFilterChange}
                  checked={filters.category === category}
                  className="sr-only"
                  id={`category-${category}`}
                />
                <label
                  htmlFor={`category-${category}`}
                  className={`text-xs px-2 py-1 rounded cursor-pointer transition-colors ${
                    filters.category === category
                      ? 'bg-azurio text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Filter */}
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-gray-700 mb-1">
            <FiUsers className="h-3 w-3" />
            <h3 className="text-xs font-medium">Gender</h3>
          </div>
          <div className="flex flex-wrap gap-1">
            {genders.map((gender) => (
              <div key={gender} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  onChange={handleFilterChange}
                  checked={filters.gender === gender}
                  className="sr-only"
                  id={`gender-${gender}`}
                />
                <label
                  htmlFor={`gender-${gender}`}
                  className={`text-xs px-2 py-1 rounded cursor-pointer transition-colors ${
                    filters.gender === gender
                      ? 'bg-azurio text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {gender}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-gray-700 mb-1">
            <FiDroplet className="h-3 w-3" />
            <h3 className="text-xs font-medium">Color</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {colors.map((color) => (
              <div
                key={color.name}
                onClick={() => handleColorClick(color.name)}
                className={`relative w-5 h-5 rounded-full cursor-pointer transition-transform ${
                  filters.color === color.name
                    ? 'ring-1 ring-offset-1 ring-azurio scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {filters.color === color.name && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FiCheck className="h-2.5 w-2.5 text-white" />
                  </div>
                )}
                {color.name === 'White' && (
                  <div className="absolute inset-0 border border-gray-300 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-gray-700 mb-1">
            <FiTrendingUp className="h-3 w-3" />
            <h3 className="text-xs font-medium">Size</h3>
          </div>
          <div className="flex flex-wrap gap-1">
            {sizes.map((size) => (
              <div key={size} className="flex items-center">
                <input
                  type="checkbox"
                  name="size"
                  value={size}
                  onChange={handleFilterChange}
                  checked={filters.size.includes(size)}
                  className="sr-only"
                  id={`size-${size}`}
                />
                <label
                  htmlFor={`size-${size}`}
                  className={`text-xs w-6 h-6 flex items-center justify-center rounded cursor-pointer transition-colors ${
                    filters.size.includes(size)
                      ? 'bg-azurio text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-700">
              <FiDollarSign className="h-3 w-3" />
              <h3 className="text-xs font-medium">Price</h3>
            </div>
            <span className="text-xs font-bold text-azurio">
              ${priceRange[1]}
            </span>
          </div>
          <div className="relative pt-1">
            <input
              type="range"
              name="priceRange"
              min={0}
              max={100}
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full h-1.5 bg-gradient-to-r from-azurio to-blue-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:shadow-sm"
            />
          </div>
          <div className="flex items-center justify-between text-gray-600 text-xs">
            <span>$0</span>
            <span className="text-gray-500">Max</span>
            <span>$100</span>
          </div>
        </div>

        {/* Material Filter */}
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-gray-700 mb-1">
            <FiLayers className="h-3 w-3" />
            <h3 className="text-xs font-medium">Material</h3>
          </div>
          <div className="max-h-32 overflow-y-auto pr-1 space-y-0.5">
            {materials.map((material) => (
              <div key={material} className="flex items-center">
                <input
                  type="checkbox"
                  name="material"
                  value={material}
                  onChange={handleFilterChange}
                  checked={filters.material.includes(material)}
                  className="sr-only"
                  id={`material-${material}`}
                />
                <label
                  htmlFor={`material-${material}`}
                  className={`flex items-center w-full px-1.5 py-1 rounded text-xs cursor-pointer transition-colors ${
                    filters.material.includes(material)
                      ? 'bg-azurio/10 text-azurio'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded border mr-1.5 flex items-center justify-center ${
                      filters.material.includes(material)
                        ? 'bg-azurio border-azurio'
                        : 'border-gray-300'
                    }`}
                  >
                    {filters.material.includes(material) && (
                      <FiCheck className="h-2 w-2 text-white" />
                    )}
                  </div>
                  <span className="truncate">{material}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-gray-700 mb-1">
            <FiStar className="h-3 w-3" />
            <h3 className="text-xs font-medium">Brand</h3>
          </div>
          <div className="max-h-32 overflow-y-auto pr-1 space-y-0.5">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  name="brand"
                  value={brand}
                  onChange={handleFilterChange}
                  checked={filters.brand.includes(brand)}
                  className="sr-only"
                  id={`brand-${brand}`}
                />
                <label
                  htmlFor={`brand-${brand}`}
                  className={`flex items-center w-full px-1.5 py-1 rounded text-xs cursor-pointer transition-colors ${
                    filters.brand.includes(brand)
                      ? 'bg-azurio/10 text-azurio'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded border mr-1.5 flex items-center justify-center ${
                      filters.brand.includes(brand)
                        ? 'bg-azurio border-azurio'
                        : 'border-gray-300'
                    }`}
                  >
                    {filters.brand.includes(brand) && (
                      <FiCheck className="h-2 w-2 text-white" />
                    )}
                  </div>
                  <span className="truncate">{brand}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
