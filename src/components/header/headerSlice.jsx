import { createSlice } from '@reduxjs/toolkit';

//示範代碼
export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    title: 'Default Title',
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = headerSlice.actions;
export default headerSlice.reducer;