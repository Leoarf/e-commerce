import React from 'react';

const ProductDetailsSelection = ({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
}) => {
  return (
    <>
      {/* Color Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Color:{' '}
          <span className="font-normal text-gray-600">
            {selectedColor || 'Select'}
          </span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorSelect(color)}
              className={`relative w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                selectedColor === color
                  ? 'border-gray-900 scale-110 shadow-lg'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: color.toLowerCase() }}
              />
              {selectedColor === color && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Size Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Size:{' '}
          <span className="font-normal text-gray-600">
            {selectedSize || 'Select'}
          </span>
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeSelect(size)}
              className={`py-3 rounded-lg border transition-all duration-300 font-medium ${
                selectedSize === size
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsSelection;
