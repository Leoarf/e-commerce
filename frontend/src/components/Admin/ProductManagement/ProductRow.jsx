import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaTags } from 'react-icons/fa';

const ProductRow = ({ product, getFirstImageUrl, getImageAlt, onDelete }) => {
  return (
    <tr
      key={product._id}
      className="hover:bg-gray-50 transition-colors duration-200"
    >
      <td className="px-5 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={getFirstImageUrl(product)}
              alt={getImageAlt(product)}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/48/48?text=${encodeURIComponent(
                  product.name.substring(0, 2)
                )}`;
              }}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {product.name}
            </div>
            <div className="text-xs text-gray-500">
              ID: {product._id.slice(-8).toUpperCase()}
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 whitespace-nowrap">
        <div className="text-sm font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </div>
      </td>
      <td className="px-5 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-mono">
          {product.sku || 'N/A'}
        </div>
      </td>
      <td className="px-5 py-4 whitespace-nowrap">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <FaTags className="h-3 w-3 mr-1.5" />
          {product.category || 'Uncategorized'}
        </div>
      </td>
      <td className="px-5 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center space-x-2">
          <Link
            to={`/product/${product._id}`}
            target="_blank"
            className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            title="View in store"
          >
            <FaEye className="h-3.5 w-3.5 mr-1.5" />
            View
          </Link>
          <Link
            to={`/admin/products/${product._id}/edit`}
            className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors duration-300"
            title="Edit product"
          >
            <FaEdit className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Link>
          <button
            onClick={() => onDelete(product._id)}
            className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-300"
            title="Delete product"
          >
            <FaTrash className="h-3.5 w-3.5 mr-1.5" />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
