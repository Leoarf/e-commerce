import React from 'react';
import { FiCheckCircle, FiTruck, FiCalendar } from 'react-icons/fi';

export const OrderTimeline = ({ checkout, delivery }) => {
  const timelineSteps = [
    {
      icon: <FiCheckCircle className="h-4 w-4 text-white" />,
      bgColor: 'bg-emerald-500',
      title: 'Order Placed',
      description: 'Your order has been received and is being processed.',
      date: new Date(checkout.createdAt).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
    {
      icon: <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>,
      bgColor: 'bg-emerald-100 border-2 border-emerald-300',
      title: 'Processing',
      description: "We're preparing your items for shipment.",
      date: 'Estimated: 1-2 business days',
    },
    {
      icon: <FiTruck className="h-4 w-4 text-gray-400" />,
      bgColor: 'bg-gray-100',
      title: 'Shipping',
      description: 'Your order will be shipped via standard delivery.',
      date: 'Estimated: 3-7 business days',
    },
    {
      icon: <FiCalendar className="h-4 w-4 text-gray-400" />,
      bgColor: 'bg-gray-100',
      title: 'Estimated Delivery',
      description: `Expected in ${delivery.days} days`,
      date: delivery.date,
      highlight: true,
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Order Timeline
      </h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-200"></div>
        <div className="space-y-8 relative">
          {timelineSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div
                className={`flex-shrink-0 w-8 h-8 ${step.bgColor} rounded-full flex items-center justify-center relative z-10`}
              >
                {step.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{step.title}</h4>
                <p className="text-sm text-gray-500">{step.date}</p>
                <p
                  className={`text-sm ${
                    step.highlight
                      ? 'text-emerald-600 font-medium'
                      : 'text-gray-600'
                  } mt-1`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
