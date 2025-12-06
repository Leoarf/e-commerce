import React from 'react';
import CartContents from '../Cart/CartContents';
import { useCartDrawer } from './CartDrawer/useCartDrawer';
import { useCartCalculations } from './CartDrawer/useCartCalculations';
import { CartDrawerHeader } from './CartDrawer/CartDrawerHeader';
import { FreeShippingProgress } from './CartDrawer/FreeShippingProgress';
import { EmptyCart } from './CartDrawer/EmptyCart';
import { CartDrawerFooter } from './CartDrawer/CartDrawerFooter';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const { cart, userId, guestId, handleCheckout, handleContinueShopping } =
    useCartDrawer(toggleCartDrawer);
  const calculations = useCartCalculations(cart);

  return (
    <>
      <Overlay drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[28rem] bg-gradient-to-b from-white to-gray-50 shadow-2xl
        transform transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        flex flex-col overflow-hidden
        ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ zIndex: 9999 }}
      >
        <CartDrawerHeader
          totalItemsCount={calculations.totalItemsCount}
          uniqueItemsCount={calculations.uniqueItemsCount}
          toggleCartDrawer={toggleCartDrawer}
        />

        <CartContent
          cart={cart}
          userId={userId}
          guestId={guestId}
          subtotal={calculations.subtotal}
          onContinueShopping={handleContinueShopping}
        />

        {cart?.products?.length > 0 && (
          <CartDrawerFooter
            subtotal={calculations.subtotal}
            shippingCost={calculations.shippingCost}
            totalWithShipping={calculations.totalWithShipping}
            totalItemsCount={calculations.totalItemsCount}
            onCheckout={handleCheckout}
            onContinueShopping={handleContinueShopping}
          />
        )}
      </div>
    </>
  );
};

const Overlay = ({ drawerOpen, toggleCartDrawer }) => (
  <div
    className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
      drawerOpen
        ? 'opacity-100 pointer-events-auto'
        : 'opacity-0 pointer-events-none'
    }`}
    onClick={toggleCartDrawer}
    style={{ zIndex: 9998 }}
  />
);

const CartContent = ({
  cart,
  userId,
  guestId,
  subtotal,
  onContinueShopping,
}) => (
  <div className="flex-grow px-6 py-4 overflow-y-auto">
    {cart?.products?.length > 0 ? (
      <>
        <FreeShippingProgress subtotal={subtotal} />
        <CartContents cart={cart} userId={userId} guestId={guestId} />
      </>
    ) : (
      <EmptyCart onContinueShopping={onContinueShopping} />
    )}
  </div>
);

export default CartDrawer;
