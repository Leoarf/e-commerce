export const SHIPPING_CONFIG = {
  THRESHOLD: 100,
  COST: 10,
};

export const FORM_FIELDS = [
  {
    name: 'firstName',
    label: 'First Name *',
    type: 'text',
    placeholder: 'John',
    required: true,
  },
  {
    name: 'lastName',
    label: 'Last Name *',
    type: 'text',
    placeholder: 'Doe',
    required: true,
  },
  {
    name: 'address',
    label: 'Street Address *',
    type: 'text',
    placeholder: '123 Main Street',
    required: true,
  },
  {
    name: 'city',
    label: 'City *',
    type: 'text',
    placeholder: 'New York',
    required: true,
  },
  {
    name: 'postalCode',
    label: 'Postal Code *',
    type: 'text',
    placeholder: '10001',
    required: true,
  },
  {
    name: 'country',
    label: 'Country *',
    type: 'text',
    placeholder: 'United States',
    required: true,
  },
  {
    name: 'phone',
    label: 'Phone Number *',
    type: 'tel',
    placeholder: '+1 (555) 123-4567',
    required: true,
  },
];
