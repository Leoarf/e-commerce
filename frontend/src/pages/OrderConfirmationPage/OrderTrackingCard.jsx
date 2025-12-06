import React from 'react';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { OrderTimeline } from './OrderTimeline';
import { OrderItemsList } from './OrderItemsList';

export const OrderTrackingCard = ({ checkout, delivery, totalItemsCount }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center space-x-3">
          <FiPackage className="h-6 w-6 text-azurio" />
          <span>Order #{checkout._id.slice(-8).toUpperCase()}</span>
        </h2>
        <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
          Processing
        </span>
      </div>

      <OrderTimeline checkout={checkout} delivery={delivery} />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-3">
          <FiShoppingBag className="h-5 w-5 text-azurio" />
          <span>Order Items ({totalItemsCount} items)</span>
        </h3>
        <OrderItemsList items={checkout.checkoutItems} />
      </div>
    </div>
  );
};
