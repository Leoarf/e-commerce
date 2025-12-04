import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FaSortDown,
  FaSortAmountUp,
  FaSortAmountDown,
  FaFire,
} from 'react-icons/fa';

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set('sortBy', sortBy);
    setSearchParams(searchParams);
  };

  // Obter o ícone baseado no valor selecionado
  const getCurrentIcon = () => {
    const currentSort = searchParams.get('sortBy') || '';
    switch (currentSort) {
      case 'priceAsc':
        return <FaSortAmountUp className="inline mr-2" />;
      case 'priceDesc':
        return <FaSortAmountDown className="inline mr-2" />;
      case 'popularity':
        return <FaFire className="inline mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-end mb-6">
      <div className="relative inline-block w-64">
        <label
          htmlFor="sort"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Sort by
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {getCurrentIcon()}
          </div>
          <select
            id="sort"
            onChange={handleSortChange}
            value={searchParams.get('sortBy') || ''}
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-10 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors cursor-pointer"
          >
            <option value="">Default Sorting</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="popularity">Most Popular</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
            <FaSortDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortOptions;
