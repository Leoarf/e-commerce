import React from 'react';
import { FaUser, FaUserShield, FaTrash } from 'react-icons/fa';

const UserRow = ({ user, currentUser, onRoleChange, onDelete }) => {
  return (
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
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
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
          onChange={(e) => onRoleChange(user._id, e.target.value)}
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
          onClick={() => onDelete(user._id)}
          className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-300"
          disabled={user._id === currentUser?._id}
          title={
            user._id === currentUser?._id
              ? 'Cannot delete your own account'
              : 'Delete user'
          }
        >
          <FaTrash className="h-3.5 w-3.5 mr-1.5" />
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
