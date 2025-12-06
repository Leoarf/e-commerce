import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createCheckout } from '../../../redux/slices/checkoutSlice';
import { SHIPPING_CONFIG } from './checkoutConfig';

export const useCheckout = () => {
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

  const cartSummary = {
    subtotal:
      cart?.products?.reduce((sum, product) => {
        const price = parseFloat(product.price) || 0;
        const quantity = parseInt(product.quantity) || 1;
        return sum + price * quantity;
      }, 0) || 0,
    totalItems:
      cart?.products?.reduce(
        (total, product) => total + (parseInt(product.quantity) || 1),
        0
      ) || 0,
  };

  const shippingCost =
    cartSummary.subtotal < SHIPPING_CONFIG.THRESHOLD ? SHIPPING_CONFIG.COST : 0;

  const totalWithShipping = cartSummary.subtotal + shippingCost;

  useEffect(() => {
    if (!cart?.products?.length) {
      navigate('/');
    }
  }, [cart, navigate]);

  const updateAddressField = useCallback((field, value) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (!validateShippingAddress()) return;

    if (cart?.products?.length) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: 'Paypal',
          totalPrice: totalWithShipping,
        })
      );

      if (res.payload?._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = useCallback(
    async (details) => {
      if (!checkoutId) return;

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

        await finalizeCheckout(checkoutId);
        navigate('/order-confirmation');
      } catch (error) {
        console.error('Payment failed:', error);
      }
    },
    [checkoutId, navigate]
  );

  const finalizeCheckout = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${id}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
    } catch (error) {
      console.error('Checkout finalization failed:', error);
      throw error;
    }
  };

  const validateShippingAddress = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'address',
      'city',
      'postalCode',
      'country',
      'phone',
    ];
    const missingFields = requiredFields.filter(
      (field) => !shippingAddress[field]?.trim()
    );

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    return true;
  };

  return {
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
  };
};
