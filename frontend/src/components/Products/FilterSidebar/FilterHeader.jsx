import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

export const FilterHeader = ({ activeFilterCount, onClearAll }) => (
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
        onClick={onClearAll}
        className="text-xs text-azurio hover:text-blue-700 font-medium flex items-center space-x-1 px-2 py-1 hover:bg-azurio/5 rounded"
      >
        <FiX className="h-3 w-3" />
        <span>Clear</span>
      </button>
    )}
  </div>
);
