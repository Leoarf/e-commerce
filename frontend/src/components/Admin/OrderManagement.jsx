import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchAllOrders,
  updateOrderStatus,
} from '../../redux/slices/adminOrderSlice';
import {
  FaDollarSign,
  FaShoppingCart,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaExclamationCircle,
  FaFilter,
  FaCalendarAlt,
  FaUser
} from 'react-icons/fa';

function OrderManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  // Calculate statistics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = orders.filter(order => 
    order.status === 'Processing' || order.status === 'Shipped'
  ).length;

  // Filter orders by status
  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  // Get status badge color - atualizado para roxo no Shipped
  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800'; // Alterado para roxo
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azurio"></div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <div className="flex items-center">
          <FaExclamationCircle className="h-5 w-5 mr-2" />
          <strong className="font-bold">Error: </strong>
          <span className="ml-1">{error}</span>
        </div>
      </div>
    </div>
  );

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
        {/* Total Orders */}
        <div className="bg-gradient-to-br from-blue-50 to-azurio/10 border border-blue-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-gradient-to-r from-azurio to-blue-500 rounded-lg">
              <FaShoppingCart className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
              Total
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Total Orders
          </h3>
          <div className="flex items-baseline">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {totalOrders}
            </p>
            <span className="text-sm text-gray-500 ml-2">orders</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <FaDollarSign className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2.5 py-1 rounded-full">
              Revenue
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Total Revenue
          </h3>
          <div className="flex items-baseline">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              ${totalRevenue.toFixed(2)}
            </p>
            <span className="text-sm text-gray-500 ml-2">USD</span>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg">
              <FaClock className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-2.5 py-1 rounded-full">
              Pending
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Pending Orders
          </h3>
          <div className="flex items-baseline">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {pendingOrders}
            </p>
            <span className="text-sm text-gray-500 ml-2">to process</span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
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
                  : `No orders with status "${filterStatus}"`
                }
              </p>
            </div>
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
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Total
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
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 font-mono">
                        #{order._id.slice(-8).toUpperCase()}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-azurio flex items-center justify-center">
                          <FaUser className="h-4 w-4 text-white" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {order.user?.name || 'Customer'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.user?.email || ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FaCalendarAlt className="h-3 w-3 mr-1.5 text-gray-400" />
                        {formatDate(order.createdAt || new Date())}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        ${order.totalPrice.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium border-0 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${getStatusColor(order.status)}`}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredOrders.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
                {filterStatus !== 'all' && ` with status "${filterStatus}"`}
              </p>
              <div className="text-sm text-gray-500">
                Total: ${filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderManagement;