import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

const FilterSidebarMobile = ({
  isOpen,
  sidebarRef,
  activeFilterCount,
  onClose,
  children,
}) => {
  return (
    <>
      <div
        ref={sidebarRef}
        className={`lg:block lg:w-1/4 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed lg:static top-0 left-0 z-50 w-full lg:w-auto h-screen lg:h-auto bg-white lg:bg-transparent shadow-2xl lg:shadow-none transform transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full overflow-y-auto lg:overflow-visible">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-azurio/10 to-blue-100 rounded-xl flex items-center justify-center">
                <FiFilter className="h-5 w-5 text-azurio" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <p className="text-sm text-gray-500">
                  {activeFilterCount > 0
                    ? `${activeFilterCount} active`
                    : 'No filters applied'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiX className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          {/* Filter Content */}
          <div className="p-4 lg:p-0 pb-20 lg:pb-0">{children}</div>
        </div>
      </div>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default FilterSidebarMobile;
