import React from 'react';
import { OrderConfirmationHeader } from './OrderConfirmationPage/OrderConfirmationHeader';
import { OrderTrackingCard } from './OrderConfirmationPage/OrderTrackingCard';
import { OrderSummaryCard } from './OrderConfirmationPage/OrderSummaryCard';
import { OrderActions } from './OrderConfirmationPage/OrderActions';
import { OrderConfirmationLoading } from './OrderConfirmationPage/OrderConfirmationLoading';
import { useOrderConfirmation } from './OrderConfirmationPage/useOrderConfirmation';

const OrderConfirmationPage = () => {
  const {
    checkout,
    user,
    calculateEstimatedDelivery,
    calculateSubtotal,
    calculateTotalItemsCount,
  } = useOrderConfirmation();

  if (!checkout) {
    return <OrderConfirmationLoading />;
  }

  const subtotal = calculateSubtotal();
  const totalItemsCount = calculateTotalItemsCount();
  const delivery = calculateEstimatedDelivery(checkout.createdAt);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <OrderConfirmationHeader user={user} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2 space-y-8">
            <OrderTrackingCard
              checkout={checkout}
              delivery={delivery}
              totalItemsCount={totalItemsCount}
            />
            <OrderActions />
          </div>
          {/* Right Column - Order Details */}
          <div className="space-y-8">
            <OrderSummaryCard
              checkout={checkout}
              subtotal={subtotal}
              totalItemsCount={totalItemsCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
