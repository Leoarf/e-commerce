import {
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiTruck,
  FiXCircle,
  FiAlertCircle,
  FiLoader,
} from 'react-icons/fi';

// Calculation functions
export const calculateSubtotal = (orderItems) => {
  if (!orderItems) return 0;

  return orderItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);
};

export const calculateTotalItemsCount = (orderItems) => {
  if (!orderItems) return 0;

  return orderItems.reduce((total, item) => {
    return total + (parseInt(item.quantity) || 1);
  }, 0);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Payment status
export const getPaymentStatusDisplay = (order) => {
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

// Delivery status
export const getDeliveryStatusDisplay = (order) => {
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

// Order header status
export const getOrderStatusHeader = (order) => {
  const deliveryStatus = getDeliveryStatusDisplay(order);

  if (deliveryStatus.text === 'Cancelled') {
    return {
      text: 'Cancelled',
      description: 'This order has been cancelled',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      icon: deliveryStatus.icon,
    };
  }

  if (deliveryStatus.text === 'Delivered') {
    return {
      text: 'Delivered',
      description: 'Your order has been delivered',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      icon: deliveryStatus.icon,
    };
  }

  if (deliveryStatus.text === 'Shipped') {
    return {
      text: 'Shipped',
      description: 'Your order is on the way',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      icon: deliveryStatus.icon,
    };
  }

  if (deliveryStatus.text === 'Out for Delivery') {
    return {
      text: 'Out for Delivery',
      description: 'Will arrive today',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      icon: deliveryStatus.icon,
    };
  }

  // Default processing
  return {
    text: 'Processing',
    description: 'Order is being prepared',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    icon: deliveryStatus.icon,
  };
};
