import React from 'react';

const CollectionHeader = ({ collection }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize">
        {collection || 'All Collections'}
      </h1>
      <p className="text-gray-600 mt-2">
        Discover our curated collection of premium products
      </p>
    </div>
  );
};

export default CollectionHeader;
