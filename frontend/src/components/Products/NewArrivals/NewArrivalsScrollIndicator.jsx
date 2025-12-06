import React from 'react';

const NewArrivalsScrollIndicator = ({
  newArrivals,
  visibleCards,
  currentIndex,
  onPageClick,
}) => {
  if (newArrivals.length === 0) return null;

  return (
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
              onClick={() => onPageClick(pageIndex)}
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
  );
};

export default NewArrivalsScrollIndicator;
