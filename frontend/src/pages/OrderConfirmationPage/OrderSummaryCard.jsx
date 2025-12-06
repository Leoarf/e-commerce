import React from 'react';
import { FiCreditCard, FiMapPin } from 'react-icons/fi';

export const OrderSummaryCard = ({ checkout, subtotal, totalItemsCount }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
      <div className="space-y-4 mb-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Order Number</span>
            <span className="font-mono font-medium text-gray-900">
              #{checkout._id.slice(-8).toUpperCase()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Order Date</span>
            <span className="font-medium">
              {new Date(checkout.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total Items</span>
            <span className="font-medium">{totalItemsCount}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Subtotal ({totalItemsCount} items)
              </span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-emerald-600">Free</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total Paid</span>
            <div className="text-right">
              <div className="text-2xl text-emerald-600">
                ${parseFloat(checkout.totalPrice).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100/30 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiCreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Payment Method</h4>
              <p className="text-sm text-gray-600">PayPal</p>
            </div>
          </div>
          <div className="text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="font-medium text-emerald-600">Paid</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/30 p-4 rounded-xl border border-emerald-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <FiMapPin className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Shipping Address</h4>
              <p className="text-sm text-gray-600">Standard Shipping</p>
            </div>
          </div>
          <div className="text-sm text-gray-700 space-y-1">
            <p className="font-medium">{checkout.shippingAddress.address}</p>
            <p>
              {checkout.shippingAddress.city},{' '}
              {checkout.shippingAddress.postalCode}
            </p>
            <p>{checkout.shippingAddress.country}</p>
            {checkout.shippingAddress.phone && (
              <p className="mt-2 text-blue-600">
                📞 {checkout.shippingAddress.phone}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
