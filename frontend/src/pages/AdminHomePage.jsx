import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts } from '../redux/slices/adminProductSlice';
import { fetchAllOrders } from '../redux/slices/adminOrderSlice';
import {
  FaDollarSign,
  FaShoppingCart,
  FaBoxOpen,
  FaChartLine,
  FaArrowRight,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaTruck,
} from 'react-icons/fa';

function AdminHomePage() {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // Função para calcular a quantidade total de itens em um pedido
  const calculateTotalItems = (order) => {
    if (!order.orderItems || !Array.isArray(order.orderItems)) return 0;
    return order.orderItems.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );
  };

  // Função para obter ícone e cor baseado no status - SEGUINDO O PADRÃO DO MyOrdersPage
  const getStatusInfo = (status) => {
    if (!status) {
      return {
        text: 'Processing',
        icon: <FaBoxOpen className="h-4 w-4" />,
        bg: 'bg-blue-100',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200',
      };
    }

    const statusLower = status.toLowerCase();

    switch (statusLower) {
      case 'delivered':
        return {
          text: 'Delivered',
          icon: <FaCheckCircle className="h-4 w-4" />,
          bg: 'bg-green-100',
          textColor: 'text-green-700',
          borderColor: 'border-green-200',
        };
      case 'processing':
        return {
          text: 'Processing',
          icon: <FaBoxOpen className="h-4 w-4" />,
          bg: 'bg-blue-100',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
        };
      case 'shipped':
        return {
          text: 'Shipped',
          icon: <FaTruck className="h-4 w-4" />,
          bg: 'bg-purple-100',
          textColor: 'text-purple-700',
          borderColor: 'border-purple-200',
        };
      case 'cancelled':
      case 'canceled':
        return {
          text: 'Cancelled',
          icon: <FaTimesCircle className="h-4 w-4" />,
          bg: 'bg-red-100',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
        };
      default:
        return {
          text: 'Processing',
          icon: <FaBoxOpen className="h-4 w-4" />,
          bg: 'bg-blue-100',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
        };
    }
  };

  // Helper function to get payment status display
  const getPaymentStatusDisplay = (order) => {
    if (order.isPaid) {
      return {
        text: 'Paid',
        icon: <FaCheckCircle className="h-4 w-4" />,
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        iconColor: 'text-green-600',
      };
    }

    return {
      text: order.isPaid ? 'Paid' : 'Pending',
      icon: order.isPaid ? (
        <FaCheckCircle className="h-4 w-4" />
      ) : (
        <FaClock className="h-4 w-4" />
      ),
      bgColor: order.isPaid ? 'bg-green-100' : 'bg-yellow-100',
      textColor: order.isPaid ? 'text-green-700' : 'text-yellow-700',
      iconColor: order.isPaid ? 'text-green-600' : 'text-yellow-600',
    };
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Monitor your store performance and recent activities
        </p>
      </div>

      {productsLoading || ordersLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-azurio/30 border-t-azurio rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      ) : productsError ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <FaTimesCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
          <p className="text-red-600 font-medium">Error fetching products</p>
          <p className="text-red-500 text-sm mt-1">{productsError}</p>
        </div>
      ) : ordersError ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <FaTimesCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
          <p className="text-red-600 font-medium">Error fetching orders</p>
          <p className="text-red-500 text-sm mt-1">{ordersError}</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {/* Revenue Card */}
            <div className="bg-gradient-to-br from-blue-50 to-azurio/10 border border-blue-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-gradient-to-r from-azurio to-blue-500 rounded-lg">
                  <FaDollarSign className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2.5 py-1 rounded-full">
                  Total
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                Revenue
              </h3>
              <div className="flex items-baseline mb-4">
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  ${totalSales.toFixed(2)}
                </p>
                <span className="text-sm text-gray-500 ml-2">USD</span>
              </div>
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
                <Link
                  to="/admin/orders"
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center group"
                >
                  Manage
                  <FaArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                Total Orders
              </h3>
              <div className="flex items-baseline mb-4">
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  {totalOrders}
                </p>
                <span className="text-sm text-gray-500 ml-2">orders</span>
              </div>
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
                <Link
                  to="/admin/products"
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center group"
                >
                  Manage
                  <FaArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                Total Products
              </h3>
              <div className="flex items-baseline mb-4">
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  {products.length}
                </p>
                <span className="text-sm text-gray-500 ml-2">products</span>
              </div>
              <div className="flex items-center text-emerald-600 text-sm">
                <FaBoxOpen className="h-3.5 w-3.5 mr-1" />
                <span>Active products in catalog</span>
              </div>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 md:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Orders
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Latest customer orders and their status
                  </p>
                </div>
                <Link
                  to="/admin/orders"
                  className="mt-3 sm:mt-0 inline-flex items-center justify-center px-4 py-2 bg-azurio text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm font-medium"
                >
                  <FaEye className="h-3.5 w-3.5 mr-2" />
                  View All Orders
                </Link>
              </div>
            </div>

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
                  {orders.length > 0 ? (
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
                              ${order.totalPrice.toFixed(2)}
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
                                <span className="ml-1.5">
                                  {paymentStatus.text}
                                </span>
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
                            When customers place orders, they will appear here
                            for you to manage.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {orders.length > 10 && (
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

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaBoxOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {products.length} products in catalog
                    </p>
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
                    <p className="text-sm font-medium text-gray-900">
                      {
                        orders.filter(
                          (o) =>
                            o.status && o.status.toLowerCase() === 'delivered'
                        ).length
                      }{' '}
                      delivered orders
                    </p>
                    <p className="text-xs text-gray-500">
                      Total revenue: ${totalSales.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-5 md:p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">
                Performance Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Avg. Order Value</span>
                  <span className="font-semibold">
                    ${(totalSales / totalOrders || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Delivered Orders</span>
                  <span className="font-semibold">
                    {
                      orders.filter(
                        (o) =>
                          o.status && o.status.toLowerCase() === 'delivered'
                      ).length
                    }{' '}
                    / {totalOrders}
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                  Data updated in real-time. Last sync: Just now
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminHomePage;
