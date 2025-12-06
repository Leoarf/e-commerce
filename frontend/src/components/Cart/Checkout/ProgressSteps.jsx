import React from 'react';

const ProgressSteps = ({ step = 2 }) => {
  const steps = [
    { number: 1, label: 'Cart' },
    { number: 2, label: 'Delivery' },
    { number: 3, label: 'Payment' },
  ];

  return (
    <div className="mb-8 hidden sm:block">
      <div className="flex items-center justify-center">
        {steps.map((s, index) => (
          <React.Fragment key={s.number}>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base
                ${
                  s.number <= step
                    ? 'bg-azurio text-white'
                    : 'bg-gray-300 text-gray-500'
                }`}
              >
                {s.number}
              </div>
              <div className="ml-2 text-sm font-medium text-gray-900 hidden md:block">
                {s.label}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 md:w-20 h-0.5 mx-2 ${
                  s.number < step ? 'bg-azurio' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
