import React from 'react';
import { FiCalendar, FiCheckCircle } from 'react-icons/fi';

export const OrderTimelineSection = ({
  orderDetails,
  paymentStatus,
  deliveryStatus,
}) => {
  return (
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
              {new Date(orderDetails.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
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
            <p className="text-sm text-gray-500">{paymentStatus.description}</p>
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
                {new Date(orderDetails.deliveredAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
