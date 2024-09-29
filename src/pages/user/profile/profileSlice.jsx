import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
} from '../../../api/userApi';
import { ERROR_MESSAGES } from '../../../config/constants';

// 獲取用戶個人資料
export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const profile = await getUserProfile();
      return profile;
    } catch (error) {
      return rejectWithValue(ERROR_MESSAGES.FETCH_PROFILE_ERROR);
    }
  }
);

// 更新用戶個人資料
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const updatedProfile = await updateUserProfile(profileData);
      return updatedProfile;
    } catch (error) {
      return rejectWithValue(ERROR_MESSAGES.UPDATE_PROFILE_ERROR);
    }
  }
);

// 變更用戶密碼
export const changePassword = createAsyncThunk(
  'profile/changePassword',
  async (newPassword, { rejectWithValue }) => {
    try {
      await changeUserPassword(newPassword);
    } catch (error) {
      return rejectWithValue(ERROR_MESSAGES.CHANGE_PASSWORD_ERROR);
    }
  }
);

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
      // 獲取個人資料
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      // 更新個人資料
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      // 變更密碼
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  setPasswordValid,
  setPasswordError,
  setConfirmPasswordValid,
  setConfirmPasswordError,
} = profileSlice.actions;
export default profileSlice.reducer;