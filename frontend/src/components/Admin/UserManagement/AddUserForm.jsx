import React from 'react';
import { FaUserPlus, FaSpinner } from 'react-icons/fa';

const AddUserForm = ({
  formData,
  showAddForm,
  actionLoading,
  onToggleForm,
  onChange,
  onSubmit,
}) => {
  if (!showAddForm) return null;

  return (
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
            onClick={onToggleForm}
            className="mt-3 sm:mt-0 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-azurio to-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
          >
            <FaUserPlus className="h-4 w-4 mr-2" />
            Cancel
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Add New User
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
    </div>
  );
};

export default AddUserForm;
