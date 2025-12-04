import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiStar } from 'react-icons/fi';
import { FiTrendingUp } from 'react-icons/fi';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
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
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <FiTrendingUp className="h-6 w-6 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Error Loading Products
        </h3>
        <p className="text-gray-600 mb-4 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gradient-to-r from-azurio to-blue-600 text-white font-medium rounded-lg hover:shadow transition-all text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  // Função para mapear cores para valores hexadecimais
  const getColorHex = (colorName) => {
    const colorMap = {
      Blue: '#3B82F6',
      Black: '#000000',
      Red: '#EF4444',
      Green: '#10B981',
      Yellow: '#F59E0B',
      Gray: '#6B7280',
      White: '#FFFFFF',
      Pink: '#EC4899',
      Navy: '#1E40AF',
      Denim: '#1560BD',
    };
    return colorMap[colorName] || '#6B7280';
  };

  // Função para formatar textos longos nos badges
  const formatBadgeText = (text) => {
    if (!text) return 'N/A';

    if (text.length > 10) {
      const formatted = text.replace(/([A-Z])/g, ' $1').trim();
      if (formatted.length <= 12) return formatted;
      return text.substring(0, 10) + '...';
    }

    return text;
  };

  // Função para renderizar as estrelas de rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Estrelas cheias
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FiStar
          key={`full-${i}`}
          className="h-2.5 w-2.5 text-amber-400 fill-amber-400 flex-shrink-0"
        />
      );
    }

    // Meia estrela
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative h-2.5 w-2.5 flex-shrink-0">
          <FiStar className="absolute h-2.5 w-2.5 text-gray-300" />
          <div className="absolute h-2.5 w-1.25 overflow-hidden">
            <FiStar className="h-2.5 w-2.5 text-amber-400 fill-amber-400" />
          </div>
        </div>
      );
    }

    // Estrelas vazias
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FiStar
          key={`empty-${i}`}
          className="h-2.5 w-2.5 text-gray-300 flex-shrink-0"
        />
      );
    }

    return stars;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
      {products.map((product) => {
        // Determinar cor do badge de estoque
        const getStockStatus = (countInStock) => {
          if (countInStock === 0)
            return { text: 'SOLD OUT', color: 'bg-red-500' };
          if (countInStock < 10)
            return { text: 'LOW STOCK', color: 'bg-amber-500' };
          return {
            text: 'IN STOCK',
            color: 'bg-gradient-to-r from-emerald-500 to-green-500',
          };
        };

        const stockStatus = getStockStatus(product.countInStock);

        return (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="group block"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
              {/* Product Image Container */}
              <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                {/* Main Image */}
                <img
                  src={
                    product.images[0]?.url ||
                    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop'
                  }
                  alt={product.images[0]?.altText || product.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                  <span
                    className={`px-2 py-1 text-white text-xs font-bold rounded-full ${stockStatus.color}`}
                  >
                    {stockStatus.text}
                  </span>
                </div>
              </div>
              {/* Product Info */}
              <div className="p-3 flex flex-col flex-grow">
                {/* Category & Brand */}
                <div className="flex flex-wrap items-center justify-between mb-1 gap-1">
                  <div className="flex flex-wrap items-center gap-1 min-w-0 flex-1">
                    {/* Category Badge */}
                    <span
                      className="text-xs font-medium text-azurio bg-azurio/10 px-1.5 py-0.5 rounded whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]"
                      title={product.category || 'Fashion'}
                    >
                      {formatBadgeText(product.category) || 'Fashion'}
                    </span>
                    {/* Brand Badge */}
                    <span
                      className="text-xs font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]"
                      title={product.brand || 'Brand'}
                    >
                      {formatBadgeText(product.brand) || 'Brand'}
                    </span>
                  </div>
                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center space-x-0.5 flex-shrink-0">
                      {renderStars(product.rating)}
                      <span className="text-xs font-medium text-gray-700 flex-shrink-0">
                        {product.rating.toFixed(1)}
                      </span>
                      {product.numReviews && (
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          ({product.numReviews})
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {/* Name */}
                <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                {/* Description */}
                <p className="text-xs text-gray-600 mb-2 line-clamp-1 flex-grow">
                  {product.description || 'Premium quality product'}
                </p>
                {/* Colors Variants */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-2">
                    <div className="flex items-center space-x-1 mb-0.5">
                      <span className="text-xs text-gray-500">Colors:</span>
                      <div className="flex space-x-0.5">
                        {product.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-2.5 h-2.5 rounded-full border border-gray-300"
                            style={{ backgroundColor: getColorHex(color) }}
                            title={color}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{product.colors.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center space-x-1 mb-0.5">
                      <span className="text-xs text-gray-500">Sizes:</span>
                      <div className="flex space-x-0.5">
                        {product.sizes.slice(0, 3).map((size, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-1 py-0.5 rounded"
                          >
                            {size}
                          </span>
                        ))}
                        {product.sizes.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{product.sizes.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* Price and Stock */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="min-w-0">
                    <div className="flex items-baseline">
                      <span className="text-base font-bold text-gray-900">
                        ${product.price?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                    {product.sku && (
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        SKU: {product.sku}
                      </p>
                    )}
                  </div>
                  {/* Stock Info */}
                  <div className="text-right flex-shrink-0 ml-1">
                    <p
                      className={`text-xs font-medium ${
                        product.countInStock === 0
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {product.countInStock === 0
                        ? 'Out'
                        : product.countInStock}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
