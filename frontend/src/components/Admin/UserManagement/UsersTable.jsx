import React from 'react';
import UserRow from './UserRow';

const UsersTable = ({ users, currentUser, onRoleChange, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              User
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Email
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Role
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              currentUser={currentUser}
              onRoleChange={onRoleChange}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
