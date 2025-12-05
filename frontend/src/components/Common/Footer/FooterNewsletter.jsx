import React, { useState, useEffect } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeNewsletter,
  resetNewsletterState,
} from '../../../redux/slices/newsletterSlice';

const FooterNewsletter = () => {
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');

  const dispatch = useDispatch();
  const { loading, success, error, subscribedEmail } = useSelector(
    (state) => state.newsletter
  );

  // Reset the state when the component is unmounted
  useEffect(() => {
    return () => {
      dispatch(resetNewsletterState());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email) {
      setLocalError('Please enter your email address');
      return;
    }

    if (!isValidEmail(email)) {
      setLocalError('Please enter a valid email address');
      return;
    }

    // Check if you are already registered with this email
    if (success && subscribedEmail === email) {
      setLocalError('This email is already subscribed');
      return;
    }

    dispatch(subscribeNewsletter(email));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleReset = () => {
    dispatch(resetNewsletterState());
    setEmail('');
    setLocalError('');
  };

  return (
    <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-700">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <HiOutlineMail className="h-5 w-5 sm:h-6 sm:w-6 text-azurio" />
        <h3 className="text-lg sm:text-xl font-semibold">Stay Updated</h3>
      </div>

      {success ? (
        <div className="space-y-4">
          <div className="p-3 bg-green-900/20 border border-green-700 rounded-lg">
            <p className="text-green-300 text-center font-medium">
              Thank you for subscribing! 🎉
            </p>
            <p className="text-green-400 text-sm text-center mt-1">
              You'll receive our updates soon.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="w-full px-4 py-3 bg-gray-700 text-white font-medium rounded-lg sm:rounded-xl hover:bg-gray-600 transition-all duration-300 text-sm sm:text-base"
          >
            Subscribe Another Email
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
            Subscribe to our newsletter for exclusive updates, early access, and
            special offers.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-azurio focus:border-transparent transition-all text-sm sm:text-base"
                disabled={loading}
              />
              {(localError || error) && (
                <p className="text-red-400 text-xs mt-2">
                  {localError || error}
                </p>
              )}
            </div>

            <div className="w-full">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-medium rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-azurio/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none text-sm sm:text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center sm:text-left">
              By subscribing, you agree to our Privacy Policy
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default FooterNewsletter;
