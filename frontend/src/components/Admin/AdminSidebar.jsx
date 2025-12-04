import React from 'react';
import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { clearCart } from '../../redux/slices/cartSlice';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <div className="h-full bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <Link
          to="/admin"
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-azurio to-blue-400 bg-clip-text text-transparent inline-block"
        >
          Azurio
        </Link>
        <p className="text-gray-400 text-xs md:text-sm mt-1">Admin Dashboard</p>
      </div>
      <h2 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6 pb-2 border-b border-gray-700">
        Navigation
      </h2>
      <nav className="flex flex-col space-y-1.5 md:space-y-2 mb-6 md:mb-8">
        <NavLink to="/admin/users">
          {({ isActive }) => (
            <div
              className={`
                py-2.5 px-4 rounded-lg flex items-center space-x-3 transition-[background-color,transform,color] duration-200 ease-out
                ${
                  isActive
                    ? 'bg-gradient-to-r from-azurio/20 to-blue-600/20 text-white border-l-2 border-azurio'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }
              `}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                  isActive ? 'bg-azurio' : 'bg-gray-800'
                }`}
              >
                <FaUser className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm md:text-base">Users</span>
            </div>
          )}
        </NavLink>
        <NavLink to="/admin/products">
          {({ isActive }) => (
            <div
              className={`
                py-2.5 px-4 rounded-lg flex items-center space-x-3 transition-[background-color,transform,color] duration-200 ease-out
                ${
                  isActive
                    ? 'bg-gradient-to-r from-azurio/20 to-blue-600/20 text-white border-l-2 border-azurio'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }
              `}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                  isActive ? 'bg-azurio' : 'bg-gray-800'
                }`}
              >
                <FaBoxOpen className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm md:text-base">Products</span>
            </div>
          )}
        </NavLink>
        <NavLink to="/admin/orders">
          {({ isActive }) => (
            <div
              className={`
                py-2.5 px-4 rounded-lg flex items-center space-x-3 transition-[background-color,transform,color] duration-200 ease-out
                ${
                  isActive
                    ? 'bg-gradient-to-r from-azurio/20 to-blue-600/20 text-white border-l-2 border-azurio'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }
              `}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                  isActive ? 'bg-azurio' : 'bg-gray-800'
                }`}
              >
                <FaClipboardList className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm md:text-base">Orders</span>
            </div>
          )}
        </NavLink>
        <NavLink to="/">
          {({ isActive }) => (
            <div
              className={`
                py-2.5 px-4 rounded-lg flex items-center space-x-3 transition-[background-color,transform,color] duration-200 ease-out
                ${
                  isActive
                    ? 'bg-gradient-to-r from-azurio/20 to-blue-600/20 text-white border-l-2 border-azurio'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }
              `}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                  isActive ? 'bg-azurio' : 'bg-gray-800'
                }`}
              >
                <FaStore className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm md:text-base">Shop</span>
            </div>
          )}
        </NavLink>
      </nav>
      <div className="mt-4 pt-4 md:pt-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-600 hover:to-red-700 text-white py-2.5 md:py-3 px-4 rounded-lg flex items-center justify-center space-x-2.5 transition-colors duration-200 ease-out hover:shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
          <FaSignOutAlt className="h-3.5 w-3.5" />
          <span className="text-sm md:text-base font-medium">Logout</span>
        </button>
        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-xs md:text-sm mb-2">
            Admin Panel v1.0
          </p>
          <div className="flex items-center text-gray-500 text-xs md:text-sm">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
            <span>System Online</span>
          </div>
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-azurio to-transparent opacity-50"></div>
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-azurio/10 to-transparent rounded-full blur-xl"></div>
    </div>
  );
};

export default AdminSidebar;
