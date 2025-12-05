import React from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaPlus } from 'react-icons/fa';
import { useProductManagement } from './useProductManagement';
import StatsCards from './StatsCards';
import ProductsTable from './ProductsTable';
import LoadingState from '../../Common/LoadingState';
import ErrorState from '../../Common/ErrorState';

const ProductManagementPage = () => {
  const {
    products,
    loading,
    error,
    handleDelete,
    getFirstImageUrl,
    getImageAlt,
    totalProducts,
    totalValue,
    averagePrice,
  } = useProductManagement();

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
      <StatsCards
        totalProducts={totalProducts}
        totalValue={totalValue}
        averagePrice={averagePrice}
      />
      {/* Products Table Container */}
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
        {/* Content States */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} />
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
          <>
            <ProductsTable
              products={products}
              getFirstImageUrl={getFirstImageUrl}
              getImageAlt={getImageAlt}
              onDelete={handleDelete}
            />
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProductManagementPage;
