import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const ErrorState = ({ error }) => {
  return (
    <div className="p-12 text-center">
      <div className="flex flex-col items-center justify-center">
        <FaExclamationCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          Error loading data
        </h3>
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );
};

export default ErrorState;
