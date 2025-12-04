import React, { useEffect } from 'react';
import MyOrdersPage from './MyOrdersPage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { FiUser, FiMail, FiLogOut } from 'react-icons/fi';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-azurio to-blue-600 rounded-2xl shadow-xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <FiUser className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{user?.name}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <FiMail className="h-4 w-4 text-white/80" />
                  <p className="text-white/80">{user?.email}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <FiLogOut className="h-5 w-5" />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>
        {/* Main Content */}
        <div className="w-full">
          <MyOrdersPage />
        </div>
      </div>
    </div>
  );
};

export default Profile;
