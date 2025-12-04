import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from '../../redux/slices/adminSlice';
import {
  FaUserPlus,
  FaTrash,
  FaEdit,
  FaUserShield,
  FaUser,
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
} from 'react-icons/fa';

function UserManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (currentUser && currentUser.role !== 'admin') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser && currentUser.role === 'admin') {
      dispatch(fetchUsers());
    }
  }, [dispatch, currentUser]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await dispatch(addUser(formData));
      setSuccessMessage('User added successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'customer',
      });
      setShowAddForm(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error adding user:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await dispatch(updateUser({ id: userId, role: newRole }));
      setSuccessMessage('User role updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating role:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await dispatch(deleteUser(userId));
        setSuccessMessage('User deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  // Calculate user statistics
  const adminCount = users.filter(user => user.role === 'admin').length;
  const customerCount = users.filter(user => user.role === 'customer').length;
  const totalUsers = users.length;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          User Management
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Manage system users, roles and permissions
        </p>
        
        {successMessage && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
            <FaCheckCircle className="h-5 w-5 text-green-600 mr-3" />
            <span className="text-green-700 font-medium">{successMessage}</span>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-gradient-to-br from-blue-50 to-azurio/10 border border-blue-100 rounded-xl p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-gradient-to-r from-azurio to-blue-500 rounded-lg">
              <FaUser className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
              Total
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Total Users
          </h3>
          <div className="flex items-baseline">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {totalUsers}
            </p>
            <span className="text-sm text-gray-500 ml-2">users</span>
          </div>
        </div>

        {/* Admin Users */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100 rounded-xl p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <FaUserShield className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2.5 py-1 rounded-full">
              Admin
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Admin Users
          </h3>
          <div className="flex items-baseline">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {adminCount}
            </p>
            <span className="text-sm text-gray-500 ml-2">users</span>
          </div>
        </div>

        {/* Customer Users */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-100 rounded-xl p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
              <FaUser className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
              Customer
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Customer Users
          </h3>
          <div className="flex items-baseline">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              {customerCount}
            </p>
            <span className="text-sm text-gray-500 ml-2">users</span>
          </div>
        </div>
      </div>

      {/* Add User Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-8">
        <div className="p-5 md:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                User Management
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Add new users or manage existing ones
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="mt-3 sm:mt-0 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-azurio to-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
            >
              <FaUserPlus className="h-4 w-4 mr-2" />
              {showAddForm ? 'Cancel' : 'Add New User'}
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="p-5 md:p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add New User
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azurio focus:border-transparent transition-all"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azurio focus:border-transparent transition-all"
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azurio focus:border-transparent transition-all"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azurio focus:border-transparent transition-all bg-white"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {actionLoading ? (
                    <>
                      <FaSpinner className="h-4 w-4 mr-2 animate-spin" />
                      Adding User...
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* User List Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                All Users
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Manage user roles and permissions
              </p>
            </div>
            <div className="mt-3 sm:mt-0 text-sm text-gray-500">
              {totalUsers} user{totalUsers !== 1 ? 's' : ''} total
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <FaSpinner className="h-8 w-8 text-azurio animate-spin mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Loading users...
              </h3>
              <p className="text-gray-500">
                Please wait while we fetch user data
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <FaExclamationCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Error loading users
              </h3>
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <FaUser className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No users found
              </h3>
              <p className="text-gray-500">
                Add your first user to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-azurio to-blue-500 rounded-full flex items-center justify-center">
                          <FaUser className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {user._id.slice(-8).toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azurio focus:border-transparent transition-all text-sm"
                      >
                        <option value="customer" className="flex items-center">
                          <FaUser className="h-3 w-3 inline mr-1" />
                          Customer
                        </option>
                        <option value="admin" className="flex items-center">
                          <FaUserShield className="h-3 w-3 inline mr-1" />
                          Administrator
                        </option>
                      </select>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-300"
                        disabled={user._id === currentUser?._id}
                        title={user._id === currentUser?._id ? "Cannot delete your own account" : "Delete user"}
                      >
                        <FaTrash className="h-3.5 w-3.5 mr-1.5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {users.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {users.length} user{users.length !== 1 ? 's' : ''}
              </p>
              <div className="text-sm text-gray-500">
                {adminCount} admin{adminCount !== 1 ? 's' : ''} • {customerCount} customer{customerCount !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;