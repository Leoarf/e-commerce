import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaDollarSign,
  FaShoppingCart,
  FaBoxOpen,
  FaChartLine,
  FaArrowRight,
  FaExclamationTriangle,
  FaSpinner,
} from 'react-icons/fa';

const StatsCards = ({
  totalSales,
  totalOrders,
  productsCount,
  productsLoading,
  ordersLoading,
  productsError,
  ordersError,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
      {/* Revenue Card */}
      <div className="bg-gradient-to-br from-blue-50 to-azurio/10 border border-blue-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-gradient-to-r from-azurio to-blue-500 rounded-lg">
            <FaDollarSign className="h-5 w-5 text-white" />
          </div>
          <div className="flex items-center">
            {ordersLoading && (
              <FaSpinner className="h-4 w-4 text-blue-500 animate-spin mr-2" />
            )}
            {ordersError ? (
              <span className="text-sm font-medium text-red-600 flex items-center">
                <FaExclamationTriangle className="h-3 w-3 mr-1" />
                Error
              </span>
            ) : (
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2.5 py-1 rounded-full">
                Total
              </span>
            )}
          </div>
        </div>

        <h3 className="text-gray-500 text-sm font-medium mb-1">Revenue</h3>

        {ordersError ? (
          <div className="mb-4">
            <p className="text-red-500 text-sm">Failed to load</p>
            <p className="text-red-400 text-xs truncate">{ordersError}</p>
          </div>
        ) : ordersLoading ? (
          <div className="flex items-center mb-4">
            <FaSpinner className="h-6 w-6 text-blue-500 animate-spin mr-2" />
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <div className="flex items-baseline mb-4">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              ${totalSales?.toFixed(2) || '0.00'}
            </p>
            <span className="text-sm text-gray-500 ml-2">USD</span>
          </div>
        )}

        <div className="flex items-center text-blue-600 text-sm">
          <FaChartLine className="h-3.5 w-3.5 mr-1" />
          <span>Total sales amount</span>
        </div>
      </div>

      {/* Total Orders Card */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
            <FaShoppingCart className="h-5 w-5 text-white" />
          </div>
          <div className="flex items-center">
            {ordersLoading && (
              <FaSpinner className="h-4 w-4 text-purple-500 animate-spin mr-2" />
            )}
            {ordersError ? (
              <span className="text-sm font-medium text-red-600 flex items-center">
                <FaExclamationTriangle className="h-3 w-3 mr-1" />
                Error
              </span>
            ) : ordersLoading ? null : (
              <Link
                to="/admin/orders"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center group"
              >
                Manage
                <FaArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        <h3 className="text-gray-500 text-sm font-medium mb-1">Total Orders</h3>

        {ordersError ? (
          <div className="mb-4">
            <p className="text-red-500 text-sm">Failed to load</p>
            <p className="text-red-400 text-xs truncate">{ordersError}</p>
          </div>
        ) : ordersLoading ? (
          <div className="flex items-center mb-4">
            <FaSpinner className="h-6 w-6 text-purple-500 animate-spin mr-2" />
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <div className="flex items-baseline mb-4">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {totalOrders || 0}
            </p>
            <span className="text-sm text-gray-500 ml-2">orders</span>
          </div>
        )}

        <div className="flex items-center text-purple-600 text-sm">
          <FaShoppingCart className="h-3.5 w-3.5 mr-1" />
          <span>All time orders processed</span>
        </div>
      </div>

      {/* Total Products Card */}
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
            <FaBoxOpen className="h-5 w-5 text-white" />
          </div>
          <div className="flex items-center">
            {productsLoading && (
              <FaSpinner className="h-4 w-4 text-emerald-500 animate-spin mr-2" />
            )}
            {productsError ? (
              <span className="text-sm font-medium text-red-600 flex items-center">
                <FaExclamationTriangle className="h-3 w-3 mr-1" />
                Error
              </span>
            ) : productsLoading ? null : (
              <Link
                to="/admin/products"
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center group"
              >
                Manage
                <FaArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        <h3 className="text-gray-500 text-sm font-medium mb-1">
          Total Products
        </h3>

        {productsError ? (
          <div className="mb-4">
            <p className="text-red-500 text-sm">Failed to load</p>
            <p className="text-red-400 text-xs truncate">{productsError}</p>
          </div>
        ) : productsLoading ? (
          <div className="flex items-center mb-4">
            <FaSpinner className="h-6 w-6 text-emerald-500 animate-spin mr-2" />
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <div className="flex items-baseline mb-4">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {productsCount || 0}
            </p>
            <span className="text-sm text-gray-500 ml-2">products</span>
          </div>
        )}

        <div className="flex items-center text-emerald-600 text-sm">
          <FaBoxOpen className="h-3.5 w-3.5 mr-1" />
          <span>Active products in catalog</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
