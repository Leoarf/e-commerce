import React, { useEffect, useRef, useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Prevenir rolagem do body quando sidebar está aberto
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto'; // Garantir que volte ao normal
    };
  }, [isSidebarOpen]);

  // Contar filtros ativos de forma consistente com FilterSidebar
  const activeFilterCount = (() => {
    let count = 0;

    // Não contar 'collection' como filtro
    Object.keys(queryParams).forEach((key) => {
      if (key === 'collection') return;

      const value = queryParams[key];
      if (!value) return;

      if (key === 'maxPrice') {
        // Só conta maxPrice se for diferente de 100
        if (parseInt(value) !== 100) count++;
      } else if (key === 'minPrice') {
        // Só conta minPrice se for diferente de 0
        if (parseInt(value) !== 0) count++;
      } else if (key === 'size' || key === 'material' || key === 'brand') {
        // Para arrays, conta cada item
        const items = value.split(',');
        count += items.length;
      } else {
        // Para outros filtros (category, gender, color)
        count++;
      }
    });

    return count;
  })();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize">
            {collection || 'All Collections'}
          </h1>
          <p className="text-gray-600 mt-2">
            Discover our curated collection of premium products
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={toggleSidebar}
            className="w-full py-3 bg-white border border-gray-300 rounded-xl flex items-center justify-center space-x-2 hover:border-azurio hover:bg-azurio/5 transition-all"
          >
            <FiFilter className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 bg-azurio text-white text-xs rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop & Mobile Drawer */}
          <div
            ref={sidebarRef}
            className={`lg:block lg:w-1/4 ${
              isSidebarOpen
                ? 'translate-x-0'
                : '-translate-x-full lg:translate-x-0'
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
                  onClick={toggleSidebar}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Filter Content */}
              <div className="p-4 lg:p-0 pb-20 lg:pb-0">
                <FilterSidebar />
              </div>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="w-full lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <p className="text-gray-600">
                  Showing{' '}
                  <span className="font-semibold">{products?.length || 0}</span>{' '}
                  products
                </p>
                {activeFilterCount > 0 && (
                  <p className="text-sm text-azurio mt-1">
                    {activeFilterCount} filter
                    {activeFilterCount !== 1 ? 's' : ''} applied
                  </p>
                )}
              </div>

              {/* Sort Options */}
              <div className="w-full sm:w-auto">
                <SortOptions />
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid products={products} loading={loading} error={error} />

            {/* Empty State */}
            {!loading && products && products.length === 0 && (
              <div className="col-span-full bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-12 text-center mt-8">
                <div className="w-20 h-20 bg-gradient-to-r from-azurio/10 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiFilter className="h-10 w-10 text-azurio" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your filters or browse our entire collection.
                </p>
                <button
                  onClick={() => (window.location.search = '')}
                  className="px-6 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default CollectionPage;
