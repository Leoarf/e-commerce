import React from 'react';
import { FiFilter } from 'react-icons/fi';

const MobileFilterButton = ({ activeFilterCount, onToggle }) => {
  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={onToggle}
        className="w-full py-3 bg-white border border-gray-300 rounded-xl flex items-center justify-center space-x-2 hover:border-azurio hover:bg-azurio/5 transition-all"
      >
        <FiFilter className="h-5 w-5 text-gray-600" />
        <span className="font-medium text-gray-900">Filters</span>
        {activeFilterCount > 0 && (
          <span className="px-2 py-0.5 bg-azurio text-white text-xs rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default MobileFilterButton;
