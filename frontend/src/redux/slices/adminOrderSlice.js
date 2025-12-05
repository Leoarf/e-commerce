import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
  'adminOrders/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Fetch orders error:', error);
      // Optional chaining
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

// update order delivery status (admin only)
export const updateOrderStatus = createAsyncThunk(
  'adminOrders/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Update order error:', error);
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

// Delete an order
export const deleteOrder = createAsyncThunk(
  'adminOrders/deleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return id;
    } catch (error) {
      console.error('Delete order error:', error);
      return rejectWithValue({
        message:
          error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

const adminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
        // Calculate total sales
        const totalSales = action.payload.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);
        state.totalSales = totalSales;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        // Corrija aqui também
        state.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to fetch orders';
      })
      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const orderIndex = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to update order status';
      })
      // Delete order
      .addCase(deleteOrder.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
        state.totalOrders = state.orders.length;
        // Recalcular total sales
        const totalSales = state.orders.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);
        state.totalSales = totalSales;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to delete order';
      });
  },
});

export const { clearError } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
