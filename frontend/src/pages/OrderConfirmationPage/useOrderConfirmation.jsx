import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cartSlice';

export const useOrderConfirmation = () => {
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

  const calculateSubtotal = () => {
    if (!checkout?.checkoutItems) return 0;

    return checkout.checkoutItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return sum + price * quantity;
    }, 0);
  };

  const calculateTotalItemsCount = () => {
    if (!checkout?.checkoutItems) return 0;

    return checkout.checkoutItems.reduce((total, item) => {
      return total + (parseInt(item.quantity) || 1);
    }, 0);
  };

  return {
    checkout,
    user,
    calculateEstimatedDelivery,
    calculateSubtotal,
    calculateTotalItemsCount,
    navigate,
  };
};
