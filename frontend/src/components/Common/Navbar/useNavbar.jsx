import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce(
      (total, product) => total + (parseInt(product.quantity) || 0),
      0
    ) || 0;

  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);

  return {
    drawerOpen,
    navDrawerOpen,
    cartItemCount,
    user,
    toggleCartDrawer,
    toggleNavDrawer,
  };
};
