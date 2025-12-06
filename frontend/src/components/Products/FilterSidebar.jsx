import React from 'react';
import { FilterHeader } from './FilterSidebar/FilterHeader';
import { FilterSection } from './FilterSidebar/FilterSection';
import { ColorFilter } from './FilterSidebar/ColorFilter';
import { PriceFilter } from './FilterSidebar/PriceFilter';
import { CheckboxFilter } from './FilterSidebar/CheckboxFilter';
import { RadioFilter } from './FilterSidebar/RadioFilter';
import { useFilterSidebar } from './FilterSidebar/useFilterSidebar';
import {
  categories,
  colors,
  sizes,
  materials,
  brands,
  genders,
} from './FilterSidebar/filterConfig';

const FilterSidebar = () => {
  const {
    filters,
    priceRange,
    activeFilterCount,
    handleFilterChange,
    handleColorClick,
    handlePriceChange,
    clearAllFilters,
  } = useFilterSidebar();

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <FilterHeader
        activeFilterCount={activeFilterCount}
        onClearAll={clearAllFilters}
      />
      <div className="space-y-3">
        {/* Category Filter */}
        <FilterSection title="Category" icon="tag">
          <RadioFilter
            name="category"
            options={categories}
            value={filters.category}
            onChange={handleFilterChange}
          />
        </FilterSection>
        {/* Gender Filter */}
        <FilterSection title="Gender" icon="users">
          <RadioFilter
            name="gender"
            options={genders}
            value={filters.gender}
            onChange={handleFilterChange}
          />
        </FilterSection>
        {/* Color Filter */}
        <FilterSection title="Color" icon="droplet">
          <ColorFilter
            colors={colors}
            selectedColor={filters.color}
            onColorClick={handleColorClick}
          />
        </FilterSection>
        {/* Size Filter */}
        <FilterSection title="Size" icon="trendingUp">
          <CheckboxFilter
            name="size"
            options={sizes}
            selectedOptions={filters.size}
            onChange={handleFilterChange}
            compact
          />
        </FilterSection>
        {/* Price Range Filter */}
        <FilterSection title="Price" icon="dollarSign">
          <PriceFilter
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
          />
        </FilterSection>
        {/* Material Filter */}
        <FilterSection title="Material" icon="layers">
          <CheckboxFilter
            name="material"
            options={materials}
            selectedOptions={filters.material}
            onChange={handleFilterChange}
            scrollable
          />
        </FilterSection>
        {/* Brand Filter */}
        <FilterSection title="Brand" icon="star">
          <CheckboxFilter
            name="brand"
            options={brands}
            selectedOptions={filters.brand}
            onChange={handleFilterChange}
            scrollable
          />
        </FilterSection>
      </div>
    </div>
  );
};

export default FilterSidebar;
