import React from 'react';
import { FiXCircle } from 'react-icons/fi';

const MyOrdersError = ({ error }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center">
        <FiXCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Error loading orders
        </h3>
        <p className="text-gray-600">{error}</p>
      </div>
    </div>
  );
};

export default MyOrdersError;
