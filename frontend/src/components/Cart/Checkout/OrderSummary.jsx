import React from 'react';
import CartItemsList from './CartItemsList';
import PriceBreakdown from './PriceBreakdown';
import SecurityBadge from './SecurityBadge';

const OrderSummary = ({
  cart,
  cartSummary,
  shippingCost,
  totalWithShipping,
}) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:sticky lg:top-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
        Order Summary
      </h2>

      <CartItemsList products={cart.products} />

      <PriceBreakdown
        cartSummary={cartSummary}
        shippingCost={shippingCost}
        totalWithShipping={totalWithShipping}
      />

      <SecurityBadge />
    </div>
  </div>
);

export default OrderSummary;
