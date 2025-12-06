import React from 'react';
import { FiMapPin, FiTruck } from 'react-icons/fi';

export const ShippingInfoSection = ({ orderDetails, deliveryStatus }) => {
  return (
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
              Your package is on the way. Expected delivery in 2-3 business
              days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
