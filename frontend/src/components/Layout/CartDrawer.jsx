import React from 'react';
import { IoMdClose } from 'react-icons/io';
import {
  FiShoppingBag,
  FiArrowRight,
  FiPackage,
  FiTruck,
} from 'react-icons/fi';
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  const handleContinueShopping = () => {
    toggleCartDrawer();
    navigate('/collections/all');
  };

  // Calculate subtotal CORRECTLY based on quantity
  const subtotal =
    cart?.products?.reduce((sum, product) => {
      // Convert price to number and multiply by quantity
      const price = parseFloat(product.price) || 0;
      const quantity = parseInt(product.quantity) || 1;
      return sum + (price * quantity);
    }, 0) || 0;

  const SHIPPING_THRESHOLD = 100;
  const shippingCost = subtotal < SHIPPING_THRESHOLD ? 10 : 0;
  const totalWithShipping = subtotal + shippingCost;

  // Calculate total items count (sum of all quantities)
  const totalItemsCount = cart?.products?.reduce((total, product) => {
    return total + (parseInt(product.quantity) || 1);
  }, 0) || 0;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleCartDrawer}
        style={{ zIndex: 9998 }}
      />
      
      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[28rem] bg-gradient-to-b from-white to-gray-50 shadow-2xl
        transform transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        flex flex-col overflow-hidden
        ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ zIndex: 9999 }}
      >
        {/* HEADER */}
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
                {cart?.products?.length > 0 && ` (${cart.products.length} unique)`}
              </p>
            </div>
          </div>
          <button
            onClick={toggleCartDrawer}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <IoMdClose className="h-6 w-6 text-gray-500 group-hover:text-gray-900 transition-colors" />
          </button>
        </div>
        
        {/* CART CONTENT */}
        <div className="flex-grow px-6 py-4 overflow-y-auto">
          {cart && cart?.products?.length > 0 ? (
            <>
              {/* Free Shipping Progress */}
              {subtotal < SHIPPING_THRESHOLD && subtotal > 0 && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-azurio/10 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <FiTruck className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Free Shipping Progress
                      </span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">
                      ${subtotal.toFixed(2)} / ${SHIPPING_THRESHOLD}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-azurio to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (subtotal / SHIPPING_THRESHOLD) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Add{' '}
                    <span className="font-bold text-blue-600">
                      ${(SHIPPING_THRESHOLD - subtotal).toFixed(2)}
                    </span>{' '}
                    more for free shipping
                  </p>
                </div>
              )}

              <CartContents cart={cart} userId={userId} guestId={guestId} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16 px-4 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FiShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-8 max-w-sm">
                Looks like you haven't added any products to your cart yet.
              </p>
              <button
                onClick={handleContinueShopping}
                className="px-6 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2 group"
              >
                <span>Start Shopping</span>
                <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
        
        {/* FOOTER - Only show if cart has items */}
        {cart && cart?.products?.length > 0 && (
          <div className="border-t border-gray-200/80 bg-white/95 backdrop-blur-sm">
            {/* Price Summary */}
            <div className="px-6 py-5 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal ({totalItemsCount} items)</span>
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
                      shippingCost === 0
                        ? 'text-green-600 font-medium'
                        : 'font-medium'
                    }
                  >
                    {shippingCost === 0
                      ? 'Free'
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
              </div>
              
              {/* Divider */}
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
              
              {/* Additional Info */}
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FiPackage className="h-4 w-4" />
                <span>Free returns within 30 days</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="px-6 pb-6 space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-xl 
                hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 
                active:scale-[0.98] flex items-center justify-center space-x-2 group"
              >
                <span>Proceed to Checkout</span>
                <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleContinueShopping}
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
        )}
      </div>
    </>
  );
};

export default CartDrawer;