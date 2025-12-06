import React from 'react';

const CartItemsList = ({ products }) => {
  if (!products?.length) return null;

  return (
    <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
      <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-medium">
        Items (
        {products.reduce((sum, p) => sum + (parseInt(p.quantity) || 1), 0)}{' '}
        items)
      </div>
      <div className="max-h-60 md:max-h-80 overflow-y-auto pr-2">
        {products.map((product, index) => {
          const price = parseFloat(product.price) || 0;
          const quantity = parseInt(product.quantity) || 1;
          const totalPrice = price * quantity;

          return (
            <div
              key={`${product._id || index}-${product.size}-${product.color}`}
              className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl hover:bg-gray-100 transition-colors mb-2 last:mb-0"
            >
              <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-azurio text-white text-xs w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center">
                    {quantity}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">
                    {product.name}
                  </h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.size && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                        {product.size}
                      </span>
                    )}
                    {product.color && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                        {product.color}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2 md:ml-4">
                <div className="font-medium text-gray-900 text-sm md:text-base whitespace-nowrap">
                  ${totalPrice.toFixed(2)}
                </div>
                <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                  ${price.toFixed(2)} each × {quantity}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartItemsList;
