import React from 'react';

const StatusIndicator = ({ version, status }) => {
  return (
    <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-700">
      <p className="text-gray-400 text-xs md:text-sm mb-2">{version}</p>
      <div className="flex items-center text-gray-500 text-xs md:text-sm">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
        <span>{status}</span>
      </div>
    </div>
  );
};

export default StatusIndicator;
