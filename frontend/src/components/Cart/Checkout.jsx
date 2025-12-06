import React from 'react';
import { useCheckout } from './Checkout/useCheckout';
import { FiCreditCard } from 'react-icons/fi';
import CheckoutHeader from './Checkout/CheckoutHeader';
import ProgressSteps from './Checkout/ProgressSteps';
import ContactSection from './Checkout/ContactSection';
import ShippingForm from './Checkout/ShippingForm';
import PaymentSection from './Checkout/PaymentSection';
import OrderSummary from './Checkout/OrderSummary';
import LoadingState from '../Common/LoadingState';
import ErrorState from '../Common/ErrorState';

const Checkout = () => {
  const {
    cart,
    loading,
    error,
    user,
    checkoutId,
    shippingAddress,
    updateAddressField,
    handleCreateCheckout,
    handlePaymentSuccess,
    cartSummary,
    shippingCost,
    totalWithShipping,
  } = useCheckout();

  // Loading and error states
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <CheckoutHeader />
        <ProgressSteps step={checkoutId ? 3 : 2} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-6">
            <ContactSection email={user?.email} />
            <ShippingForm
              address={shippingAddress}
              onUpdate={updateAddressField}
              onSubmit={handleCreateCheckout}
              showSubmit={!checkoutId}
              subtotal={cartSummary.subtotal}
            />
            {checkoutId && (
              <PaymentSection
                total={totalWithShipping}
                onSuccess={handlePaymentSuccess}
              />
            )}
          </div>
          <OrderSummary
            cart={cart}
            cartSummary={cartSummary}
            shippingCost={shippingCost}
            totalWithShipping={totalWithShipping}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
