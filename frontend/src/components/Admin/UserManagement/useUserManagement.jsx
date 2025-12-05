import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from '../../../redux/slices/adminSlice';

export function useUserManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
    if (
      window.confirm(
        'Are you sure you want to delete this user? This action cannot be undone.'
      )
    ) {
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
  const adminCount = users.filter((user) => user.role === 'admin').length;
  const customerCount = users.filter((user) => user.role === 'customer').length;
  const totalUsers = users.length;

  return {
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
    setSuccessMessage,
    adminCount,
    customerCount,
    totalUsers,
  };
}
