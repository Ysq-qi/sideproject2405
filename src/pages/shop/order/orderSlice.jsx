import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../../api/orderApi';
import { ERROR_MESSAGES } from '../../../config/constants';

// 獲取訂單API請求
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      if (response.success) {
        return response.orders;
      } else {
        return rejectWithValue(response.error || ERROR_MESSAGES.FETCH_ORDERS_ERROR);
      }
    } catch (error) {
      return rejectWithValue(error.message || ERROR_MESSAGES.FETCH_ORDERS_ERROR);
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ERROR_MESSAGES.FETCH_ORDERS_ERROR;
      });
  },
});

export default orderSlice.reducer;