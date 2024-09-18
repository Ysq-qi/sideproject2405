import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderStatus: null,
  loading: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    submitOrder(state) {
      // 暫時不執行實際功能
      state.orderStatus = 'submitted';
    },
  },
});

export const { submitOrder } = checkoutSlice.actions;

export default checkoutSlice.reducer;