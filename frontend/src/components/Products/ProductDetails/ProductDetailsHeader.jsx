import React from 'react';

const ProductDetailsHeader = ({ productName }) => {
  return (
    <div className="mb-8">
      <nav className="flex text-sm text-gray-600">
        <a href="/" className="hover:text-pink-600 transition-colors">
          Home
        </a>
        <span className="mx-2">/</span>
        <a
          href="/collections/all?"
          className="hover:text-pink-600 transition-colors"
        >
          Shop
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{productName}</span>
      </nav>
    </div>
  );
};

export default ProductDetailsHeader;
