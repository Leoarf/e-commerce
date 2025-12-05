import React from 'react';
import { FaFilter, FaShoppingCart } from 'react-icons/fa';
import { FILTER_OPTIONS } from './orderConfig';
import OrderRow from './OrderRow';

const OrdersTable = ({
  filteredOrders,
  filterStatus,
  setFilterStatus,
  formatDate,
  handleStatusChange,
}) => {
  const totalFilteredRevenue = filteredOrders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">All Orders</h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage and update order statuses
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-3 sm:mt-0">
            <div className="flex items-center text-sm text-gray-500">
              <FaFilter className="h-4 w-4 mr-2" />
              Filter by:
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio"
            >
              {FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="p-12 text-center">
          <div className="flex flex-col items-center justify-center">
            <FaShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No orders found
            </h3>
            <p className="text-gray-500">
              {filterStatus === 'all'
                ? 'No orders have been placed yet'
                : `No orders with status "${filterStatus}"`}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <OrderRow
                    key={order._id}
                    order={order}
                    formatDate={formatDate}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {filteredOrders.length} order
                {filteredOrders.length !== 1 ? 's' : ''}
                {filterStatus !== 'all' && ` with status "${filterStatus}"`}
              </p>
              <div className="text-sm text-gray-500">
                Total: ${totalFilteredRevenue.toFixed(2)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersTable;
