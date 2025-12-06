import React from 'react';
import { RegisterFormFields } from './RegisterFormFields';
import { RegisterSubmitButton } from './RegisterSubmitButton';
import { RegisterLoginLink } from './RegisterLoginLink';

export const RegisterForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  redirect,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <RegisterFormFields formData={formData} handleChange={handleChange} />
        <RegisterSubmitButton loading={loading} />
      </form>
      <RegisterLoginLink redirect={redirect} />
    </div>
  );
};
