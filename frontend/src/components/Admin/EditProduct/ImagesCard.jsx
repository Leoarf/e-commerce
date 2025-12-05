import React from 'react';
import { FaImage, FaSpinner, FaTimes, FaUpload } from 'react-icons/fa';

function ImagesCard({
  productData,
  uploading,
  handleImageUpload,
  handleRemoveImage,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="p-5 md:p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-emerald-100/50">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <FaImage className="h-5 w-5 mr-3 text-emerald-600" />
          Product Images
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Upload and manage product images
        </p>
      </div>
      <div className="p-5 md:p-6">
        {/* Upload Area */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Upload image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg mb-3">
                <FaUpload className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-gray-700 font-medium">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
                disabled={uploading}
              />
            </label>
          </div>
          {uploading && (
            <div className="mt-4 flex items-center justify-center text-emerald-600">
              <FaSpinner className="h-4 w-4 animate-spin mr-2" />
              Uploading image...
            </div>
          )}
        </div>
        {/* Current Images */}
        {productData.images.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Current Images ({productData.images.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {productData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={image.url}
                      alt={image.altText || 'Product Image'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImagesCard;
