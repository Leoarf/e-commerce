import React from 'react';

const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-48 md:h-56 mb-3"></div>
          <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded mb-2"></div>
          <div className="h-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
