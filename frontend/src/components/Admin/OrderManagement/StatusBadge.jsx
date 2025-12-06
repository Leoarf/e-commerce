import React from 'react';
import { ORDER_STATUS } from './orderConfig';

const StatusBadge = ({ status, onChange, orderId }) => {
  const statusConfig = ORDER_STATUS[status] || {
    label: status,
    color: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="inline-flex items-center">
      <select
        value={status}
        onChange={(e) => onChange(orderId, e.target.value)}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium border-0 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${statusConfig.color}`}
      >
        {Object.keys(ORDER_STATUS).map((key) => (
          <option key={key} value={key}>
            {ORDER_STATUS[key].label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusBadge;
