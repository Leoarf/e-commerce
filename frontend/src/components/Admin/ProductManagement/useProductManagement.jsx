import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProduct,
  fetchAdminProducts,
} from '../../../redux/slices/adminProductSlice';

export function useProductManagement() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this product? This action cannot be undone.'
      )
    ) {
      dispatch(deleteProduct(id));
    }
  };

  // Calculate statistics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice =
    totalProducts > 0 ? (totalValue / totalProducts).toFixed(2) : 0;

  // Function to get first image product
  const getFirstImageUrl = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].url;
    }
    // Fallback to placeholder if there is no image
    return `https://via.placeholder.com/48/48?text=${encodeURIComponent(
      product.name.substring(0, 2)
    )}`;
  };

  // Function to get image alt text
  const getImageAlt = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].altText || product.name;
    }
    return product.name;
  };

  return {
    products,
    loading,
    error,
    handleDelete,
    getFirstImageUrl,
    getImageAlt,
    totalProducts,
    totalValue,
    averagePrice,
  };
}
