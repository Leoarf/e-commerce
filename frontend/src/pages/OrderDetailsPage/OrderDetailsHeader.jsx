import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

export const OrderDetailsHeader = ({
  orderDetails,
  orderHeaderStatus,
  navigate,
}) => {
  return (
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
              {new Date(orderDetails.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
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
              {orderHeaderStatus.icon}
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
  );
};
