import React from 'react';
import {
  FaBoxOpen,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
} from 'react-icons/fa';

const QuickStats = ({
  products,
  orders,
  totalSales,
  totalOrders,
  productsLoading,
  ordersLoading,
  productsError,
  ordersError,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
          {productsLoading && (
            <FaSpinner className="h-4 w-4 text-blue-500 animate-spin ml-2" />
          )}
        </div>

        {productsError ? (
          <div className="text-center py-4">
            <div className="flex items-center justify-center mb-2">
              <FaExclamationTriangle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-500 text-sm">Products data unavailable</p>
            </div>
            <p className="text-red-400 text-xs mt-1">{productsError}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FaBoxOpen className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-900">
                    {products?.length || 0} products in catalog
                  </p>
                  {productsLoading && (
                    <FaSpinner className="h-3 w-3 text-blue-500 animate-spin ml-2" />
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-3">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-900">
                    {orders?.filter(
                      (o) => o.status?.toLowerCase() === 'delivered'
                    ).length || 0}{' '}
                    delivered orders
                  </p>
                  {ordersLoading && (
                    <FaSpinner className="h-3 w-3 text-green-500 animate-spin ml-2" />
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Total revenue: ${totalSales?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-5 md:p-6 text-white">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-semibold">Performance Summary</h3>
          {ordersLoading && (
            <FaSpinner className="h-4 w-4 text-white animate-spin ml-2" />
          )}
        </div>

        {ordersError ? (
          <div className="text-center py-4">
            <div className="flex items-center justify-center mb-2">
              <FaExclamationTriangle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-500 text-sm">Orders data unavailable</p>
            </div>
            <p className="text-red-400 text-xs mt-1">{ordersError}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Avg. Order Value</span>
              <span className="font-semibold">
                ${(totalSales / (totalOrders || 1)).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Delivered Orders</span>
              <span className="font-semibold">
                {orders?.filter((o) => o.status?.toLowerCase() === 'delivered')
                  .length || 0}{' '}
                / {totalOrders || 0}
              </span>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Data updated in real-time. Last sync: Just now
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
