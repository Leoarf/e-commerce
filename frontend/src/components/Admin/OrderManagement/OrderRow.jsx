import React from 'react';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import StatusBadge from './StatusBadge';

const OrderRow = ({ order, formatDate, onStatusChange }) => {
  return (
    <tr
      key={order._id}
      className="hover:bg-gray-50 transition-colors duration-200"
    >
      <td className="px-5 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 font-mono">
          #{order._id.slice(-8).toUpperCase()}
        </div>
      </td>
      <td className="px-5 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-azurio flex items-center justify-center">
            <FaUser className="h-4 w-4 text-white" />
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">
              {order.user?.name || 'Customer'}
            </div>
            <div className="text-xs text-gray-500">
              {order.user._id.slice(-8).toUpperCase()}
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-gray-900">
          <FaCalendarAlt className="h-3 w-3 mr-1.5 text-gray-400" />
          {formatDate(order.createdAt || new Date())}
        </div>
      </td>
      <td className="px-5 py-4 whitespace-nowrap">
        <div className="text-sm font-bold text-gray-900">
          ${order.totalPrice.toFixed(2)}
        </div>
      </td>
      <td className="px-5 py-4 whitespace-nowrap">
        <StatusBadge
          status={order.status}
          onChange={onStatusChange}
          orderId={order._id}
        />
      </td>
    </tr>
  );
};

export default OrderRow;
