import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from 'axios';
import {
  FiChevronRight,
  FiTruck,
  FiShield,
  FiLock,
  FiCreditCard,
  FiChevronLeft,
} from 'react-icons/fi';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  // Calculate subtotal correctly based on quantity
  const calculateSubtotal = () => {
    if (!cart?.products) return 0;
    
    return cart.products.reduce((sum, product) => {
      const price = parseFloat(product.price) || 0;
      const quantity = parseInt(product.quantity) || 1;
      return sum + (price * quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  
  // Calculate total items count
  const totalItemsCount = cart?.products?.reduce((total, product) => {
    return total + (parseInt(product.quantity) || 1);
  }, 0) || 0;

  const SHIPPING_THRESHOLD = 100;
  const SHIPPING_COST = 10;
  const shippingCost = subtotal < SHIPPING_THRESHOLD ? SHIPPING_COST : 0;
  const totalWithShipping = subtotal + shippingCost;

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: 'Paypal',
          totalPrice: totalWithShipping,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: 'paid', paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
    navigate('/order-confirmation');
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      navigate('/order-confirmation');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azurio mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCreditCard className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Error Loading Cart
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-azurio text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-4 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCreditCard className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Your Cart is Empty
          </h3>
          <p className="text-gray-600 mb-6">
            Add some items to your cart before checking out.
          </p>
          <button
            onClick={() => navigate('/collections')}
            className="px-6 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header - Mobile friendly */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/collections/all')}
            className="flex items-center space-x-2 text-azurio hover:text-blue-700 font-medium mb-4 group"
          >
            <FiChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Shop</span>
          </button>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Complete your purchase in a few simple steps
          </p>
        </div>
        {/* Progress Steps - Hide on small mobile */}
        <div className="mb-8 hidden sm:block">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-azurio text-white flex items-center justify-center font-bold text-sm md:text-base">
                1
              </div>
              <div className="ml-2 text-sm font-medium text-gray-900 hidden md:block">
                Cart
              </div>
            </div>
            <div className="w-12 md:w-20 h-0.5 bg-azurio mx-2"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-azurio text-white flex items-center justify-center font-bold text-sm md:text-base">
                2
              </div>
              <div className="ml-2 text-sm font-medium text-gray-900 hidden md:block">
                Delivery
              </div>
            </div>
            <div
              className={`w-12 md:w-20 h-0.5 mx-2 ${
                checkoutId ? 'bg-azurio' : 'bg-gray-300'
              }`}
            ></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${
                  checkoutId ? 'bg-azurio' : 'bg-gray-300'
                } text-white flex items-center justify-center font-bold text-sm md:text-base`}
              >
                3
              </div>
              <div className="ml-2 text-sm font-medium text-gray-900 hidden md:block">
                Payment
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiCreditCard className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 truncate">
                    Contact Information
                  </h2>
                  <p className="text-gray-600 text-xs md:text-sm truncate">
                    We'll use this to send order updates
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-xs md:text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user ? user.email : ''}
                  className="w-full p-3 md:p-4 border border-gray-300 rounded-lg md:rounded-xl bg-gray-50 focus:ring-2 focus:ring-azurio focus:border-transparent text-sm md:text-base"
                  disabled
                />
              </div>
            </div>
            {/* Shipping Address Card */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiTruck className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 truncate">
                    Shipping Address
                  </h2>
                  <p className="text-gray-600 text-xs md:text-sm truncate">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>
              <form
                onSubmit={handleCreateCheckout}
                className="space-y-4 md:space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1 md:mb-2 text-xs md:text-sm font-medium">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.firstName}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full p-3 md:p-4 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-azurio focus:border-transparent text-sm md:text-base"
                      required
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 md:mb-2 text-xs md:text-sm font-medium">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.lastName}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full p-3 md:p-4 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-azurio focus:border-transparent text-sm md:text-base"
                      required
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 md:mb-2 text-xs md:text-sm font-medium">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        address: e.target.value,
                      })
                    }
                    className="w-full p-3 md:p-4 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-azurio focus:border-transparent text-sm md:text-base"
                    required
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1 md:mb-2 text-xs md:text-sm font-medium">
                      City *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          city: e.target.value,
                        })
                      }
                      className="w-full p-3 md:p-4 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-azurio focus:border-transparent text-sm md:text-base"
                      required
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 md:mb-2 text-xs md:text-sm font-medium">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          postalCode: e.target.value,
                        })
                      }
                      className="w-full p-3 md:p-4 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-azurio focus:border-transparent text-sm md:text-base"
                      required
                      placeholder="10001"
                    />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-gray-700 mb-1 md:mb-2 text-xs md:text-sm font-medium">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.country}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          country: e.target.value,
                        })
                      }
                      className="w-full p-3 md:p-4 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-azurio focus:border-transparent text-sm md:text-base"
                      required
                      placeholder="United States"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 md:mb-2 text-xs md:text-sm font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        phone: e.target.value,
                      })
                    }
                    className="w-full p-3 md:p-4 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-azurio focus:border-transparent text-sm md:text-base"
                    required
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                {/* Shipping Notice */}
                {subtotal < SHIPPING_THRESHOLD && (
                  <div className="mt-4 p-3 md:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg md:rounded-xl">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-yellow-600 font-bold text-xs md:text-sm">
                          !
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm text-yellow-800">
                          <span className="font-bold">
                            ${(SHIPPING_THRESHOLD - subtotal).toFixed(2)} away
                          </span>{' '}
                          from free shipping! Add more items to save $
                          {SHIPPING_COST} on shipping.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* Continue Button */}
                {!checkoutId && (
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold py-3 md:py-4 rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group text-sm md:text-base"
                  >
                    <span>Continue to Payment</span>
                    <FiChevronRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </form>
            </div>
            {/* Payment Section */}
            {checkoutId && (
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
                <div className="flex items-center space-x-3 mb-4 md:mb-6">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiLock className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 truncate">
                      Payment Method
                    </h2>
                    <p className="text-gray-600 text-xs md:text-sm truncate">
                      Complete your purchase securely
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">
                    Pay with PayPal
                  </h3>
                  <div className="bg-gray-50 p-4 md:p-6 rounded-lg md:rounded-xl border border-gray-200">
                    <PayPalButton
                      amount={totalWithShipping}
                      onSuccess={handlePaymentSuccess}
                      onError={() => alert('Payment failed. Please try again.')}
                    />
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 text-center">
                    You'll be redirected to PayPal to complete your payment
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary Card - Não sticky em mobile */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:sticky lg:top-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
                Order Summary
              </h2>
              {/* Items List */}
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-medium">
                  Items ({totalItemsCount} items)
                </div>
                <div className="max-h-60 md:max-h-80 overflow-y-auto pr-2">
                  {cart.products.map((product, index) => {
                    const price = parseFloat(product.price) || 0;
                    const quantity = parseInt(product.quantity) || 1;
                    const totalPrice = price * quantity;
                    
                    return (
                      <div
                        key={index}
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
              {/* Price Breakdown */}
              <div className="space-y-2 md:space-y-3 border-t border-gray-200 pt-4 md:pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm md:text-base">
                    Subtotal ({totalItemsCount} items)
                  </span>
                  <span className="font-medium text-sm md:text-base">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 text-sm md:text-base">
                      Shipping
                    </span>
                    {shippingCost === 0 ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        FREE
                      </span>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                        STANDARD
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-medium text-sm md:text-base ${
                      shippingCost === 0 ? 'text-green-600' : ''
                    }`}
                  >
                    {shippingCost === 0
                      ? 'Free'
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                {/* Free Shipping Progress */}
                {subtotal < SHIPPING_THRESHOLD && (
                  <div className="mt-3 md:mt-4 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-azurio/10 rounded-lg md:rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs md:text-sm font-medium text-gray-700">
                        Free Shipping Progress
                      </span>
                      <span className="text-xs md:text-sm font-bold text-blue-600">
                        ${subtotal.toFixed(2)} / ${SHIPPING_THRESHOLD}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                      <div
                        className="bg-gradient-to-r from-azurio to-blue-500 h-1.5 md:h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100)}%`,
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
                <div className="border-t border-gray-300 pt-3 md:pt-4 mt-3 md:mt-4">
                  <div className="flex justify-between items-center text-base md:text-lg font-bold">
                    <span>Total</span>
                    <div className="text-right">
                      <div className="text-xl md:text-2xl text-azurio">
                        ${totalWithShipping.toFixed(2)}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 font-normal">
                        {shippingCost === 0
                          ? 'Free shipping applied'
                          : 'Includes shipping fee'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Security Badge */}
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                  <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600">
                    <FiShield className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600">
                    <FiLock className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                    <span>SSL Encrypted</span>
                  </div>
                </div>
                <p className="text-center text-xs text-gray-500 mt-2 md:mt-3">
                  Your payment information is encrypted and secure. We never
                  store your credit card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;