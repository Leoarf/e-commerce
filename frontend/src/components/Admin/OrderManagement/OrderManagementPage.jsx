import React from 'react';
import { FaFilter } from 'react-icons/fa';
import { useOrderManagement } from './useOrderManagement';
import StatsCards from './StatsCards';
import OrdersTable from './OrdersTable';
import LoadingState from '../../Common/LoadingState';
import ErrorState from '../../Common/ErrorState';

const OrderManagementPage = () => {
  const {
    filteredOrders,
    loading,
    error,
    filterStatus,
    setFilterStatus,
    handleStatusChange,
    formatDate,
    totalOrders,
    totalRevenue,
    pendingOrders,
  } = useOrderManagement();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Order Management
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Manage customer orders and track shipments
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards
        totalOrders={totalOrders}
        totalRevenue={totalRevenue}
        pendingOrders={pendingOrders}
      />

      {/* Orders Table Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                All Orders
              </h2>
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
                <option value="all">All Orders</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content States - Mesmo padrão do ProductManagement */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} />
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center justify-center">
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
            <OrdersTable
              filteredOrders={filteredOrders}
              formatDate={formatDate}
              handleStatusChange={handleStatusChange}
            />
            {filteredOrders.length > 0 && (
              <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Showing {filteredOrders.length} order
                    {filteredOrders.length !== 1 ? 's' : ''}
                    {filterStatus !== 'all' && ` with status "${filterStatus}"`}
                  </p>
                  <div className="text-sm text-gray-500">
                    Total: $
                    {filteredOrders
                      .reduce((sum, order) => sum + order.totalPrice, 0)
                      .toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderManagementPage;
