import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Toggle Button - MESMO ESTILO DA SIDEBAR */}
      <div className="flex md:hidden p-4 bg-gradient-to-b from-gray-900 to-black text-white items-center sticky top-0 z-30">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
        >
          <FaBars size={20} />
        </button>
        <div className="ml-4">
          <h1 className="text-lg font-bold bg-gradient-to-r from-azurio to-blue-400 bg-clip-text text-transparent">
            Azurio
          </h1>
          <p className="text-gray-400 text-xs">Admin Dashboard</p>
        </div>
      </div>
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      {/* Sidebar Container */}
      <div
        className={`fixed md:relative w-64 flex flex-col h-screen transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:translate-x-0 z-50 md:z-auto`}
      >
        {/* Sidebar */}
        <div className="flex-1 overflow-y-auto">
          <AdminSidebar />
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:h-screen">
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
