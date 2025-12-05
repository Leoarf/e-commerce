import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useOrderManagement } from './useOrderManagement';
import StatsCards from './StatsCards';
import OrdersTable from './OrdersTable';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

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

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

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
      {/* Orders Table */}
      <OrdersTable
        filteredOrders={filteredOrders}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        formatDate={formatDate}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default OrderManagementPage;
