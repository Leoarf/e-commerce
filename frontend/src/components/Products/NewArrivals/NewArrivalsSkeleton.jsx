import React from 'react';

const NewArrivalsSkeleton = () => {
  return (
    <section className="py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="flex space-x-6 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="min-w-[85%] md:min-w-[45%] lg:min-w-[30%]">
              <div className="h-[500px] bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSkeleton;
