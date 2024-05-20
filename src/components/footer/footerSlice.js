import { createSlice } from '@reduxjs/toolkit';

//示範代碼
export const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    title: 'Default Title',
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = footerSlice.actions;
export default footerSlice.reducer;