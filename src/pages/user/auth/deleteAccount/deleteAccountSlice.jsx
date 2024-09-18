import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../../config/firebaseConfig';
import axios from 'axios';

// 刪除用戶帳號的 Thunk
export const deleteUserAccount = createAsyncThunk('deleteAccount/deleteUserAccount', async (_, { rejectWithValue }) => {
  try {
    const user = auth.currentUser;

    if (!user) throw new Error('用戶未登入');
    
    // 獲取 Firebase Token
    const token = await user.getIdToken();

    // 調用後端 API 刪除用戶數據
    await axios.post('http://localhost:5001/sideproject2405-b8a66/us-central1/api/users/deleteUserAccount', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 成功後登出
    await auth.signOut();

    return '帳號已成功刪除並登出';
  } catch (err) {
    console.error('Error in deleteUserAccount:', err);
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

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