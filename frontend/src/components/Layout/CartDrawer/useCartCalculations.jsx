import { useMemo } from 'react';

const SHIPPING_THRESHOLD = 100;

export const useCartCalculations = (cart) => {
  return useMemo(() => {
    const subtotal =
      cart?.products?.reduce((sum, product) => {
        const price = parseFloat(product.price) || 0;
        const quantity = parseInt(product.quantity) || 1;
        return sum + price * quantity;
      }, 0) || 0;

    const shippingCost = subtotal < SHIPPING_THRESHOLD ? 10 : 0;
    const totalWithShipping = subtotal + shippingCost;

    const totalItemsCount =
      cart?.products?.reduce((total, product) => {
        return total + (parseInt(product.quantity) || 1);
      }, 0) || 0;

    return {
      subtotal,
      shippingCost,
      totalWithShipping,
      totalItemsCount,
      uniqueItemsCount: cart?.products?.length || 0,
      SHIPPING_THRESHOLD,
    };
  }, [cart]);
};
