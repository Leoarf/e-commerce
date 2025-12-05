import React from 'react';
import { FaUserPlus, FaCheckCircle, FaUser } from 'react-icons/fa';
import { useUserManagement } from './useUserManagement';
import StatsCards from './StatsCards';
import UsersTable from './UsersTable';
import AddUserForm from './AddUserForm';
import LoadingState from '../../Common/LoadingState';
import ErrorState from '../../Common/ErrorState';

const UserManagementPage = () => {
  const {
    users,
    loading,
    error,
    currentUser,
    formData,
    showAddForm,
    actionLoading,
    successMessage,
    setShowAddForm,
    handleChange,
    handleSubmit,
    handleRoleChange,
    handleDeleteUser,
    adminCount,
    customerCount,
    totalUsers,
  } = useUserManagement();

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
      <StatsCards
        totalUsers={totalUsers}
        adminCount={adminCount}
        customerCount={customerCount}
      />

      {/* Add User Section */}
      <div className="mb-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
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
          <AddUserForm
            formData={formData}
            showAddForm={showAddForm}
            actionLoading={actionLoading}
            onToggleForm={() => setShowAddForm(!showAddForm)}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {/* User List Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
              <p className="text-gray-500 text-sm mt-1">
                Manage user roles and permissions
              </p>
            </div>
            <div className="mt-3 sm:mt-0 text-sm text-gray-500">
              {totalUsers} user{totalUsers !== 1 ? 's' : ''} total
            </div>
          </div>
        </div>

        {/* Content States */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} />
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
          <>
            <UsersTable
              users={users}
              currentUser={currentUser}
              onRoleChange={handleRoleChange}
              onDelete={handleDeleteUser}
            />
            {users.length > 0 && (
              <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Showing {users.length} user{users.length !== 1 ? 's' : ''}
                  </p>
                  <div className="text-sm text-gray-500">
                    {adminCount} admin{adminCount !== 1 ? 's' : ''} •{' '}
                    {customerCount} customer{customerCount !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagementPage;
