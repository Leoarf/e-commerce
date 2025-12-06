import React from 'react';
import SortOptions from '../../components/Products/SortOptions';

const ResultsHeader = ({ productsCount, activeFilterCount }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <p className="text-gray-600">
          Showing <span className="font-semibold">{productsCount}</span>{' '}
          products
        </p>
        {activeFilterCount > 0 && (
          <p className="text-sm text-azurio mt-1">
            {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''}{' '}
            applied
          </p>
        )}
      </div>
      {/* Sort Options */}
      <div className="w-full sm:w-auto">
        <SortOptions />
      </div>
    </div>
  );
};

export default ResultsHeader;
