import React from 'react';

export const RegisterLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azurio mx-auto mb-4"></div>
        <p className="text-gray-600">Creating your account...</p>
      </div>
    </div>
  );
};
