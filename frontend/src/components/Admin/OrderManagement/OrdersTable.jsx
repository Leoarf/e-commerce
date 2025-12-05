import React from 'react';
import OrderRow from './OrderRow';

const OrdersTable = ({ filteredOrders, formatDate, handleStatusChange }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Date
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Total
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredOrders.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
              formatDate={formatDate}
              onStatusChange={handleStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
