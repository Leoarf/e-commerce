import React from 'react';
import { Link } from 'react-router-dom';
import featured from '../../assets/featured.webp';
import { FiArrowRight } from 'react-icons/fi';

const FeaturedCollection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl lg:rounded-4xl shadow-2xl group">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Text Content */}
            <div className="relative p-8 sm:p-12 md:p-16 lg:p-20 bg-gradient-to-br from-gray-50 to-white flex flex-col justify-center">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-azurio/5 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-500/5 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
              {/* Content */}
              <div className="relative z-10">
                {/* Subtle Badge */}
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-azurio rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-azurio uppercase tracking-wider">
                    Featured Collection
                  </span>
                </div>
                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="block">Everyday</span>
                  <span className="text-azurio">Comfort</span>
                </h2>
                {/* Subheading */}
                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-light mb-6">
                  Essentials designed to elevate your daily routine
                </p>
                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
                  Experience premium pieces that combine effortless style with
                  all-day comfort, created to seamlessly fit into your
                  lifestyle.
                </p>
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  <div className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-azurio mb-1">
                      100%
                    </div>
                    <div className="text-sm text-gray-600">Premium Cotton</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-azurio mb-1">
                      24/7
                    </div>
                    <div className="text-sm text-gray-600">Comfort</div>
                  </div>
                  <div className="text-center sm:text-left col-span-2 sm:col-span-1">
                    <div className="text-2xl sm:text-3xl font-bold text-zazurio mb-1">
                      50+
                    </div>
                    <div className="text-sm text-gray-600">Styles</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Image Section */}
            <div className="relative overflow-hidden h-[400px] sm:h-[500px] lg:h-auto">
              <div className="absolute inset-0">
                <img
                  src={featured}
                  alt="Featured Collection - Everyday Comfort"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              {/* Decorative Elements on Image */}
              <div className="absolute top-8 right-8 hidden lg:block">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg transform rotate-12">
                  <div className="w-8 h-8 bg-azurio rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">★</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-8 left-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="text-xs font-semibold text-gray-900">
                    Featured
                  </div>
                  <div className="text-sm text-gray-600">Spring '24</div>
                </div>
              </div>
            </div>
          </div>
          {/* Border Effect */}
          <div className="absolute inset-0 border-2 border-white/20 pointer-events-none rounded-3xl lg:rounded-4xl"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
