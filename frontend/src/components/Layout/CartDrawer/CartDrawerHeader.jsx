import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FiShoppingBag } from 'react-icons/fi';

export const CartDrawerHeader = ({
  totalItemsCount,
  uniqueItemsCount,
  toggleCartDrawer,
}) => (
  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/80 bg-white/95 backdrop-blur-sm">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-r from-azurio/10 to-blue-100 rounded-xl flex items-center justify-center">
        <FiShoppingBag className="h-5 w-5 text-azurio" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Your Cart
        </h2>
        <p className="text-xs text-gray-500">
          {totalItemsCount} item{totalItemsCount !== 1 ? 's' : ''}
          {uniqueItemsCount > 0 && ` (${uniqueItemsCount} unique)`}
        </p>
      </div>
    </div>
    <button
      onClick={toggleCartDrawer}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
      aria-label="Close cart"
    >
      <IoMdClose className="h-6 w-6 text-gray-500 group-hover:text-gray-900 transition-colors" />
    </button>
  </div>
);
