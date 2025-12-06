import React from 'react';
import AdminHomePageHeader from './AdminHomePage/AdminHomePageHeader';
import StatsCards from './AdminHomePage/StatsCards';
import RecentOrdersTable from './AdminHomePage/RecentOrdersTable';
import QuickStats from './AdminHomePage/QuickStats';
import { useAdminHomePage } from './AdminHomePage/useAdminHomePage';

function AdminHomePage() {
  const {
    products,
    orders,
    totalOrders,
    totalSales,
    productsLoading,
    ordersLoading,
    productsError,
    ordersError,
    getStatusInfo,
    getPaymentStatusDisplay,
    calculateTotalItems,
  } = useAdminHomePage();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <AdminHomePageHeader />

      <StatsCards
        totalSales={totalSales}
        totalOrders={totalOrders}
        productsCount={products.length}
        productsLoading={productsLoading}
        ordersLoading={ordersLoading}
        productsError={productsError}
        ordersError={ordersError}
      />

      <RecentOrdersTable
        orders={orders}
        ordersLoading={ordersLoading}
        ordersError={ordersError}
        getStatusInfo={getStatusInfo}
        getPaymentStatusDisplay={getPaymentStatusDisplay}
        calculateTotalItems={calculateTotalItems}
      />

      <QuickStats
        products={products}
        orders={orders}
        totalSales={totalSales}
        totalOrders={totalOrders}
        productsLoading={productsLoading}
        ordersLoading={ordersLoading}
        productsError={productsError}
        ordersError={ordersError}
      />
    </div>
  );
}

export default AdminHomePage;
