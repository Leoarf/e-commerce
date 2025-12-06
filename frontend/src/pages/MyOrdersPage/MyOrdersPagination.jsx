import React from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronDown } from 'react-icons/fi';

const MyOrdersPagination = ({
  orders,
  currentPage,
  totalPages,
  itemsPerPage,
  onPreviousPage,
  onNextPage,
  onPageClick,
  onItemsPerPageChange,
}) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <div className="text-sm text-gray-600">
            Showing{' '}
            <span className="font-semibold">{indexOfFirstItem + 1}</span> to{' '}
            <span className="font-semibold">
              {Math.min(indexOfLastItem, orders.length)}
            </span>{' '}
            of <span className="font-semibold">{orders.length}</span> orders
          </div>
        </div>
        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={onPreviousPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => onPageClick(pageNumber)}
                    className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-azurio text-white font-semibold'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return (
                  <span key={pageNumber} className="px-2 text-gray-500">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>
          {/* Next Button */}
          <button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
        </div>
        {/* Items Per Page Selector */}
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <span className="text-sm text-gray-600">Show:</span>
          <div className="relative">
            <select
              value={itemsPerPage}
              onChange={onItemsPerPageChange}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-azurio focus:border-azurio cursor-pointer"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPagination;
