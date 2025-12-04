import React from 'react';
import mensCollectionImage from '../../assets/mens-collection.webp';
import womensCollectionImage from '../../assets/womens-collection.webp';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const GenderCollectionSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop By Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Discover our curated collections designed for every style and
            occasion
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {/* Women's Collection */}
          <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
              <img
                src={womensCollectionImage}
                alt="Women's Collection"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Collection Tag */}
              <div className="absolute top-6 left-6">
                <span className="inline-block bg-white/90 backdrop-blur-sm text-pink-600 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                  New Arrivals
                </span>
              </div>
            </div>
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
                    Women's
                  </h3>
                  <div className="w-10 h-0.5 bg-pink-500"></div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base mb-6">
                  Elegant styles for the modern woman
                </p>
                <Link
                  to="/collections/all?gender=Women"
                  className="group/link inline-flex items-center gap-2 text-gray-900 hover:text-pink-600 font-semibold transition-colors duration-300"
                >
                  <span className="text-base sm:text-lg">Shop Collection</span>
                  <FiArrowRight className="h-4 w-4 group-hover/link:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>
            {/* Hover Effect Indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-2 rounded-full border-2 border-white/50 animate-ping"></div>
            </div>
          </div>
          {/* Men's Collection */}
          <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
              <img
                src={mensCollectionImage}
                alt="Men's Collection"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Collection Tag */}
              <div className="absolute top-6 left-6">
                <span className="inline-block bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                  Best Sellers
                </span>
              </div>
            </div>
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Men's
                  </h3>
                  <div className="w-10 h-0.5 bg-blue-500"></div>
                </div>

                <p className="text-gray-600 text-sm sm:text-base mb-6">
                  Sophisticated styles for the contemporary man
                </p>
                <Link
                  to="/collections/all?gender=Men"
                  className="group/link inline-flex items-center gap-2 text-gray-900 hover:text-blue-600 font-semibold transition-colors duration-300"
                >
                  <span className="text-base sm:text-lg">Shop Collection</span>
                  <FiArrowRight className="h-4 w-4 group-hover/link:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>
            {/* Hover Effect Indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-2 rounded-full border-2 border-white/50 animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
