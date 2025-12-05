import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useCartDrawer = (toggleCartDrawer) => {
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

  return {
    user,
    guestId,
    cart,
    userId,
    handleCheckout,
    handleContinueShopping,
  };
};
