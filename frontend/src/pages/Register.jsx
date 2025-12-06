import React from 'react';
import { RegisterHero } from './Register/RegisterHero';
import { RegisterHeader } from './Register/RegisterHeader';
import { RegisterForm } from './Register/RegisterForm';
import { RegisterBenefits } from './Register/RegisterBenefits';
import { useRegister } from './Register/useRegister';

const Register = () => {
  const registerData = useRegister();

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          <RegisterHeader />
          <RegisterForm {...registerData} />
          <RegisterBenefits />
        </div>
      </div>
      <RegisterHero />
    </div>
  );
};

export default Register;
