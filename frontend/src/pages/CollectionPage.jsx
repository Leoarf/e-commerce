import React from 'react';
import FilterSidebar from '../components/Products/FilterSidebar';
import ProductGrid from '../components/Products/ProductGrid';
import CollectionHeader from './CollectionPage/CollectionHeader';
import MobileFilterButton from './CollectionPage/MobileFilterButton';
import FilterSidebarMobile from './CollectionPage/FilterSidebarMobile';
import ResultsHeader from './CollectionPage/ResultsHeader';
import EmptyState from './CollectionPage/EmptyState';
import { useCollectionPage } from './CollectionPage/useCollectionPage';

const CollectionPage = () => {
  const {
    collection,
    products,
    loading,
    error,
    activeFilterCount,
    isSidebarOpen,
    sidebarRef,
    toggleSidebar,
    handleClearFilters,
  } = useCollectionPage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <CollectionHeader collection={collection} />

        <MobileFilterButton
          activeFilterCount={activeFilterCount}
          onToggle={toggleSidebar}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebarMobile
            isOpen={isSidebarOpen}
            sidebarRef={sidebarRef}
            activeFilterCount={activeFilterCount}
            onClose={toggleSidebar}
          >
            <FilterSidebar />
          </FilterSidebarMobile>

          <div className="w-full lg:w-3/4">
            <ResultsHeader
              productsCount={products?.length || 0}
              activeFilterCount={activeFilterCount}
            />

            <ProductGrid products={products} loading={loading} error={error} />

            {!loading && products && products.length === 0 && (
              <EmptyState onClearFilters={handleClearFilters} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
