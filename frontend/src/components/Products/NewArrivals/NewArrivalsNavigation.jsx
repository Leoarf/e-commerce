import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const NewArrivalsNavigation = ({
  onScrollLeft,
  onScrollRight,
  canScrollLeft,
  canScrollRight,
}) => {
  return (
    <div className="flex justify-end mb-8">
      <div className="flex space-x-3">
        <button
          onClick={onScrollLeft}
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
          onClick={onScrollRight}
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
  );
};

export default NewArrivalsNavigation;
