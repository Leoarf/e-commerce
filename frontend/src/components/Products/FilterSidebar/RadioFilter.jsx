import React from 'react';

export const RadioFilter = ({ name, options, value, onChange }) => (
  <div className="flex flex-wrap gap-1">
    {options.map((option) => (
      <div key={option} className="flex items-center">
        <input
          type="radio"
          name={name}
          value={option}
          onChange={onChange}
          checked={value === option}
          className="sr-only"
          id={`${name}-${option}`}
        />
        <label
          htmlFor={`${name}-${option}`}
          className={`text-xs px-2 py-1 rounded cursor-pointer transition-colors ${
            value === option
              ? 'bg-azurio text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          {option}
        </label>
      </div>
    ))}
  </div>
);
