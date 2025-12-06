import React from 'react';

export const OrderItemsList = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        const totalPrice = price * quantity;

        return (
          <div
            key={item.productId || index}
            className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-emerald-200 transition-colors bg-gray-50 hover:bg-emerald-50/30"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover border border-gray-200"
              />
              <div className="absolute -top-1 -right-1 bg-azurio text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {quantity}
              </div>
            </div>
            <div className="ml-4 flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">
                {item.name}
              </h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {item.color && (
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                    Color: {item.color}
                  </span>
                )}
                {item.size && (
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                    Size: {item.size}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="font-bold text-gray-900">
                ${totalPrice.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                ${price.toFixed(2)} each × {quantity}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
