import React from 'react';
import { FiStar } from 'react-icons/fi';

const ProductDetailsInfo = ({
  name,
  rating,
  numReviews,
  price,
  description,
}) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FiStar
          key={`full-${i}`}
          className="h-5 w-5 text-amber-400 fill-amber-400"
        />
      );
    }

    // Half star
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

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FiStar key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div>
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
        {name}
      </h1>
      {/* Rating and Reviews */}
      <div className="flex items-center gap-4 mb-4">
        {rating && (
          <>
            <div className="flex items-center">{renderStars(rating)}</div>
            <span className="text-gray-700 font-medium">
              {rating.toFixed(1)}
            </span>
            <span className="text-gray-500">({numReviews || 0} reviews)</span>
          </>
        )}
      </div>
      {/* Price Section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold text-gray-900">
            ${price?.toFixed(2)}
          </span>
        </div>
      </div>
      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Description
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ProductDetailsInfo;
