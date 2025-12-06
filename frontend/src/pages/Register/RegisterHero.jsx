import React from 'react';
import registerImage from '../../assets/register.webp';

export const RegisterHero = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative">
      <div className="absolute inset-0">
        <img
          src={registerImage}
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
              <div className="text-2xl font-bold text-white mb-1">30 Days</div>
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
  );
};
