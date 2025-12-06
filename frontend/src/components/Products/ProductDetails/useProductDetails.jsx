import { useEffect, useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from '../../../redux/slices/productsSlice';
import { addToCart } from '../../../redux/slices/cartSlice';

export const useProductDetails = (productId) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);
  const productFetchId = productId || id;

  const handleMouseMove = useCallback((e) => {
    if (!imageContainerRef.current) return;
    const container = imageContainerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = useCallback(
    (action) => {
      if (action === 'plus') setQuantity((prev) => prev + 1);
      if (action === 'minus' && quantity > 1) setQuantity((prev) => prev - 1);
    },
    [quantity]
  );

  const handleAddToCart = useCallback(() => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size and color before adding to cart.', {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
        price: selectedProduct.price,
      })
    )
      .then(() => {
        toast.success('Product added to cart!', {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  }, [
    dispatch,
    productFetchId,
    quantity,
    selectedSize,
    selectedColor,
    guestId,
    user,
    selectedProduct,
  ]);

  return {
    selectedProduct,
    loading,
    error,
    similarProducts,
    mainImage,
    selectedSize,
    selectedColor,
    quantity,
    isButtonDisabled,
    isHovering,
    mousePosition,
    imageContainerRef,
    handleMouseMove,
    setMainImage,
    handleQuantityChange,
    handleAddToCart,
    setSelectedSize,
    setSelectedColor,
    setIsHovering,
  };
};
