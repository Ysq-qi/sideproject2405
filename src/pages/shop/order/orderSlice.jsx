import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrders(state) {
      // 暫時不執行實際功能
      state.orders = [{ id: 1, status: "Dummy order" }];
    },
  },
});

export const { fetchOrders } = orderSlice.actions;

export default orderSlice.reducer;
