import React from 'react';
import { FiArrowRight, FiPackage } from 'react-icons/fi';

export const CartDrawerFooter = ({
  subtotal,
  shippingCost,
  totalWithShipping,
  totalItemsCount,
  onCheckout,
  onContinueShopping,
}) => (
  <div className="border-t border-gray-200/80 bg-white/95 backdrop-blur-sm">
    <div className="px-6 py-5 space-y-4">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            Subtotal ({totalItemsCount} items)
          </span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Shipping</span>
            {shippingCost === 0 ? (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                FREE
              </span>
            ) : (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                ${shippingCost.toFixed(2)}
              </span>
            )}
          </div>
          <span
            className={
              shippingCost === 0 ? 'text-green-600 font-medium' : 'font-medium'
            }
          >
            {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <div className="text-right">
            <div className="text-2xl text-azurio">
              ${totalWithShipping.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 font-normal">
              {shippingCost === 0
                ? 'Free shipping applied'
                : 'Shipping calculated'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <FiPackage className="h-4 w-4" />
        <span>Free returns within 30 days</span>
      </div>
    </div>

    <div className="px-6 pb-6 space-y-3">
      <button
        onClick={onCheckout}
        className="w-full py-4 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-xl 
        hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 
        active:scale-[0.98] flex items-center justify-center space-x-2 group"
      >
        <span>Proceed to Checkout</span>
        <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <button
        onClick={onContinueShopping}
        className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-xl 
        hover:border-azurio hover:text-azurio hover:bg-azurio/5 transition-all duration-300"
      >
        Continue Shopping
      </button>

      <p className="text-xs text-gray-500 text-center pt-2">
        Secure checkout · SSL encrypted · 100% protected
      </p>
    </div>
  </div>
);
