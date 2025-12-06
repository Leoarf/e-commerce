import React from 'react';
import BrandHeader from './AdminSidebar/BrandHeader';
import NavItem from './AdminSidebar/NavItem';
import LogoutButton from './AdminSidebar/LogoutButton';
import StatusIndicator from './AdminSidebar/StatusIndicator';
import {
  sidebarMenuItems,
  sidebarConstants,
} from './AdminSidebar/sidebarConfig';

const AdminSidebar = () => {
  const { BRAND, VERSION } = sidebarConstants;

  return (
    <div className="h-full bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-6 relative">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-azurio/10 to-transparent rounded-full blur-xl" />
      <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-azurio to-transparent opacity-50" />
      {/* Brand Header */}
      <BrandHeader name={BRAND.name} subtitle={BRAND.subtitle} />
      {/* Navigation Header */}
      <h2 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6 pb-2 border-b border-gray-700">
        Navigation
      </h2>
      {/* Navigation Menu */}
      <nav className="flex flex-col space-y-1.5 md:space-y-2 mb-6 md:mb-8">
        {sidebarMenuItems.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </nav>
      {/* Bottom Section */}
      <div className="mt-4 pt-4 md:pt-6 border-t border-gray-700">
        <LogoutButton />
        <StatusIndicator version={VERSION.text} status={VERSION.status} />
      </div>
    </div>
  );
};

export default AdminSidebar;
