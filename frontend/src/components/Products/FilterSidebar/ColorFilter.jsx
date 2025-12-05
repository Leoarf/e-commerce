import React from 'react';
import { FiCheck } from 'react-icons/fi';

export const ColorFilter = ({ colors, selectedColor, onColorClick }) => (
  <div className="flex flex-wrap gap-1.5">
    {colors.map((color) => (
      <div
        key={color.name}
        onClick={() => onColorClick(color.name)}
        className={`relative w-5 h-5 rounded-full cursor-pointer transition-transform ${
          selectedColor === color.name
            ? 'ring-1 ring-offset-1 ring-azurio scale-110'
            : 'hover:scale-105'
        }`}
        style={{ backgroundColor: color.hex }}
        title={color.name}
      >
        {selectedColor === color.name && (
          <div className="absolute inset-0 flex items-center justify-center">
            <FiCheck className="h-2.5 w-2.5 text-white" />
          </div>
        )}
        {color.name === 'White' && (
          <div className="absolute inset-0 border border-gray-300 rounded-full"></div>
        )}
      </div>
    ))}
  </div>
);
