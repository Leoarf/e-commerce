import React from 'react';

export const PriceFilter = ({ priceRange, onPriceChange }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-azurio">${priceRange[1]}</span>
    </div>
    <div className="relative pt-1">
      <input
        type="range"
        name="priceRange"
        min={0}
        max={100}
        value={priceRange[1]}
        onChange={onPriceChange}
        className="w-full h-1.5 bg-gradient-to-r from-azurio to-blue-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:shadow-sm"
      />
    </div>
    <div className="flex items-center justify-between text-gray-600 text-xs">
      <span>$0</span>
      <span className="text-gray-500">Max</span>
      <span>$100</span>
    </div>
  </div>
);
