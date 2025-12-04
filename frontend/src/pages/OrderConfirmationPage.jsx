import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';
import {
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiMapPin,
  FiCreditCard,
  FiCalendar,
  FiShoppingBag,
  FiHome,
} from 'react-icons/fi';

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem('cart');
    } else {
      navigate('/my-orders');
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return {
      date: orderDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      days: 10,
    };
  };

  // Calculate subtotal correctly based on quantity
  const calculateSubtotal = () => {
    if (!checkout?.checkoutItems) return 0;
    
    return checkout.checkoutItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return sum + (price * quantity);
    }, 0);
  };

  // Calculate total items count
  const calculateTotalItemsCount = () => {
    if (!checkout?.checkoutItems) return 0;
    
    return checkout.checkoutItems.reduce((total, item) => {
      return total + (parseInt(item.quantity) || 1);
    }, 0);
  };

  if (!checkout) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azurio mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order confirmation...</p>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const totalItemsCount = calculateTotalItemsCount();
  const delivery = calculateEstimatedDelivery(checkout.createdAt);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Success Animation and Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <FiCheckCircle className="h-12 w-12 md:h-16 md:w-16 text-emerald-600" />
            </div>
            <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-yellow-600 font-bold text-lg">✓</span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for your purchase,{' '}
            {user?.name?.split(' ')[0] || 'Customer'}! We're preparing your
            order for shipment.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Tracking Card */}
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
              {/* Order Timeline */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Order Timeline
                </h3>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-200"></div>
                  {/* Timeline Steps */}
                  <div className="space-y-8 relative">
                    {/* Step 1 - Order Placed */}
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center relative z-10">
                        <FiCheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          Order Placed
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(checkout.createdAt).toLocaleDateString(
                            'en-US',
                            {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Your order has been received and is being processed.
                        </p>
                      </div>
                    </div>
                    {/* Step 2 - Processing */}
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center relative z-10 border-2 border-emerald-300">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          Processing
                        </h4>
                        <p className="text-sm text-gray-500">
                          Estimated: 1-2 business days
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          We're preparing your items for shipment.
                        </p>
                      </div>
                    </div>
                    {/* Step 3 - Shipping */}
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center relative z-10">
                        <FiTruck className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Shipping</h4>
                        <p className="text-sm text-gray-500">
                          Estimated: 3-7 business days
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Your order will be shipped via standard delivery.
                        </p>
                      </div>
                    </div>
                    {/* Step 4 - Delivery */}
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center relative z-10">
                        <FiCalendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          Estimated Delivery
                        </h4>
                        <p className="text-sm text-gray-500">{delivery.date}</p>
                        <p className="text-sm text-emerald-600 font-medium mt-1">
                          Expected in {delivery.days} days
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-3">
                  <FiShoppingBag className="h-5 w-5 text-azurio" />
                  <span>Order Items ({totalItemsCount} items)</span>
                </h3>
                <div className="space-y-4">
                  {checkout.checkoutItems.map((item, index) => {
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
              </div>
            </div>
            {/* Action Buttons */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Next Steps
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/my-orders')}
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col items-center justify-center space-y-2"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiShoppingBag className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">
                    View All Orders
                  </span>
                  <span className="text-xs text-gray-500 text-center">
                    Track all your purchases
                  </span>
                </button>
                <button
                  onClick={() => navigate('/collections/all')}
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col items-center justify-center space-y-2"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiHome className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">
                    Continue Shopping
                  </span>
                  <span className="text-xs text-gray-500 text-center">
                    Discover more amazing products
                  </span>
                </button>
              </div>
            </div>
          </div>
          {/* Right Column - Order Details */}
          <div className="space-y-8">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                {/* Order Info */}
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
                      <span className="text-gray-600">Subtotal ({totalItemsCount} items)</span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
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
              {/* Payment & Shipping Info */}
              <div className="space-y-6">
                {/* Payment Info */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/30 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiCreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Payment Method
                      </h4>
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
                {/* Shipping Info */}
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/30 p-4 rounded-xl border border-emerald-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <FiMapPin className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Shipping Address
                      </h4>
                      <p className="text-sm text-gray-600">Standard Shipping</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p className="font-medium">
                      {checkout.shippingAddress.address}
                    </p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;