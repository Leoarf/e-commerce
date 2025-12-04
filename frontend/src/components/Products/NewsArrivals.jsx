import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewsArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3); // lg: min-w-[30%]
      } else if (window.innerWidth >= 640) {
        setVisibleCards(2); // md: min-w-[45%]
      } else {
        setVisibleCards(1); // min-w-[85%]
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container && newArrivals.length > 0) {
      const currentScrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      // Use a tolerance of 1 pixel to avoid rounding issues
      const tolerance = 1;
      const isAtLeft = currentScrollLeft <= tolerance;
      const isAtRight =
        currentScrollLeft + clientWidth >= scrollWidth - tolerance;
      setCanScrollLeft(!isAtLeft);
      setCanScrollRight(!isAtRight);
      // Calculate the current index more accurately.
      const totalScrollableWidth = scrollWidth - clientWidth;
      let index = 0;
      if (totalScrollableWidth > 0) {
        // When scrollable, calculate based on the scroll percentage.
        const scrollPercentage = currentScrollLeft / totalScrollableWidth;
        const totalItems = newArrivals.length;
        index = Math.round(scrollPercentage * (totalItems - 1));
      } else {
        // When there is no scrolling (everything fits on the screen), show the first item.
        index = 0;
      }
      // Ensure that the index does not exceed the number of items - 1
      setCurrentIndex(Math.min(index, newArrivals.length - 1));
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      // Add listener for resizing
      window.addEventListener('resize', updateScrollButtons);
      //update initially
      setTimeout(updateScrollButtons, 100); // A slight delay to ensure the DOM is ready
      return () => {
        container.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, [newArrivals]);

  // Skeleton loader
  if (isLoading) {
    return (
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="flex space-x-6 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="min-w-[85%] md:min-w-[45%] lg:min-w-[30%]"
              >
                <div className="h-[500px] bg-gray-200 rounded-2xl animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="fresh-arrivals" className="py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
            Discover our latest curated collection, where contemporary design
            meets timeless elegance. Each piece tells a unique story.
          </p>
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-end mb-8">
          <div className="flex space-x-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-3.5 rounded-full border transition-all duration-300 transform hover:scale-105 ${
                canScrollLeft
                  ? 'bg-white text-gray-800 border-gray-300 shadow-lg hover:shadow-xl hover:border-gray-400'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-3.5 rounded-full border transition-all duration-300 transform hover:scale-105 ${
                canScrollRight
                  ? 'bg-white text-gray-800 border-gray-300 shadow-lg hover:shadow-xl hover:border-gray-400'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>
        {/* Product Cards */}
        <div
          ref={scrollRef}
          className={`relative overflow-x-hidden flex space-x-8 pb-8 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="min-w-[85%] md:min-w-[45%] lg:min-w-[30%] group relative"
            >
              {/* Product Card */}
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-[500px] overflow-hidden">
                  <img
                    src={product.images[0]?.url}
                    alt={product.images[0]?.altText || product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    draggable="false"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* New Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      NEW
                    </span>
                  </div>
                </div>
                {/* Product Info */}
                <div className="p-6">
                  <Link to={`/product/${product._id}`} className="block">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description?.substring(0, 100)}...
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Scroll Indicator */}
        {newArrivals.length > 0 && (
          <div className="flex flex-col items-center mt-8">
            <div className="flex items-center space-x-4 mb-3">
              <div className="text-sm text-gray-600 font-medium">
                {Math.min(currentIndex + visibleCards, newArrivals.length)} of{' '}
                {newArrivals.length}
              </div>
            </div>
            <div className="flex space-x-2">
              {Array.from({
                length: Math.ceil(newArrivals.length / visibleCards),
              }).map((_, pageIndex) => {
                const isActive =
                  currentIndex >= pageIndex * visibleCards &&
                  currentIndex < (pageIndex + 1) * visibleCards;
                return (
                  <button
                    key={pageIndex}
                    onClick={() => {
                      const container = scrollRef.current;
                      if (container) {
                        const cardWidth =
                          container.firstChild?.offsetWidth || 300;
                        const gap = 32;
                        const scrollTo =
                          pageIndex * visibleCards * (cardWidth + gap);
                        container.scrollTo({
                          left: scrollTo,
                          behavior: 'smooth',
                        });
                      }
                    }}
                    className={`transition-all duration-300 ${
                      isActive
                        ? 'w-8 bg-gray-800'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    } h-2 rounded-full`}
                    aria-label={`Go to page ${pageIndex + 1}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsArrivals;
