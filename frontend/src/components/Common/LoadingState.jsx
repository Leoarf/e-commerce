import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingState = () => {
  return (
    <div className="p-12 text-center">
      <div className="flex flex-col items-center justify-center">
        <FaSpinner className="h-8 w-8 text-azurio animate-spin mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">Loading...</h3>
        <p className="text-gray-500">Please wait while we fetch data</p>
      </div>
    </div>
  );
};

export default LoadingState;
