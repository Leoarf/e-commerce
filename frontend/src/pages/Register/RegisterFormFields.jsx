import React from 'react';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

export const RegisterFormFields = ({ formData, handleChange }) => {
  const fields = [
    {
      id: 'name',
      label: 'Full Name',
      icon: FiUser,
      type: 'text',
      placeholder: 'Enter your full name',
      value: formData.name,
      onChange: handleChange('name'),
    },
    {
      id: 'email',
      label: 'Email Address',
      icon: FiMail,
      type: 'email',
      placeholder: 'you@example.com',
      value: formData.email,
      onChange: handleChange('email'),
    },
    {
      id: 'password',
      label: 'Password',
      icon: FiLock,
      type: 'password',
      placeholder: 'Create a secure password',
      value: formData.password,
      onChange: handleChange('password'),
    },
  ];

  return (
    <>
      {fields.map((field) => (
        <div key={field.id}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <field.icon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={field.type}
              value={field.value}
              onChange={field.onChange}
              className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azurio/50 focus:border-azurio transition-all duration-300 placeholder-gray-400"
              placeholder={field.placeholder}
              required
            />
          </div>
          {field.id === 'password' && (
            <p className="text-xs text-gray-500 mt-2">
              Use at least 8 characters with a mix of letters, numbers & symbols
            </p>
          )}
        </div>
      ))}
    </>
  );
};
