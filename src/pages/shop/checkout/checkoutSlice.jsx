import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitOrderApi } from '../../../api/orderApi';
import { ERROR_MESSAGES } from '../../../config/constants';

// 提交訂單
export const submitOrder = createAsyncThunk(
  'checkout/submitOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const result = await submitOrderApi(orderData);
      if (result.success) {
        return result.order;
      } else {
        return rejectWithValue(result.error || ERROR_MESSAGES.SUBMIT_ORDER_ERROR);
      }
    } catch (error) {
      return rejectWithValue(error.message || ERROR_MESSAGES.SUBMIT_ORDER_ERROR);
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    orderDetails: null,
    error: null,
    loading: false,
  },
  reducers: {
    // 清空訂單詳情狀態
    clearOrderStatus: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload; 
        state.cartItems = [];
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ERROR_MESSAGES.SUBMIT_ORDER_ERROR;
      });
  },
});

export const { clearOrderStatus  } = checkoutSlice.actions;
export default checkoutSlice.reducer;