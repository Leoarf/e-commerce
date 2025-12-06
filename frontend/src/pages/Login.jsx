import React from 'react';
import LoginForm from './Login/LoginForm';
import LoginImageSide from './Login/LoginImageSide';
import LoginHeader from './Login/LoginHeader';
import LoginSecurityNote from './Login/LoginSecurityNote';
import { useLogin } from './Login/useLogin';

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    redirect,
    handleSubmit,
  } = useLogin();

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          <LoginHeader />

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              redirect={redirect}
              onSubmit={handleSubmit}
            />
          </div>

          <LoginSecurityNote />
        </div>
      </div>

      <LoginImageSide />
    </div>
  );
};

export default Login;
