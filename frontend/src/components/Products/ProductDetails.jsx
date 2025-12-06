import React from 'react';
import ProductGrid from './ProductGrid';
import ProductDetailsHeader from './ProductDetails/ProductDetailsHeader';
import ProductDetailsSkeleton from './ProductDetails/ProductDetailsSkeleton';
import ProductDetailsImages from './ProductDetails/ProductDetailsImages';
import ProductDetailsInfo from './ProductDetails/ProductDetailsInfo';
import ProductDetailsSelection from './ProductDetails/ProductDetailsSelection';
import ProductDetailsActions from './ProductDetails/ProductDetailsActions';
import ProductDetailsFeatures from './ProductDetails/ProductDetailsFeatures';
import ProductDetailsSpecs from './ProductDetails/ProductDetailsSpecs';
import { useProductDetails } from './ProductDetails/useProductDetails';

const ProductDetails = ({ productId }) => {
  const {
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
  } = useProductDetails(productId);

  if (loading) {
    return <ProductDetailsSkeleton />;
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
            <ProductDetailsHeader productName={selectedProduct.name} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {/* Left Column - Images */}
              <ProductDetailsImages
                images={selectedProduct.images}
                mainImage={mainImage}
                isHovering={isHovering}
                mousePosition={mousePosition}
                imageContainerRef={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onThumbnailClick={setMainImage}
              />

              {/* Right Column - Product Info */}
              <div className="space-y-8">
                <ProductDetailsInfo
                  name={selectedProduct.name}
                  rating={selectedProduct.rating}
                  numReviews={selectedProduct.numReviews}
                  price={selectedProduct.price}
                  description={selectedProduct.description}
                />

                <ProductDetailsSelection
                  colors={selectedProduct.colors}
                  sizes={selectedProduct.sizes}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  onColorSelect={setSelectedColor}
                  onSizeSelect={setSelectedSize}
                />

                <div className="space-y-6">
                  <ProductDetailsActions
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                  />

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

                <ProductDetailsFeatures />

                <ProductDetailsSpecs
                  brand={selectedProduct.brand}
                  material={selectedProduct.material}
                  rating={selectedProduct.rating}
                  numReviews={selectedProduct.numReviews}
                  category={selectedProduct.category}
                  id={selectedProduct._id}
                  countInStock={selectedProduct.countInStock}
                />
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
