import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitOrderApi } from '../../../api/cartApi';
import { ERROR_MESSAGES } from '../../../config/constants';

// 提交訂單
export const submitOrder = createAsyncThunk(
  'checkout/submitOrder',
  async ({ cartItems, user }, { rejectWithValue }) => {
    try {
      const result = await submitOrderApi({ cartItems, user });
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
    cartItems: [], 
    orderDetails: null, // 新增這個狀態來存儲訂單數據
    error: null,
    loading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    clearOrderStatus: (state) => {
      state.orderDetails = null; // 清除訂單數據
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
        state.orderDetails = action.payload; // 存儲訂單數據
        state.cartItems = [];  // 提交訂單後清空購物車
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ERROR_MESSAGES.SUBMIT_ORDER_ERROR;
      });
  },
});

export const { clearCart, clearOrderStatus } = checkoutSlice.actions;
export default checkoutSlice.reducer;