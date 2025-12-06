import React from 'react';
import MyOrdersLoading from './MyOrdersPage/MyOrdersLoading';
import MyOrdersError from './MyOrdersPage/MyOrdersError';
import MyOrdersHeader from './MyOrdersPage/MyOrdersHeader';
import MyOrdersList from './MyOrdersPage/MyOrdersList';
import MyOrdersPagination from './MyOrdersPage/MyOrdersPagination';
import MyOrdersEmptyState from './MyOrdersPage/MyOrdersEmptyState';
import { useMyOrdersPage } from './MyOrdersPage/useMyOrdersPage';

const MyOrdersPage = () => {
  const {
    orders,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalPages,
    currentOrders,
    handleRowClick,
    handleNextPage,
    handlePreviousPage,
    handlePageClick,
    handleItemsPerPageChange,
    getPaymentStatusDisplay,
    getDeliveryStatusDisplay,
    getTotalItemsCount,
    getOrderSubtotal,
  } = useMyOrdersPage();

  if (loading) {
    return <MyOrdersLoading />;
  }

  if (error) {
    return <MyOrdersError error={error} />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <MyOrdersHeader
        orders={orders}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {orders.length > 0 ? (
        <>
          <MyOrdersList
            orders={currentOrders}
            onRowClick={handleRowClick}
            getPaymentStatusDisplay={getPaymentStatusDisplay}
            getDeliveryStatusDisplay={getDeliveryStatusDisplay}
            getTotalItemsCount={getTotalItemsCount}
            getOrderSubtotal={getOrderSubtotal}
          />

          <MyOrdersPagination
            orders={orders}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            onPageClick={handlePageClick}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      ) : (
        <MyOrdersEmptyState />
      )}
    </div>
  );
};

export default MyOrdersPage;
