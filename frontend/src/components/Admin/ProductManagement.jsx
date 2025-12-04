import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProduct,
  fetchAdminProducts,
} from '../../redux/slices/adminProductSlice';
import {
  FaBox,
  FaDollarSign,
  FaEdit,
  FaEye,
  FaPlus,
  FaSpinner,
  FaTags,
  FaTrash,
  FaExclamationCircle,
  FaChartLine,
} from 'react-icons/fa';

function ProductManagement() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this product? This action cannot be undone.'
      )
    ) {
      dispatch(deleteProduct(id));
    }
  };

  // Calculate statistics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice =
    totalProducts > 0 ? (totalValue / totalProducts).toFixed(2) : 0;

  // Função para obter a primeira imagem do produto
  const getFirstImageUrl = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].url;
    }
    // Fallback para placeholder se não houver imagem
    return `https://via.placeholder.com/48/48?text=${encodeURIComponent(
      product.name.substring(0, 2)
    )}`;
  };

  // Função para obter o alt text da imagem
  const getImageAlt = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].altText || product.name;
    }
    return product.name;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Product Management
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Manage your product catalog and inventory
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-gradient-to-br from-blue-50 to-azurio/10 border border-blue-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-gradient-to-r from-azurio to-blue-500 rounded-lg">
              <FaBox className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
              Total
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Total Products
          </h3>
          <div className="flex items-baseline">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {totalProducts}
            </p>
            <span className="text-sm text-gray-500 ml-2">products</span>
          </div>
        </div>

        {/* Total Value */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <FaDollarSign className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2.5 py-1 rounded-full">
              Value
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Total Inventory Value
          </h3>
          <div className="flex items-baseline">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              ${totalValue.toFixed(2)}
            </p>
            <span className="text-sm text-gray-500 ml-2">USD</span>
          </div>
        </div>

        {/* Average Price */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
              <FaChartLine className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
              Average
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Average Price
          </h3>
          <div className="flex items-baseline">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              ${averagePrice}
            </p>
            <span className="text-sm text-gray-500 ml-2">per item</span>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                All Products
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Manage your product catalog, pricing and inventory
              </p>
            </div>
            <div className="mt-3 sm:mt-0 text-sm text-gray-500">
              {totalProducts} product{totalProducts !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <FaSpinner className="h-8 w-8 text-azurio animate-spin mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Loading products...
              </h3>
              <p className="text-gray-500">
                Please wait while we fetch product data
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <FaExclamationCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Error loading products
              </h3>
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <FaBox className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                Add your first product to get started
              </p>
              <Link
                to="/admin/products/new"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <FaPlus className="h-4 w-4 mr-2" />
                Add First Product
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    SKU
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
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
                              // Fallback para placeholder se a imagem falhar
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
                          onClick={() => handleDelete(product._id)}
                          className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-300"
                          title="Delete product"
                        >
                          <FaTrash className="h-3.5 w-3.5 mr-1.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {products.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {products.length} product
                {products.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductManagement;
