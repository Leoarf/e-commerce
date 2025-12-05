import React from 'react';
import { FaBox, FaDollarSign, FaTag } from 'react-icons/fa';

function BasicInfoCard({ productData, handleChange }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="p-5 md:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-azurio/10">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <FaBox className="h-5 w-5 mr-3 text-azurio" />
          Basic Information
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Product details and pricing
        </p>
      </div>
      <div className="p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio"
              placeholder="Enter product name"
              required
            />
          </div>
          {/* SKU */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SKU *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaTag className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="sku"
                value={productData.sku}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio"
                placeholder="Enter SKU"
                required
              />
            </div>
          </div>
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaDollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Count In Stock *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBox className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="countInStock"
                value={productData.countInStock}
                onChange={handleChange}
                min="0"
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio"
                placeholder="Enter quantity"
                required
              />
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio resize-none"
            rows={4}
            placeholder="Enter product description"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default BasicInfoCard;
