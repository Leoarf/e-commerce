import React from 'react';
import HeroImg from '../../assets/azurio-hero.webp';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToNewsArrivals = () => {
    const section = document.getElementById('fresh-arrivals');
    if (section) {
      const offset = 80;
      const elementPosition = section.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToBestSeller = () => {
    const section = document.getElementById('best-seller');
    if (section) {
      const offset = 80;
      const elementPosition = section.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px]">
        <div className="absolute inset-0">
          <img
            src={HeroImg}
            alt="Azurio summer collection"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
            <div className="max-w-2xl">
              {/* Subtle Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-azurio rounded-full animate-pulse"></span>
                <span className="text-xs sm:text-sm font-medium text-white tracking-wide">
                  NEW COLLECTION
                </span>
              </div>
              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-snug sm:leading-tight">
                <span className="block">SUN-KISSED</span>
                <span className="block text-azurio">STYLE</span>
              </h1>
              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-lg leading-relaxed font-light">
                Elevate your summer wardrobe with our latest collection. Bold
                looks for those who live the summer, not just the season.
              </p>
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/collections/all"
                  className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-azurio text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-azurio/90 transition-all duration-300 transform hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:shadow-xl text-sm sm:text-base"
                >
                  <span className="font-semibold tracking-wide">
                    Shop Collection
                  </span>
                  <FiArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                <button
                  onClick={scrollToNewsArrivals}
                  className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-transparent text-white border border-white/30 hover:border-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg transition-all duration-300 hover:bg-white/10 text-sm sm:text-base"
                >
                  <span className="font-semibold tracking-wide">
                    View New Arrivals
                  </span>
                </button>
              </div>
              {/* Stats/Features - Responsive */}
              <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 flex flex-wrap gap-4 sm:gap-6 md:gap-8">
                <div className="text-white min-w-[70px] sm:min-w-[80px]">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                    200+
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 whitespace-nowrap">
                    Summer Styles
                  </div>
                </div>
                <div className="text-white min-w-[70px] sm:min-w-[80px]">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                    48h
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 whitespace-nowrap">
                    Fast Delivery
                  </div>
                </div>
                <div className="text-white min-w-[70px] sm:min-w-[80px]">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 whitespace-nowrap">
                    Premium Quality
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll Indicator - Now goes to Best Seller */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToBestSeller}
            className="animate-bounce flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300"
            aria-label="Scroll to best seller"
          >
            <span className="text-xs mb-2 font-medium tracking-wide">
              Explore
            </span>
            <div className="w-5 h-8 sm:w-6 sm:h-10 border border-white/50 rounded-full flex justify-center">
              <FiArrowDown className="h-3 w-3 sm:h-4 sm:w-4 mt-1.5 sm:mt-2" />
            </div>
          </button>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 bg-azurio/20 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 w-28 h-28 sm:w-40 sm:h-40 bg-white/5 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
