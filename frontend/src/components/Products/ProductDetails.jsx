import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import {
  FiMinus,
  FiPlus,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiStar,
} from 'react-icons/fi';

const ProductDetails = ({ productId }) => {
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

  // Function to handle mouse movement in the image
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const container = imageContainerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();
    // Calculates mouse position as a percentage (0-100%)
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

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

  const handleQuantityChange = (action) => {
    if (action === 'plus') setQuantity((prev) => prev + 1);
    if (action === 'minus' && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
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
        price: selectedProduct.price, // Usar apenas o preço normal
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
  };

  // Função para renderizar as estrelas
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Estrelas cheias
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FiStar
          key={`full-${i}`}
          className="h-5 w-5 text-amber-400 fill-amber-400"
        />
      );
    }

    // Meia estrela
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative h-5 w-5">
          <FiStar className="absolute h-5 w-5 text-gray-300" />
          <div className="absolute h-5 w-2.5 overflow-hidden">
            <FiStar className="h-5 w-5 text-amber-400 fill-amber-400" />
          </div>
        </div>
      );
    }

    // Estrelas vazias
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FiStar key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-[650px] bg-gray-200 rounded-2xl"></div>
                <div className="flex space-x-4 pl-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-20 w-20 bg-gray-200 rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {selectedProduct && (
          <>
            {/* Breadcrumb */}
            <div className="mb-8">
              <nav className="flex text-sm text-gray-600">
                <a href="/" className="hover:text-pink-600 transition-colors">
                  Home
                </a>
                <span className="mx-2">/</span>
                <a
                  href="/collections/all?"
                  className="hover:text-pink-600 transition-colors"
                >
                  Shop
                </a>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">
                  {selectedProduct.name}
                </span>
              </nav>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {/* Left Column - Images */}
              <div className="space-y-6">
                {/* Main Image with Zoom Effect */}
                <div className="relative">
                  <div
                    ref={imageContainerRef}
                    className="relative h-[650px] w-full rounded-2xl bg-gray-50 shadow-2xl overflow-hidden group"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onMouseMove={handleMouseMove}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={mainImage}
                        alt="Main Product"
                        className={`w-full h-full object-cover object-top transition-all duration-500 ${
                          isHovering ? 'scale-110 transform-gpu' : 'scale-100'
                        }`}
                        style={{
                          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                        }}
                      />
                      {/* Overlay gradient to soften the effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    {/* Zoom indicator (only in hover) */}
                    {isHovering && (
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                        Zoom
                      </div>
                    )}
                  </div>
                </div>
                {/* Thumbnails */}
                <div className="flex space-x-4 overflow-x-auto pb-2 px-1">
                  {selectedProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(image.url)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        mainImage === image.url
                          ? 'border-pink-500 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.altText || `Thumbnail ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              {/* Right Column - Product Info */}
              <div className="space-y-8">
                {/* Product Header */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    {selectedProduct.name}
                  </h1>

                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-4 mb-4">
                    {selectedProduct.rating && (
                      <>
                        <div className="flex items-center">
                          {renderStars(selectedProduct.rating)}
                        </div>
                        <span className="text-gray-700 font-medium">
                          {selectedProduct.rating.toFixed(1)}
                        </span>
                        <span className="text-gray-500">
                          ({selectedProduct.numReviews || 0} reviews)
                        </span>
                      </>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-bold text-gray-900">
                        ${selectedProduct.price?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>
                {/* Color Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Color:{' '}
                    <span className="font-normal text-gray-600">
                      {selectedColor || 'Select'}
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                          selectedColor === color
                            ? 'border-gray-900 scale-110 shadow-lg'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div
                          className="w-full h-full rounded-full"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                        {selectedColor === color && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Size Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Size:{' '}
                    <span className="font-normal text-gray-600">
                      {selectedSize || 'Select'}
                    </span>
                  </h3>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 rounded-lg border transition-all duration-300 font-medium ${
                          selectedSize === size
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Quantity & Add to Cart */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Quantity
                    </h3>
                    <div className="flex items-center space-x-4 max-w-xs">
                      <button
                        onClick={() => handleQuantityChange('minus')}
                        className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                      >
                        <FiMinus className="text-lg" />
                      </button>
                      <div className="flex-1 text-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {quantity}
                        </span>
                      </div>
                      <button
                        onClick={() => handleQuantityChange('plus')}
                        className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                      >
                        <FiPlus className="text-lg" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={isButtonDisabled}
                    className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition-all duration-300 ${
                      isButtonDisabled
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isButtonDisabled ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Adding to Cart...
                      </span>
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                </div>
                {/* Product Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FiTruck className="text-blue-600 text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Free Shipping
                      </h4>
                      <p className="text-xs text-gray-600">
                        On orders over $100
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FiShield className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        2 Year Warranty
                      </h4>
                      <p className="text-xs text-gray-600">
                        Quality guaranteed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <FiRefreshCw className="text-yellow-600 text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Easy Returns
                      </h4>
                      <p className="text-xs text-gray-600">
                        30 days return policy
                      </p>
                    </div>
                  </div>
                </div>
                {/* Product Details */}
                <div className="pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Product Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Brand
                        </h4>
                        <p className="text-gray-900 font-semibold">
                          {selectedProduct.brand}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Material
                        </h4>
                        <p className="text-gray-900 font-semibold">
                          {selectedProduct.material}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Rating
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {renderStars(selectedProduct.rating || 0)}
                          </div>
                          <span className="text-gray-900 font-semibold">
                            {selectedProduct.rating?.toFixed(1) || '0.0'}
                          </span>
                          <span className="text-gray-600">
                            ({selectedProduct.numReviews || 0} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Category
                        </h4>
                        <p className="text-gray-900 font-semibold">
                          {selectedProduct.category}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">SKU</h4>
                        <p className="text-gray-900 font-semibold">
                          {selectedProduct._id.substring(0, 8)}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Stock Status
                        </h4>
                        <p
                          className={`font-semibold ${
                            selectedProduct.countInStock > 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {selectedProduct.countInStock > 0
                            ? `${selectedProduct.countInStock} units in stock`
                            : 'Out of stock'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Similar Products */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  You May Also Like
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover similar items that match your style and preferences
                </p>
              </div>
              <ProductGrid
                products={similarProducts}
                loading={loading}
                error={error}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
