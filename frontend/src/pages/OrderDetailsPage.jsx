import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails } from '../redux/slices/orderSlice';
import {
  FiArrowLeft,
  FiPackage,
  FiTruck,
  FiCreditCard,
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiShoppingBag,
  FiXCircle,
  FiAlertCircle,
  FiLoader,
} from 'react-icons/fi';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  // Calculate total items count
  const getTotalItemsCount = () => {
    if (!orderDetails?.orderItems) return 0;
    
    return orderDetails.orderItems.reduce((total, item) => {
      return total + (parseInt(item.quantity) || 1);
    }, 0);
  };

  // Calculate subtotal correctly based on quantity
  const calculateSubtotal = () => {
    if (!orderDetails?.orderItems) return 0;
    
    return orderDetails.orderItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return sum + (price * quantity);
    }, 0);
  };

  // Helper function to get payment status display
  const getPaymentStatusDisplay = (order) => {
    if (order.isPaid) {
      return {
        text: 'Paid',
        statusText: 'Payment Completed',
        description: `Paid on ${new Date(order.paidAt).toLocaleDateString()}`,
        icon: <FiCheckCircle className="h-5 w-5" />,
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        iconColor: 'text-green-600',
        progressColor: 'bg-green-500',
        progressWidth: '100%',
      };
    }

    // Pending payment
    return {
      text: 'Pending',
      statusText: 'Payment Pending',
      description: 'Awaiting payment confirmation',
      icon: <FiClock className="h-5 w-5" />,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      iconColor: 'text-yellow-600',
      progressColor: 'bg-yellow-500',
      progressWidth: '50%',
    };
  };

  // Helper function to get delivery status display
  const getDeliveryStatusDisplay = (order) => {
    if (order.isDelivered) {
      return {
        text: 'Delivered',
        statusText: 'Delivered',
        description: 'Package delivered successfully',
        icon: <FiCheckCircle className="h-5 w-5" />,
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        iconColor: 'text-green-600',
        progressColor: 'bg-green-500',
        progressWidth: '100%',
      };
    }

    // Check for detailed status from backend
    if (order.status) {
      const status = order.status.toLowerCase();
      switch (status) {
        case 'processing':
        case 'confirmed':
          return {
            text: 'Processing',
            statusText: 'Order Confirmed',
            description: 'Your order is being prepared for shipment',
            icon: <FiPackage className="h-5 w-5" />,
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-700',
            iconColor: 'text-blue-600',
            progressColor: 'bg-blue-500',
            progressWidth: '30%',
          };
        case 'shipped':
        case 'shipping':
          return {
            text: 'Shipped',
            statusText: 'Shipped',
            description: 'Your order is on the way',
            icon: <FiTruck className="h-5 w-5" />,
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-700',
            iconColor: 'text-purple-600',
            progressColor: 'bg-purple-500',
            progressWidth: '70%',
          };
        case 'out for delivery':
        case 'out-for-delivery':
          return {
            text: 'Out for Delivery',
            statusText: 'Out for Delivery',
            description: 'Your order will arrive today',
            icon: <FiTruck className="h-5 w-5" />,
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-700',
            iconColor: 'text-orange-600',
            progressColor: 'bg-orange-500',
            progressWidth: '90%',
          };
        case 'cancelled':
        case 'canceled':
        case 'refunded':
          return {
            text: 'Cancelled',
            statusText: 'Order Cancelled',
            description: 'This order has been cancelled',
            icon: <FiXCircle className="h-5 w-5" />,
            bgColor: 'bg-red-100',
            textColor: 'text-red-700',
            iconColor: 'text-red-600',
            progressColor: 'bg-red-500',
            progressWidth: '100%',
          };
        case 'on hold':
        case 'pending':
          return {
            text: 'On Hold',
            statusText: 'On Hold',
            description: 'Order is temporarily on hold',
            icon: <FiAlertCircle className="h-5 w-5" />,
            bgColor: 'bg-gray-100',
            textColor: 'text-gray-700',
            iconColor: 'text-gray-600',
            progressColor: 'bg-gray-500',
            progressWidth: '10%',
          };
        default:
          return {
            text: 'Processing',
            statusText: 'Order Processing',
            description: 'Your order is being processed',
            icon: <FiLoader className="h-5 w-5" />,
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-700',
            iconColor: 'text-blue-600',
            progressColor: 'bg-blue-500',
            progressWidth: '30%',
          };
      }
    }

    // Default processing status
    return {
      text: 'Processing',
      statusText: 'Order Processing',
      description: 'Your order is being processed',
      icon: <FiPackage className="h-5 w-5" />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600',
      progressColor: 'bg-blue-500',
      progressWidth: '30%',
    };
  };

  // Helper to get overall order status for header
  const getOrderStatusHeader = (order) => {
    const deliveryStatus = getDeliveryStatusDisplay(order);

    // Priority: Cancelled > Delivered > Shipped > Processing
    if (deliveryStatus.text === 'Cancelled') {
      return {
        text: 'Cancelled',
        description: 'This order has been cancelled',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-700',
      };
    }

    if (deliveryStatus.text === 'Delivered') {
      return {
        text: 'Delivered',
        description: 'Your order has been delivered',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
      };
    }

    if (deliveryStatus.text === 'Shipped') {
      return {
        text: 'Shipped',
        description: 'Your order is on the way',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        textColor: 'text-purple-700',
      };
    }

    if (deliveryStatus.text === 'Out for Delivery') {
      return {
        text: 'Out for Delivery',
        description: 'Will arrive today',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-700',
      };
    }

    // Default processing
    return {
      text: 'Processing',
      description: 'Order is being prepared',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-azurio"></div>
              <span className="text-gray-600">Loading order details...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiXCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Error loading order
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/my-orders')}
              className="px-6 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPackage className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Order not found
            </h3>
            <p className="text-gray-600 mb-6">
              The order you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate('/my-orders')}
              className="px-6 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const subtotal = calculateSubtotal();
  const totalItemsCount = getTotalItemsCount();
  const shippingCost = orderDetails.totalPrice - subtotal;

  // Get status displays
  const paymentStatus = getPaymentStatusDisplay(orderDetails);
  const deliveryStatus = getDeliveryStatusDisplay(orderDetails);
  const orderHeaderStatus = getOrderStatusHeader(orderDetails);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/my-orders')}
            className="flex items-center space-x-2 text-azurio hover:text-blue-700 font-medium mb-4 group"
          >
            <FiArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Orders</span>
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Order Details
              </h1>
              <p className="text-gray-600 mt-1">
                Order #{orderDetails._id.slice(-8).toUpperCase()} •
                <span className="ml-2">
                  {new Date(orderDetails.createdAt).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </span>
              </p>
            </div>
            {/* Order Status Header */}
            <div
              className={`px-4 py-3 rounded-xl border ${orderHeaderStatus.bgColor} ${orderHeaderStatus.borderColor}`}
            >
              <div className="flex items-center space-x-2">
                <div
                  className={`p-2 rounded-lg ${orderHeaderStatus.bgColor.replace(
                    '50',
                    '100'
                  )}`}
                >
                  {deliveryStatus.icon}
                </div>
                <div>
                  <h3 className={`font-bold ${orderHeaderStatus.textColor}`}>
                    {orderHeaderStatus.text}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {orderHeaderStatus.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Progress
              </h2>
              <div className="space-y-8">
                {/* Payment Status */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${paymentStatus.bgColor}`}
                      >
                        <span className={paymentStatus.iconColor}>
                          {paymentStatus.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {paymentStatus.statusText}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {paymentStatus.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-semibold ${paymentStatus.textColor}`}
                    >
                      {paymentStatus.text}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${paymentStatus.progressColor} transition-all duration-500`}
                      style={{ width: paymentStatus.progressWidth }}
                    ></div>
                  </div>
                </div>
                {/* Delivery Status */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${deliveryStatus.bgColor}`}
                      >
                        <span className={deliveryStatus.iconColor}>
                          {deliveryStatus.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {deliveryStatus.statusText}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {deliveryStatus.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-semibold ${deliveryStatus.textColor}`}
                    >
                      {deliveryStatus.text}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${deliveryStatus.progressColor} transition-all duration-500`}
                      style={{ width: deliveryStatus.progressWidth }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Order Items Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <FiShoppingBag className="h-5 w-5 text-azurio" />
                  <span>Order Items ({totalItemsCount} items)</span>
                </h2>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-500">
                    Subtotal: {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {orderDetails.orderItems.map((item) => {
                  const price = parseFloat(item.price) || 0;
                  const quantity = parseInt(item.quantity) || 1;
                  const totalPrice = price * quantity;
                  
                  return (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-azurio text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                            {quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${item.productId}`}
                            className="text-lg font-medium text-gray-900 hover:text-azurio transition-colors truncate block"
                          >
                            {item.name}
                          </Link>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.size && (
                              <span className="text-sm bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                                Size: {item.size}
                              </span>
                            )}
                            {item.color && (
                              <span className="text-sm bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                                Color: {item.color}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {formatCurrency(totalPrice)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(price)} each × {quantity}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Order Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2 mb-6">
                <FiCalendar className="h-5 w-5 text-azurio" />
                <span>Order Timeline</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 border-b border-gray-100 pb-4">
                    <h4 className="font-medium text-gray-900">Order Placed</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(orderDetails.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Your order has been received and is being processed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 ${paymentStatus.bgColor} rounded-full flex items-center justify-center`}
                  >
                    {paymentStatus.icon}
                  </div>
                  <div className="flex-1 border-b border-gray-100 pb-4">
                    <h4 className="font-medium text-gray-900">
                      {paymentStatus.statusText}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {paymentStatus.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 ${deliveryStatus.bgColor} rounded-full flex items-center justify-center`}
                  >
                    {deliveryStatus.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {deliveryStatus.statusText}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {deliveryStatus.description}
                    </p>
                    {orderDetails.deliveredAt && (
                      <p className="text-sm text-gray-600 mt-1">
                        Delivered at:{' '}
                        {new Date(
                          orderDetails.deliveredAt
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Info */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    Subtotal ({totalItemsCount} items)
                  </span>
                  <span className="font-medium">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span
                    className={`font-medium ${
                      shippingCost === 0 ? 'text-green-600' : ''
                    }`}
                  >
                    {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
                  </span>
                </div>
                {orderDetails.taxPrice && orderDetails.taxPrice > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                      {formatCurrency(orderDetails.taxPrice)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-azurio">
                      {formatCurrency(orderDetails.totalPrice)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {paymentStatus.text === 'Paid'
                      ? 'Payment completed'
                      : 'Payment pending'}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <FiMapPin className="h-5 w-5 text-azurio" />
                <span>Shipping Address</span>
              </h2>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900 font-medium">
                    {orderDetails.shippingAddress?.firstName}{' '}
                    {orderDetails.shippingAddress?.lastName}
                  </p>
                  <p className="text-gray-600 mt-1">
                    {orderDetails.shippingAddress?.address}
                  </p>
                  <p className="text-gray-600">
                    {orderDetails.shippingAddress?.city},{' '}
                    {orderDetails.shippingAddress?.postalCode}
                  </p>
                  <p className="text-gray-600">
                    {orderDetails.shippingAddress?.country}
                  </p>
                  {orderDetails.shippingAddress?.phone && (
                    <p className="text-gray-600 mt-2">
                      📞 {orderDetails.shippingAddress.phone}
                    </p>
                  )}
                </div>
                {deliveryStatus.text === 'Shipped' && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-700">
                      <FiTruck className="inline h-4 w-4 mr-1" />
                      Your package is on the way. Expected delivery in 2-3
                      business days.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <FiCreditCard className="h-5 w-5 text-azurio" />
                <span>Payment Information</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Method</span>
                  <span className="font-medium capitalize">
                    {orderDetails.paymentMethod || 'PayPal'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${paymentStatus.bgColor} ${paymentStatus.textColor}`}
                  >
                    {paymentStatus.text}
                  </div>
                </div>
                {orderDetails.paidAt && (
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Paid on:</span>{' '}
                      {new Date(orderDetails.paidAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;