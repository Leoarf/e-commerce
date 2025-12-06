import { FaClock, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const ORDER_STATUS = {
  Processing: {
    label: 'Processing',
    color: 'bg-yellow-100 text-yellow-800',
    icon: FaClock,
  },
  Shipped: {
    label: 'Shipped',
    color: 'bg-purple-100 text-purple-800',
    icon: FaTruck,
  },
  Delivered: {
    label: 'Delivered',
    color: 'bg-green-100 text-green-800',
    icon: FaCheckCircle,
  },
  Cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    icon: FaTimesCircle,
  },
};

export const FILTER_OPTIONS = [
  { value: 'all', label: 'All Orders' },
  { value: 'Processing', label: 'Processing' },
  { value: 'Shipped', label: 'Shipped' },
  { value: 'Delivered', label: 'Delivered' },
  { value: 'Cancelled', label: 'Cancelled' },
];
