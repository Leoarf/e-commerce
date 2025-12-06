import React from 'react';
import { FiChevronRight, FiClock, FiTruck } from 'react-icons/fi';
import { FiCheckCircle, FiXCircle, FiPackage } from 'react-icons/fi';

const iconMap = {
  FiCheckCircle: FiCheckCircle,
  FiXCircle: FiXCircle,
  FiPackage: FiPackage,
  FiTruck: FiTruck,
  FiClock: FiClock,
};

const MyOrdersList = ({
  orders,
  onRowClick,
  getPaymentStatusDisplay,
  getDeliveryStatusDisplay,
  getTotalItemsCount,
  getOrderSubtotal,
}) => {
  return (
    <div className="divide-y divide-gray-100">
      {orders.map((order) => {
        const paymentStatus = getPaymentStatusDisplay(order);
        const deliveryStatus = getDeliveryStatusDisplay(order);
        const totalItemsCount = getTotalItemsCount(order.orderItems);
        const orderSubtotal = getOrderSubtotal(order.orderItems);

        const PaymentIcon = iconMap[paymentStatus.icon] || FiCheckCircle;
        const DeliveryIcon = iconMap[deliveryStatus.icon] || FiPackage;

        return (
          <div
            key={order._id}
            onClick={() => onRowClick(order._id)}
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
                          {totalItemsCount} item
                          {totalItemsCount > 1 ? 's' : ''}
                          {order.orderItems.length > 0 &&
                            ` (${order.orderItems.length} unique)`}
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
                    <div
                      className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                        paymentStatus.bgColor
                      } ${
                        paymentStatus.textColor
                      } border ${paymentStatus.bgColor
                        .replace('bg-', 'border-')
                        .replace('100', '200')}`}
                    >
                      <PaymentIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {paymentStatus.text}
                      </span>
                    </div>
                    {/* Delivery Status */}
                    <div
                      className={`flex items-center space-x-2 px-3 py-1 rounded-full ${deliveryStatus.bgColor} ${deliveryStatus.textColor} border ${deliveryStatus.borderColor}`}
                    >
                      <DeliveryIcon className="h-4 w-4" />
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
      })}
    </div>
  );
};

export default MyOrdersList;
