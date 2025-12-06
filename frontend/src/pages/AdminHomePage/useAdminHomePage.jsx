import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts } from '../../redux/slices/adminProductSlice';
import { fetchAllOrders } from '../../redux/slices/adminOrderSlice';
import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaTruck,
} from 'react-icons/fa';

export const useAdminHomePage = () => {
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

  const calculateTotalItems = useCallback((order) => {
    if (!order.orderItems || !Array.isArray(order.orderItems)) return 0;
    return order.orderItems.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );
  }, []);

  const getStatusInfo = useCallback((status) => {
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
  }, []);

  const getPaymentStatusDisplay = useCallback((order) => {
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
  }, []);

  return {
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
  };
};
