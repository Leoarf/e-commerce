import React from 'react';
import { FiClock } from 'react-icons/fi';

const NewArrivalsHeader = () => {
  return (
    <div className="text-center mb-12 relative">
      <div className="inline-flex items-center justify-center mb-4">
        <FiClock className="text-2xl text-pink-500 mr-3 animate-pulse" />
        <span className="text-sm font-semibold text-pink-600 bg-pink-50 px-4 py-1.5 rounded-full">
          JUST LAUNCHED
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        Fresh Arrivals
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Discover our latest curated collection, where contemporary design meets
        timeless elegance. Each piece tells a unique story.
      </p>
    </div>
  );
};

export default NewArrivalsHeader;
