import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../../redux/slices/orderSlice';

export const useMyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const getTotalItemsCount = (orderItems) => {
    if (!orderItems) return 0;
    return orderItems.reduce((total, item) => {
      return total + (parseInt(item.quantity) || 1);
    }, 0);
  };

  const getOrderSubtotal = (orderItems) => {
    if (!orderItems) return 0;
    return orderItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return sum + price * quantity;
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

  const getPaymentStatusDisplay = (order) => {
    if (order.isPaid) {
      return {
        text: 'Paid',
        icon: 'FiCheckCircle',
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        iconColor: 'text-green-600',
      };
    }

    return {
      text: order.isPaid ? 'Paid' : 'Pending',
      icon: order.isPaid ? 'FiCheckCircle' : 'FiClock',
      bgColor: order.isPaid ? 'bg-green-100' : 'bg-yellow-100',
      textColor: order.isPaid ? 'text-green-700' : 'text-yellow-700',
      iconColor: order.isPaid ? 'text-green-600' : 'text-yellow-600',
    };
  };

  const getDeliveryStatusDisplay = (order) => {
    if (order.isDelivered) {
      return {
        text: 'Delivered',
        icon: 'FiCheckCircle',
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        borderColor: 'border-green-200',
      };
    }

    if (order.status) {
      switch (order.status.toLowerCase()) {
        case 'processing':
          return {
            text: 'Processing',
            icon: 'FiPackage',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-700',
            borderColor: 'border-blue-200',
          };
        case 'shipped':
          return {
            text: 'Shipped',
            icon: 'FiTruck',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-700',
            borderColor: 'border-purple-200',
          };
        case 'delivered':
          return {
            text: 'Delivered',
            icon: 'FiCheckCircle',
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
            borderColor: 'border-green-200',
          };
        case 'cancelled':
        case 'canceled':
          return {
            text: 'Cancelled',
            icon: 'FiXCircle',
            bgColor: 'bg-red-100',
            textColor: 'text-red-700',
            borderColor: 'border-red-200',
          };
        default:
          return {
            text: 'Processing',
            icon: 'FiPackage',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-700',
            borderColor: 'border-blue-200',
          };
      }
    }

    return {
      text: 'Processing',
      icon: 'FiPackage',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
    };
  };

  return {
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
  };
};
