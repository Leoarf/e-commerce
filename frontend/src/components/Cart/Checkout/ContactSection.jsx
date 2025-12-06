import React from 'react';
import { FiCreditCard } from 'react-icons/fi';

const ContactSection = ({ email }) => (
  <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
    <div className="flex items-center space-x-3 mb-4 md:mb-6">
      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <FiCreditCard className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
      </div>
      <div className="min-w-0">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 truncate">
          Contact Information
        </h2>
        <p className="text-gray-600 text-xs md:text-sm truncate">
          We'll use this to send order updates
        </p>
      </div>
    </div>
    <div>
      <label className="block text-gray-700 mb-2 text-xs md:text-sm font-medium">
        Email Address
      </label>
      <input
        type="email"
        value={email || ''}
        className="w-full p-3 md:p-4 border border-gray-300 rounded-lg md:rounded-xl bg-gray-50 focus:ring-2 focus:ring-azurio focus:border-transparent text-sm md:text-base"
        disabled
      />
    </div>
  </div>
);

export default ContactSection;
