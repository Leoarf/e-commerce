import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/slices/authSlice';
import { clearCart } from '../../../redux/slices/cartSlice';

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full group relative overflow-hidden bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-600 hover:to-red-700 text-white py-2.5 md:py-3 px-4 rounded-lg flex items-center justify-center space-x-2.5 transition-all duration-200 hover:shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
      <FaSignOutAlt className="h-3.5 w-3.5" />
      <span className="text-sm md:text-base font-medium">Logout</span>
    </button>
  );
};

export default LogoutButton;
