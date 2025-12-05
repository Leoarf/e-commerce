import { FaBoxOpen, FaClipboardList, FaStore, FaUser } from 'react-icons/fa';

export const sidebarMenuItems = [
  {
    id: 'users',
    label: 'Users',
    icon: FaUser,
    path: '/admin/users',
  },
  {
    id: 'products',
    label: 'Products',
    icon: FaBoxOpen,
    path: '/admin/products',
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: FaClipboardList,
    path: '/admin/orders',
  },
  {
    id: 'shop',
    label: 'Shop',
    icon: FaStore,
    path: '/',
    external: true,
  },
];

export const sidebarConstants = {
  BRAND: {
    name: 'Azurio',
    subtitle: 'Admin Dashboard',
  },
  VERSION: {
    text: 'Admin Panel v1.0',
    status: 'System Online',
  },
};
