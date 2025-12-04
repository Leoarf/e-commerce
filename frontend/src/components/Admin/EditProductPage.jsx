import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  fetchProductDetails,
  updateProduct,
} from '../../redux/slices/productsSlice';
import axios from 'axios';
import {
  FaArrowLeft,
  FaUpload,
  FaTimes,
  FaSave,
  FaBox,
  FaDollarSign,
  FaTag,
  FaPalette,
  FaRuler,
  FaImage,
  FaSpinner,
  FaExclamationCircle
} from 'react-icons/fa';

function EditProductPage() {
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
      [name]: name === 'price' || name === 'countInStock' ? Number(value) : value 
    }));
  };

  const handleSizeInputChange = (e) => {
    const value = e.target.value;
    setSizeInput(value);
    
    if (value.endsWith(',')) {
      const sizesArray = value.split(',').map(s => s.trim()).filter(s => s);
      setProductData(prev => ({ ...prev, sizes: sizesArray }));
      setSizeInput(value + ' ');
    }
  };

  const handleSizeInputBlur = () => {
    const sizesArray = sizeInput.split(',').map(s => s.trim()).filter(s => s);
    setProductData(prev => ({ ...prev, sizes: sizesArray }));
  };

  const handleColorInputChange = (e) => {
    const value = e.target.value;
    setColorInput(value);
    
    if (value.endsWith(',')) {
      const colorsArray = value.split(',').map(c => c.trim()).filter(c => c);
      setProductData(prev => ({ ...prev, colors: colorsArray }));
      setColorInput(value + ' ');
    }
  };

  const handleColorInputBlur = () => {
    const colorsArray = colorInput.split(',').map(c => c.trim()).filter(c => c);
    setProductData(prev => ({ ...prev, colors: colorsArray }));
  };

  const handleRemoveSize = (indexToRemove) => {
    const newSizes = productData.sizes.filter((_, index) => index !== indexToRemove);
    setProductData(prev => ({ ...prev, sizes: newSizes }));
    setSizeInput(newSizes.join(', '));
  };

  const handleRemoveColor = (indexToRemove) => {
    const newColors = productData.colors.filter((_, index) => index !== indexToRemove);
    setProductData(prev => ({ ...prev, colors: newColors }));
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
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azurio"></div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <div className="flex items-center">
          <FaExclamationCircle className="h-5 w-5 mr-2" />
          <strong className="font-bold">Error: </strong>
          <span className="ml-1">{error}</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
        >
          Go back
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Link
                to="/admin/products"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <FaArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Link>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Edit Product
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Update product details and information
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Information Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="p-5 md:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-azurio/10">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <FaBox className="h-5 w-5 mr-3 text-azurio" />
              Basic Information
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Product details and pricing
            </p>
          </div>

          <div className="p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio"
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaTag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="sku"
                    value={productData.sku}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio"
                    placeholder="Enter SKU"
                    required
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Count In Stock *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBox className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="countInStock"
                    value={productData.countInStock}
                    onChange={handleChange}
                    min="0"
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio"
                    placeholder="Enter quantity"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio resize-none"
                rows={4}
                placeholder="Enter product description"
                required
              />
            </div>
          </div>
        </div>

        {/* Variants Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="p-5 md:p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-purple-100/50">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <FaPalette className="h-5 w-5 mr-3 text-purple-600" />
              Product Variants
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage sizes and colors
            </p>
          </div>

          <div className="p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaRuler className="h-4 w-4 mr-2 text-blue-600" />
                  Sizes (comma-separated)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={sizeInput}
                    onChange={handleSizeInputChange}
                    onBlur={handleSizeInputBlur}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                    placeholder="S, M, L, XL"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Type a size and press comma to add another
                </p>
                
                {productData.sizes.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Added Sizes:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {productData.sizes.map((size, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
                        >
                          {size}
                          <button
                            type="button"
                            onClick={() => handleRemoveSize(index)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <FaTimes className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaPalette className="h-4 w-4 mr-2 text-purple-600" />
                  Colors (comma-separated)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={colorInput}
                    onChange={handleColorInputChange}
                    onBlur={handleColorInputBlur}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                    placeholder="Red, Blue, Green"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Type a color and press comma to add another
                </p>
                
                {productData.colors.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Added Colors:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {productData.colors.map((color, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium"
                        >
                          {color}
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(index)}
                            className="ml-2 text-purple-600 hover:text-purple-800"
                          >
                            <FaTimes className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Images Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="p-5 md:p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-emerald-100/50">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <FaImage className="h-5 w-5 mr-3 text-emerald-600" />
              Product Images
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Upload and manage product images
            </p>
          </div>

          <div className="p-5 md:p-6">
            {/* Upload Area */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                <label className="flex flex-col items-center justify-center cursor-pointer">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg mb-3">
                    <FaUpload className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                    disabled={uploading}
                  />
                </label>
              </div>
              {uploading && (
                <div className="mt-4 flex items-center justify-center text-emerald-600">
                  <FaSpinner className="h-4 w-4 animate-spin mr-2" />
                  Uploading image...
                </div>
              )}
            </div>

            {/* Current Images */}
            {productData.images.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Current Images ({productData.images.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {productData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={image.url}
                          alt={image.altText || 'Product Image'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                      >
                        <FaTimes className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <FaSpinner className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <FaSave className="h-4 w-4 mr-2" />
                Update Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductPage;