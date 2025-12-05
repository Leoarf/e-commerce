import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchProductDetails,
  updateProduct,
} from '../../../redux/slices/productsSlice';
import axios from 'axios';

export function useEditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    sizes: [],
    colors: [],
    images: [],
  });

  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData({
        name: selectedProduct.name || '',
        description: selectedProduct.description || '',
        price: selectedProduct.price || 0,
        countInStock: selectedProduct.countInStock || 0,
        sku: selectedProduct.sku || '',
        sizes: selectedProduct.sizes || [],
        colors: selectedProduct.colors || [],
        images: selectedProduct.images || [],
      });
      setSizeInput(selectedProduct.sizes?.join(', ') || '');
      setColorInput(selectedProduct.colors?.join(', ') || '');
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]:
        name === 'price' || name === 'countInStock' ? Number(value) : value,
    }));
  };

  const handleSizeInputChange = (e) => {
    const value = e.target.value;
    setSizeInput(value);

    if (value.endsWith(',')) {
      const sizesArray = value
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s);
      setProductData((prev) => ({ ...prev, sizes: sizesArray }));
      setSizeInput(value + ' ');
    }
  };

  const handleSizeInputBlur = () => {
    const sizesArray = sizeInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s);
    setProductData((prev) => ({ ...prev, sizes: sizesArray }));
  };

  const handleColorInputChange = (e) => {
    const value = e.target.value;
    setColorInput(value);

    if (value.endsWith(',')) {
      const colorsArray = value
        .split(',')
        .map((c) => c.trim())
        .filter((c) => c);
      setProductData((prev) => ({ ...prev, colors: colorsArray }));
      setColorInput(value + ' ');
    }
  };

  const handleColorInputBlur = () => {
    const colorsArray = colorInput
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c);
    setProductData((prev) => ({ ...prev, colors: colorsArray }));
  };

  const handleRemoveSize = (indexToRemove) => {
    const newSizes = productData.sizes.filter(
      (_, index) => index !== indexToRemove
    );
    setProductData((prev) => ({ ...prev, sizes: newSizes }));
    setSizeInput(newSizes.join(', '));
  };

  const handleRemoveColor = (indexToRemove) => {
    const newColors = productData.colors.filter(
      (_, index) => index !== indexToRemove
    );
    setProductData((prev) => ({ ...prev, colors: newColors }));
    setColorInput(newColors.join(', '));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: '' }],
      }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await dispatch(updateProduct({ id, productData })).unwrap();
      navigate('/admin/products');
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setSaving(false);
    }
  };

  return {
    productData,
    sizeInput,
    colorInput,
    uploading,
    saving,
    loading,
    error,
    handleChange,
    handleSizeInputChange,
    handleSizeInputBlur,
    handleColorInputChange,
    handleColorInputBlur,
    handleRemoveSize,
    handleRemoveColor,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
    navigate,
  };
}
