import React from 'react';
import { FaPalette, FaRuler, FaTimes } from 'react-icons/fa';

function VariantsCard({
  productData,
  sizeInput,
  colorInput,
  handleSizeInputChange,
  handleSizeInputBlur,
  handleColorInputChange,
  handleColorInputBlur,
  handleRemoveSize,
  handleRemoveColor,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="p-5 md:p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-purple-100/50">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <FaPalette className="h-5 w-5 mr-3 text-purple-600" />
          Product Variants
        </h2>
        <p className="text-gray-500 text-sm mt-1">Manage sizes and colors</p>
      </div>
      <div className="p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sizes */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaRuler className="h-4 w-4 mr-2 text-blue-600" />
              Sizes (comma-separated)
            </label>
            <div className="relative">
              <input
                type="text"
                value={sizeInput}
                onChange={handleSizeInputChange}
                onBlur={handleSizeInputBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                placeholder="S, M, L, XL"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Type a size and press comma to add another
            </p>
            {productData.sizes.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Added Sizes:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {productData.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <FaTimes className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Colors */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaPalette className="h-4 w-4 mr-2 text-purple-600" />
              Colors (comma-separated)
            </label>
            <div className="relative">
              <input
                type="text"
                value={colorInput}
                onChange={handleColorInputChange}
                onBlur={handleColorInputBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                placeholder="Red, Blue, Green"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Type a color and press comma to add another
            </p>
            {productData.colors.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Added Colors:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {productData.colors.map((color, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                      {color}
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(index)}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        <FaTimes className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VariantsCard;
