import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaExclamationCircle } from 'react-icons/fa';
import BasicInfoCard from './BasicInfoCard';
import VariantsCard from './VariantsCard';
import ImagesCard from './ImagesCard';
import ActionButtons from './ActionButtons';
import { useEditProduct } from './useEditProduct';

function EditProductForm() {
  const {
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
  } = useEditProduct();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azurio"></div>
      </div>
    );

  if (error)
    return (
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
        <BasicInfoCard productData={productData} handleChange={handleChange} />

        <VariantsCard
          productData={productData}
          sizeInput={sizeInput}
          colorInput={colorInput}
          handleSizeInputChange={handleSizeInputChange}
          handleSizeInputBlur={handleSizeInputBlur}
          handleColorInputChange={handleColorInputChange}
          handleColorInputBlur={handleColorInputBlur}
          handleRemoveSize={handleRemoveSize}
          handleRemoveColor={handleRemoveColor}
        />

        <ImagesCard
          productData={productData}
          uploading={uploading}
          handleImageUpload={handleImageUpload}
          handleRemoveImage={handleRemoveImage}
        />

        <ActionButtons
          saving={saving}
          onCancel={() => navigate('/admin/products')}
        />
      </form>
    </div>
  );
}

export default EditProductForm;
