import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterHeader = () => {
  return (
    <>
      {/* Logo/Brand */}
      <div className="flex justify-center mb-8">
        <Link to="/" className="group">
          <span className="text-3xl font-bold bg-gradient-to-r from-azurio to-blue-600 bg-clip-text text-transparent">
            Azurio
          </span>
        </Link>
      </div>
      {/* Welcome Card */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Join Azurio ✨
        </h1>
        <p className="text-gray-600 text-lg">
          Create your account and start your style journey
        </p>
      </div>
    </>
  );
};
