import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for newsletter subscription
export const subscribeNewsletter = createAsyncThunk(
  'newsletter/subscribe',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscribe`,
        { email }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const newsletterSlice = createSlice({
  name: 'newsletter',
  initialState: {
    loading: false,
    success: false,
    error: null,
    subscribedEmail: null,
  },
  reducers: {
    resetNewsletterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.subscribedEmail = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeNewsletter.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(subscribeNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subscribedEmail = action.meta.arg;
        state.error = null;
      })
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || 'Failed to subscribe';
      });
  },
});

export const { resetNewsletterState, clearError } = newsletterSlice.actions;
export default newsletterSlice.reducer;
