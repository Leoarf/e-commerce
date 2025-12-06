import React from 'react';
import { FiStar } from 'react-icons/fi';

const ProductDetailsSpecs = ({
  brand,
  material,
  rating,
  numReviews,
  category,
  id,
  countInStock,
}) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FiStar
          key={`full-${i}`}
          className="h-5 w-5 text-amber-400 fill-amber-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative h-5 w-5">
          <FiStar className="absolute h-5 w-5 text-gray-300" />
          <div className="absolute h-5 w-2.5 overflow-hidden">
            <FiStar className="h-5 w-5 text-amber-400 fill-amber-400" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FiStar key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Product Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Brand</h4>
            <p className="text-gray-900 font-semibold">{brand}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Material</h4>
            <p className="text-gray-900 font-semibold">{material}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Rating</h4>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {renderStars(rating || 0)}
              </div>
              <span className="text-gray-900 font-semibold">
                {(rating || 0).toFixed(1)}
              </span>
              <span className="text-gray-600">({numReviews || 0} reviews)</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Category</h4>
            <p className="text-gray-900 font-semibold">{category}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">SKU</h4>
            <p className="text-gray-900 font-semibold">{id.substring(0, 8)}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Stock Status</h4>
            <p
              className={`font-semibold ${
                countInStock > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {countInStock > 0
                ? `${countInStock} units in stock`
                : 'Out of stock'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSpecs;
