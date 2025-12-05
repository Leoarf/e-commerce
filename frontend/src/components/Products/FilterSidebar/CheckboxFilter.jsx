import React from 'react';
import { FiCheck } from 'react-icons/fi';

export const CheckboxFilter = ({
  name,
  options,
  selectedOptions,
  onChange,
  compact = false,
  scrollable = false,
}) => {
  const containerClasses = scrollable
    ? 'max-h-32 overflow-y-auto pr-1 space-y-0.5'
    : compact
    ? 'flex flex-wrap gap-1'
    : 'space-y-0.5';

  return (
    <div className={containerClasses}>
      {options.map((option) => (
        <div key={option} className="flex items-center">
          <input
            type="checkbox"
            name={name}
            value={option}
            onChange={onChange}
            checked={selectedOptions.includes(option)}
            className="sr-only"
            id={`${name}-${option}`}
          />
          <label
            htmlFor={`${name}-${option}`}
            className={`cursor-pointer transition-colors ${
              compact
                ? `text-xs w-6 h-6 flex items-center justify-center rounded ${
                    selectedOptions.includes(option)
                      ? 'bg-azurio text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`
                : `flex items-center w-full px-1.5 py-1 rounded text-xs ${
                    selectedOptions.includes(option)
                      ? 'bg-azurio/10 text-azurio'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`
            }`}
          >
            {compact ? (
              option
            ) : (
              <>
                <div
                  className={`w-3 h-3 rounded border mr-1.5 flex items-center justify-center ${
                    selectedOptions.includes(option)
                      ? 'bg-azurio border-azurio'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedOptions.includes(option) && (
                    <FiCheck className="h-2 w-2 text-white" />
                  )}
                </div>
                <span className="truncate">{option}</span>
              </>
            )}
          </label>
        </div>
      ))}
    </div>
  );
};
