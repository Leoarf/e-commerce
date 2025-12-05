import React from 'react';
import { FiTruck, FiChevronRight } from 'react-icons/fi';
import { FORM_FIELDS, SHIPPING_CONFIG } from './checkoutConfig';

const ShippingForm = ({
  address,
  onUpdate,
  onSubmit,
  showSubmit,
  subtotal,
}) => (
  <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
    <div className="flex items-center space-x-3 mb-4 md:mb-6">
      <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <FiTruck className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
      </div>
      <div className="min-w-0">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 truncate">
          Shipping Address
        </h2>
        <p className="text-gray-600 text-xs md:text-sm truncate">
          Where should we deliver your order?
        </p>
      </div>
    </div>

    <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {FORM_FIELDS.slice(0, 2).map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={address[field.name]}
            onChange={onUpdate}
          />
        ))}
      </div>

      {FORM_FIELDS.slice(2, 3).map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={address[field.name]}
          onChange={onUpdate}
        />
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {FORM_FIELDS.slice(3, 6).map((field) => (
          <div
            key={field.name}
            className={
              field.name === 'country' ? 'sm:col-span-2 lg:col-span-1' : ''
            }
          >
            <FormField
              field={field}
              value={address[field.name]}
              onChange={onUpdate}
            />
          </div>
        ))}
      </div>

      <FormField
        field={FORM_FIELDS[6]}
        value={address.phone}
        onChange={onUpdate}
      />

      {subtotal < SHIPPING_CONFIG.THRESHOLD && (
        <ShippingNotice subtotal={subtotal} />
      )}

      {showSubmit && (
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-azurio to-blue-600 text-white font-semibold py-3 md:py-4 rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group text-sm md:text-base"
        >
          <span>Continue to Payment</span>
          <FiChevronRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </form>
  </div>
);

const FormField = ({ field, value, onChange }) => (
  <div>
    <label className="block text-gray-700 mb-1 md:mb-2 text-xs md:text-sm font-medium">
      {field.label}
    </label>
    <input
      type={field.type}
      value={value}
      onChange={(e) => onChange(field.name, e.target.value)}
      className="w-full p-3 md:p-4 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-azurio focus:border-transparent text-sm md:text-base"
      required={field.required}
      placeholder={field.placeholder}
    />
  </div>
);

const ShippingNotice = ({ subtotal }) => {
  const amountNeeded = SHIPPING_CONFIG.THRESHOLD - subtotal;

  return (
    <div className="mt-4 p-3 md:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg md:rounded-xl">
      <div className="flex items-start space-x-3">
        <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-yellow-600 font-bold text-xs md:text-sm">
            !
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm text-yellow-800">
            <span className="font-bold">${amountNeeded.toFixed(2)} away</span>{' '}
            from free shipping! Add more items to save ${SHIPPING_CONFIG.COST}{' '}
            on shipping.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
