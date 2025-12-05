import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const ErrorState = ({ error }) => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <div className="flex items-center">
          <FaExclamationCircle className="h-5 w-5 mr-2" />
          <strong className="font-bold">Error: </strong>
          <span className="ml-1">{error}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
