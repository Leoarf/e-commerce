import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const OrderItemsSection = ({
  orderDetails,
  totalItemsCount,
  subtotal,
  formatCurrency,
}) => {
  return (
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
  );
};
