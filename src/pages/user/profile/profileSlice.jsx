import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../config/firebaseConfig.js';
import axios from 'axios';

// 獲取用戶個人資料
export const getProfile = createAsyncThunk('profile/getProfile', async () => {
  const token = await auth.currentUser.getIdToken();
  const response = await axios.get('http://localhost:5001/sideproject2405-b8a66/us-central1/api/users/getProfile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.profile;
});

// 更新用戶個人資料
export const updateProfile = createAsyncThunk('profile/updateProfile', async (profileData) => {
  const token = await auth.currentUser.getIdToken();
  const response = await axios.put('http://localhost:5001/sideproject2405-b8a66/us-central1/api/users/updateProfile', profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

// 變更用戶密碼
export const changePassword = createAsyncThunk('profile/changePassword', async (newPassword) => {
  const token = await auth.currentUser.getIdToken();
  const response = await axios.put('http://localhost:5001/sideproject2405-b8a66/us-central1/api/users/changePassword', { newPassword }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    isLoading: false,
    error: null,
    passwordValid: false,
    confirmPasswordValid: false,
    passwordError: '',
    confirmPasswordError: '',
  },
  reducers: {
    setPasswordValid(state, action) {
      state.passwordValid = action.payload;
    },
    setPasswordError(state, action) {
      state.passwordError = action.payload;
    },
    setConfirmPasswordValid(state, action) {
      state.confirmPasswordValid = action.payload;
    },
    setConfirmPasswordError(state, action) {
      state.confirmPasswordError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPasswordValid, setPasswordError, setConfirmPasswordValid, setConfirmPasswordError } = profileSlice.actions;
export default profileSlice.reducer;