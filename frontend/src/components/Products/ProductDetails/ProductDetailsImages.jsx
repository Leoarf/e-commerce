import React from 'react';

const ProductDetailsImages = ({
  images,
  mainImage,
  isHovering,
  mousePosition,
  imageContainerRef,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onThumbnailClick,
}) => {
  return (
    <div className="space-y-6">
      {/* Main Image with Zoom Effect */}
      <div className="relative">
        <div
          ref={imageContainerRef}
          className="relative h-[650px] w-full rounded-2xl bg-gray-50 shadow-2xl overflow-hidden group"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
        >
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={mainImage}
              alt="Main Product"
              className={`w-full h-full object-cover object-top transition-all duration-500 ${
                isHovering ? 'scale-110 transform-gpu' : 'scale-100'
              }`}
              style={{
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              }}
            />
            {/* Overlay gradient to soften the effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          {/* Zoom indicator (only in hover) */}
          {isHovering && (
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
              Zoom
            </div>
          )}
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex space-x-4 overflow-x-auto pb-2 px-1">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onThumbnailClick(image.url)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              mainImage === image.url
                ? 'border-pink-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img
              src={image.url}
              alt={image.altText || `Thumbnail ${index}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsImages;
