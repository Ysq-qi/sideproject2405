import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUserAccountApi } from '../../../../api/userApi';

// 帳號用戶刪除
export const deleteUserAccount = createAsyncThunk(
  'deleteAccount/deleteUserAccount',
  async (_, { rejectWithValue }) => {
    try {
      return await deleteUserAccountApi();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteAccountSlice = createSlice({
  name: 'deleteAccount',
  initialState: {
    error: null,
    loading: false,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setError } = deleteAccountSlice.actions;
export default deleteAccountSlice.reducer;