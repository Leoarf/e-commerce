import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaShoppingCart,
  FaEye,
  FaArrowRight,
  FaExclamationTriangle,
  FaSpinner,
} from 'react-icons/fa';

const RecentOrdersTable = ({
  orders,
  ordersLoading,
  ordersError,
  getStatusInfo,
  getPaymentStatusDisplay,
  calculateTotalItems,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
      <div className="p-5 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Orders
            </h2>
            {ordersLoading && (
              <FaSpinner className="h-4 w-4 text-azurio animate-spin ml-3" />
            )}
          </div>
          <Link
            to="/admin/orders"
            className="mt-3 sm:mt-0 inline-flex items-center justify-center px-4 py-2 bg-azurio text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm font-medium"
          >
            <FaEye className="h-3.5 w-3.5 mr-2" />
            View All Orders
          </Link>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Latest customer orders and their status
        </p>
      </div>

      {ordersError ? (
        <div className="p-5 md:p-6">
          <div className="flex items-center mb-4">
            <FaExclamationTriangle className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Error loading orders
            </h3>
          </div>
          <p className="text-red-500 mb-4">{ordersError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-azurio text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      ) : ordersLoading ? (
        <div className="p-8 text-center">
          <FaSpinner className="h-8 w-8 text-azurio animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading orders...</p>
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
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Total Amount
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders && orders.length > 0 ? (
                orders.slice(0, 10).map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  const paymentStatus = getPaymentStatusDisplay(order);
                  const totalItems = calculateTotalItems(order);

                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 font-mono">
                          #{order._id.slice(-8).toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.user?.name || 'Guest'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.user?.email || 'No email provided'}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          ${order.totalPrice?.toFixed(2) || '0.00'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {totalItems} item{totalItems !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          {/* Order Status */}
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.textColor} border ${statusInfo.borderColor} w-fit`}
                          >
                            {statusInfo.icon}
                            <span className="ml-1.5 capitalize">
                              {statusInfo.text}
                            </span>
                          </div>
                          {/* Payment Status */}
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              paymentStatus.bgColor
                            } ${
                              paymentStatus.textColor
                            } border ${paymentStatus.bgColor
                              .replace('bg-', 'border-')
                              .replace('100', '200')} w-fit`}
                          >
                            {paymentStatus.icon}
                            <span className="ml-1.5">{paymentStatus.text}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FaShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No orders yet
                      </h3>
                      <p className="text-gray-500 max-w-md">
                        When customers place orders, they will appear here for
                        you to manage.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {orders && orders.length > 10 && (
        <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing 10 of {orders.length} orders
            </p>
            <Link
              to="/admin/orders"
              className="text-sm font-medium text-azurio hover:text-blue-700 flex items-center"
            >
              View all orders
              <FaArrowRight className="h-3 w-3 ml-1.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentOrdersTable;
