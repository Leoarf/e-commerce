import React from 'react';
import ProductGridSkeleton from './ProductGrid/ProductGridSkeleton';
import ProductGridError from './ProductGrid/ProductGridError';
import ProductCard from './ProductGrid/ProductCard';
import { useProductGrid } from './ProductGrid/useProductGrid';

const ProductGrid = ({ products, loading, error }) => {
  const { getColorHex, formatBadgeText, renderStars } = useProductGrid();

  if (loading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return <ProductGridError error={error} />;
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          getColorHex={getColorHex}
          formatBadgeText={formatBadgeText}
          renderStars={renderStars}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
