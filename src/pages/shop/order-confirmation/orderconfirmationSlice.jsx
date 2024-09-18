import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderDetails: null,
  loading: false,
  error: null,
};

const orderConfirmationSlice = createSlice({
  name: 'orderConfirmation',
  initialState,
  reducers: {
    fetchOrderDetails(state) {
      // 暫時不執行實際功能
      state.orderDetails = { dummy: "data" };
    },
  },
});

export const { fetchOrderDetails } = orderConfirmationSlice.actions;

export default orderConfirmationSlice.reducer;