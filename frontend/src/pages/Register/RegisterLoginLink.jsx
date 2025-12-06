import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export const RegisterLoginLink = ({ redirect }) => {
  return (
    <p className="text-center text-gray-600 mt-8">
      Already have an account?{' '}
      <Link
        to={`/login?redirect=${encodeURIComponent(redirect)}`}
        className="text-azurio font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-1 group"
      >
        Sign in here
        <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </p>
  );
};
