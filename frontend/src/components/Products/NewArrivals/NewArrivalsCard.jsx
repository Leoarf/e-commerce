import React from 'react';
import { Link } from 'react-router-dom';

const NewArrivalsCard = ({ product }) => {
  return (
    <div className="min-w-[85%] md:min-w-[45%] lg:min-w-[30%] group relative">
      {/* Product Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative h-[500px] overflow-hidden">
          <img
            src={product.images[0]?.url}
            alt={product.images[0]?.altText || product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            draggable="false"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* New Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              NEW
            </span>
          </div>
        </div>
        {/* Product Info */}
        <div className="p-6">
          <Link to={`/product/${product._id}`} className="block">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description?.substring(0, 100)}...
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                {product.category}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsCard;
