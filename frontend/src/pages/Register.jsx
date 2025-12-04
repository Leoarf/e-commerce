import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import register from '../assets/register.webp';
import { registerUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';
  const isCheckoutRedirect = redirect.includes('checkout');

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? '/checkout' : '/');
        });
      } else {
        navigate(isCheckoutRedirect ? '/checkout' : '/');
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
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

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio transition-all duration-300 placeholder-gray-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio transition-all duration-300 placeholder-gray-400"
                    placeholder="Create a secure password"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Use at least 8 characters with a mix of letters, numbers &
                  symbols
                </p>
              </div>
              {/* Submit Button */}
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

              {/* Login Link */}
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
            </form>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-azurio/10 p-4 rounded-xl border border-blue-100">
              <div className="text-lg font-semibold text-gray-900 mb-1">
                Free Shipping
              </div>
              <div className="text-sm text-gray-600">On orders over $100</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-azurio/10 p-4 rounded-xl border border-blue-100">
              <div className="text-lg font-semibold text-gray-900 mb-1">
                Exclusive Access
              </div>
              <div className="text-sm text-gray-600">To new collections</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0">
          <img
            src={register}
            alt="Register for Azurio Account"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
        {/* Overlay Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-end p-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Your Style Journey
            </h2>
            <p className="text-white/90 text-lg mb-6">
              Join our community of fashion-forward individuals and discover
              collections that reflect your unique personality.
            </p>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white mb-1">
                  30 Days
                </div>
                <div className="text-white/80 text-sm">Easy Returns</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-white/80 text-sm">Secure Checkout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
