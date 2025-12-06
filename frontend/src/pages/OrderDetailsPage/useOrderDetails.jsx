import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails } from '../../redux/slices/orderSlice';
import {
  getPaymentStatusDisplay,
  getDeliveryStatusDisplay,
  getOrderStatusHeader,
  calculateSubtotal,
  calculateTotalItemsCount,
  formatCurrency,
} from './StatusHelpers';

export const useOrderDetails = (id) => {
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id));
    }
  }, [dispatch, id]);

  const subtotal = orderDetails
    ? calculateSubtotal(orderDetails.orderItems)
    : 0;
  const totalItemsCount = orderDetails
    ? calculateTotalItemsCount(orderDetails.orderItems)
    : 0;
  const shippingCost = orderDetails ? orderDetails.totalPrice - subtotal : 0;

  const paymentStatus = orderDetails
    ? getPaymentStatusDisplay(orderDetails)
    : null;
  const deliveryStatus = orderDetails
    ? getDeliveryStatusDisplay(orderDetails)
    : null;
  const orderHeaderStatus = orderDetails
    ? getOrderStatusHeader(orderDetails)
    : null;

  return {
    orderDetails,
    loading,
    error,
    subtotal,
    totalItemsCount,
    shippingCost,
    paymentStatus,
    deliveryStatus,
    orderHeaderStatus,
    formatCurrency,
  };
};
