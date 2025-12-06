import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  redirect,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio transition-all duration-300 placeholder-gray-400"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      {/* Password Field */}
      <div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio transition-all duration-300 placeholder-gray-400"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 px-6 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-azurio/20 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-azurio/50 disabled:opacity-70 disabled:cursor-not-allowed group"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg">
            {loading ? 'Signing In...' : 'Sign In'}
          </span>
          {!loading && (
            <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          )}
        </div>
      </button>
      {/* Register Link */}
      <p className="text-center text-gray-600 mt-8">
        Don't have an account?{' '}
        <Link
          to={`/register?redirect=${encodeURIComponent(redirect)}`}
          className="text-azurio font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-1 group"
        >
          Create account
          <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
