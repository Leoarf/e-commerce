import React from 'react';
import { FiFilter } from 'react-icons/fi';

const EmptyState = ({ onClearFilters }) => {
  return (
    <div className="col-span-full bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-12 text-center mt-8">
      <div className="w-20 h-20 bg-gradient-to-r from-azurio/10 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <FiFilter className="h-10 w-10 text-azurio" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        No Products Found
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Try adjusting your filters or browse our entire collection.
      </p>
      <button
        onClick={onClearFilters}
        className="px-6 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default EmptyState;
