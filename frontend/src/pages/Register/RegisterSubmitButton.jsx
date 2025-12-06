import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

export const RegisterSubmitButton = ({ loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-4 px-6 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-azurio/20 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-azurio/50 disabled:opacity-70 disabled:cursor-not-allowed group"
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg">
          {loading ? 'Creating Account...' : 'Create Account'}
        </span>
        {!loading && (
          <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        )}
      </div>
    </button>
  );
};
