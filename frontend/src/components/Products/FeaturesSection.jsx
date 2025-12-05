import React from 'react';
import { FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FiTruck className="h-6 w-6" />,
      title: 'Free Shipping',
      description: 'Free worldwide delivery on orders over $100',
      color: 'bg-blue-100 text-blue-600',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:bg-blue-50',
    },
    {
      icon: <FiRefreshCw className="h-6 w-6" />,
      title: '30 Days Returns',
      description: 'Hassle-free returns with money-back guarantee',
      color: 'bg-green-100 text-green-600',
      borderColor: 'border-green-200',
      hoverColor: 'hover:bg-green-50',
    },
    {
      icon: <FiShield className="h-6 w-6" />,
      title: 'Secure Checkout',
      description: '100% secured and encrypted payment process',
      color: 'bg-purple-100 text-purple-600',
      borderColor: 'border-purple-200',
      hoverColor: 'hover:bg-purple-50',
    },
  ];

  return (
    <section className="py-16 px-4 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Shop With Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience shopping that's as exceptional as our products
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 border ${feature.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${feature.hoverColor}`}
            >
              {/* Decorative Corner */}
              <div
                className={`absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl`}
              >
                <div
                  className={`absolute -top-8 -right-8 w-16 h-16 ${
                    feature.color.split(' ')[0]
                  } opacity-10 rounded-full`}
                ></div>
              </div>
              {/* Icon Container */}
              <div
                className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
              >
                <div className="relative">
                  {feature.icon}
                  {/* Animated Ring on Hover */}
                  <div className="absolute inset-0 rounded-full border-2 border-current opacity-0 group-hover:opacity-100 animate-ping"></div>
                </div>
              </div>
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              {/* Learn More Link */}
              <div className="flex items-center">
                <span
                  className={`text-sm font-medium ${
                    feature.color.split('text-')[1]
                  } group-hover:underline transition-all duration-300`}
                >
                  Learn more
                </span>
                <div className="ml-2 w-8 h-0.5 bg-gray-300 group-hover:w-12 transition-all duration-300"></div>
              </div>
              {/* Hover Background Effect */}
              <div
                className={`absolute inset-0 rounded-2xl ${
                  feature.color.split(' ')[0]
                } opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
              ></div>
            </div>
          ))}
        </div>
        {/* Stats Section */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                50K+
              </div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                100%
              </div>
              <div className="text-gray-600">Secure Payments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                48h
              </div>
              <div className="text-gray-600">Average Delivery</div>
            </div>
          </div>
        </div>
        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-azurio to-blue-600 rounded-2xl p-8 md:p-12 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Ready to Experience Premium Shopping?
              </h3>
              <p className="text-blue-100">
                Join thousands of satisfied customers worldwide
              </p>
            </div>
            <div className="flex gap-4">
              {/* Altere o botão para Link */}
              <Link
                to="/collections/all"
                className="bg-white text-azurio px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
