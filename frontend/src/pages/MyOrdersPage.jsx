import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../redux/slices/orderSlice';
import {
  FiChevronRight,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiPackage,
  FiTruck,
  FiChevronLeft,
  FiChevronDown,
  FiAlertCircle,
} from 'react-icons/fi';

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  // Effect to scroll to the top when the page changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Reset to page 1 when itemsPerPage changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  // Calculate total items count for an order
  const getTotalItemsCount = (orderItems) => {
    if (!orderItems) return 0;
    return orderItems.reduce((total, item) => {
      return total + (parseInt(item.quantity) || 1);
    }, 0);
  };

  // Calculate order subtotal
  const getOrderSubtotal = (orderItems) => {
    if (!orderItems) return 0;
    return orderItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return sum + (price * quantity);
    }, 0);
  };

  // Calculate pagination
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  // Helper function to get payment status display
  const getPaymentStatusDisplay = (order) => {
    if (order.isPaid) {
      return {
        text: 'Paid',
        icon: <FiCheckCircle className="h-4 w-4" />,
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        iconColor: 'text-green-600'
      };
    }
    
    // Default fallback based on isPaid
    return {
      text: order.isPaid ? 'Paid' : 'Pending',
      icon: order.isPaid ? <FiCheckCircle className="h-4 w-4" /> : <FiClock className="h-4 w-4" />,
      bgColor: order.isPaid ? 'bg-green-100' : 'bg-yellow-100',
      textColor: order.isPaid ? 'text-green-700' : 'text-yellow-700',
      iconColor: order.isPaid ? 'text-green-600' : 'text-yellow-600'
    };
  };

  // Helper function to get delivery status display
  const getDeliveryStatusDisplay = (order) => {
    if (order.isDelivered) {
      return {
        text: 'Delivered',
        icon: <FiCheckCircle className="h-4 w-4" />,
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        borderColor: 'border-green-200'
      };
    }
    
    // Check for order status field
    if (order.status) {
      switch (order.status.toLowerCase()) {
        case 'processing':
          return {
            text: 'Processing',
            icon: <FiPackage className="h-4 w-4" />,
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-700',
            borderColor: 'border-blue-200'
          };
        case 'shipped':
          return {
            text: 'Shipped',
            icon: <FiTruck className="h-4 w-4" />,
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-700',
            borderColor: 'border-purple-200'
          };
        case 'delivered':
          return {
            text: 'Delivered',
            icon: <FiCheckCircle className="h-4 w-4" />,
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
            borderColor: 'border-green-200'
          };
        case 'cancelled':
        case 'canceled':
          return {
            text: 'Cancelled',
            icon: <FiXCircle className="h-4 w-4" />,
            bgColor: 'bg-red-100',
            textColor: 'text-red-700',
            borderColor: 'border-red-200'
          };
        default:
          return {
            text: 'Processing',
            icon: <FiPackage className="h-4 w-4" />,
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-700',
            borderColor: 'border-blue-200'
          };
      }
    }
    
    // Default
    return {
      text: 'Processing',
      icon: <FiPackage className="h-4 w-4" />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200'
    };
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-azurio"></div>
          <span className="text-gray-600">Loading your orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <FiXCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error loading orders
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Order History</h2>
            <p className="text-gray-600 text-sm mt-1">
              Track and manage all your orders
            </p>
          </div>
          <div className="mt-3 sm:mt-0 flex items-center space-x-4">
            {/* Status Legend */}
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">Processing</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-gray-600">Shipped</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-600">Delivered</span>
              </div>
            </div>
            {/* Page Info */}
            {orders.length > 0 && (
              <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                Page {currentPage} of {totalPages}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Orders List */}
      <div className="divide-y divide-gray-100">
        {currentOrders.length > 0 ? (
          currentOrders.map((order) => {
            const paymentStatus = getPaymentStatusDisplay(order);
            const deliveryStatus = getDeliveryStatusDisplay(order);
            const totalItemsCount = getTotalItemsCount(order.orderItems);
            const orderSubtotal = getOrderSubtotal(order.orderItems);
            
            return (
              <div
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={order.orderItems[0]?.image}
                          alt={order.orderItems[0]?.name}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                        />
                        {order.orderItems.length > 1 && (
                          <div className="absolute -bottom-1 -right-1 bg-azurio text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                            +{order.orderItems.length - 1}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-azurio transition-colors">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <FiClock className="h-3 w-3" />
                              <span>
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {totalItemsCount} item{totalItemsCount > 1 ? 's' : ''}
                              {order.orderItems.length > 0 && ` (${order.orderItems.length} unique)`}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <div className="text-lg font-bold text-gray-900">
                            ${parseFloat(order.totalPrice).toFixed(2)}
                          </div>
                          {Math.abs(order.totalPrice - orderSubtotal) > 0.01 && (
                            <div className="text-xs text-gray-500">
                              Subtotal: ${orderSubtotal.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Status Info */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {/* Payment Status */}
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${paymentStatus.bgColor} ${paymentStatus.textColor} border ${paymentStatus.bgColor.replace('bg-', 'border-').replace('100', '200')}`}>
                          {paymentStatus.icon}
                          <span className="text-sm font-medium">
                            {paymentStatus.text}
                          </span>
                        </div>
                        
                        {/* Delivery Status */}
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${deliveryStatus.bgColor} ${deliveryStatus.textColor} border ${deliveryStatus.borderColor}`}>
                          {deliveryStatus.icon}
                          <span className="text-sm font-medium">
                            {deliveryStatus.text}
                          </span>
                        </div>
                        
                        {/* Shipping Location */}
                        {order.shippingAddress?.city && (
                          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                            <FiTruck className="h-4 w-4 text-gray-600" />
                            <span className="text-sm text-gray-700">
                              {order.shippingAddress.city}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* View Details Button */}
                  <div className="flex items-center justify-between lg:justify-end lg:w-auto">
                    <button className="flex items-center space-x-2 text-azurio hover:text-blue-700 font-medium">
                      <span>View Details</span>
                      <FiChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FiPackage className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start shopping to see your orders here
            </p>
            <button
              onClick={() => navigate('/collections/all')}
              className="px-6 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
      
      {/* Pagination Footer */}
      {orders.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="text-sm text-gray-600">
                Showing{' '}
                <span className="font-semibold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-semibold">
                  {Math.min(indexOfLastItem, orders.length)}
                </span>{' '}
                of <span className="font-semibold">{orders.length}</span> orders
              </div>
            </div>
            
            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>
              
              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Show only a few pages around the current one.
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg transition-colors ${
                          currentPage === pageNumber
                            ? 'bg-azurio text-white font-semibold'
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span key={pageNumber} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
              
              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            {/* Items Per Page Selector */}
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <span className="text-sm text-gray-600">Show:</span>
              <div className="relative">
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-azurio focus:border-azurio cursor-pointer"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                </select>
                <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;