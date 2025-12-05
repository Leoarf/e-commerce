import React from 'react';
import ProductRow from './ProductRow';

const ProductsTable = ({
  products,
  getFirstImageUrl,
  getImageAlt,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Product
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Price
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              SKU
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Category
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <ProductRow
              key={product._id}
              product={product}
              getFirstImageUrl={getFirstImageUrl}
              getImageAlt={getImageAlt}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
