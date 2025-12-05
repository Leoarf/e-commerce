import React from 'react';
import NewArrivalsHeader from './NewArrivals/NewArrivalsHeader';
import NewArrivalsSkeleton from './NewArrivals/NewArrivalsSkeleton';
import NewArrivalsCard from './NewArrivals/NewArrivalsCard';
import NewArrivalsNavigation from './NewArrivals/NewArrivalsNavigation';
import NewArrivalsScrollIndicator from './NewArrivals/NewArrivalsScrollIndicator';
import { useNewArrivals } from './NewArrivals/useNewArrivals';

const NewArrivals = () => {
  const {
    scrollRef,
    isDragging,
    newArrivals,
    isLoading,
    canScrollLeft,
    canScrollRight,
    currentIndex,
    visibleCards,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
    scroll,
    scrollToPage,
  } = useNewArrivals();

  if (isLoading) {
    return <NewArrivalsSkeleton />;
  }

  return (
    <section id="fresh-arrivals" className="py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <NewArrivalsHeader />
        <NewArrivalsNavigation
          onScrollLeft={() => scroll('left')}
          onScrollRight={() => scroll('right')}
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
        />
        {/* Product Cards Container */}
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
            <NewArrivalsCard key={product._id} product={product} />
          ))}
        </div>
        <NewArrivalsScrollIndicator
          newArrivals={newArrivals}
          visibleCards={visibleCards}
          currentIndex={currentIndex}
          onPageClick={scrollToPage}
        />
      </div>
    </section>
  );
};

export default NewArrivals;
