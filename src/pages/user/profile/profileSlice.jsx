import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../config/firebaseConfig.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// 獲取用戶個人資料
export const getProfile = createAsyncThunk('profile/getProfile', async (_, { getState }) => {
  const { uid } = getState().login.user;
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().profile;
  } else {
    throw new Error('文檔不存在!');
  }
});

// 更新用戶個人資料
export const updateProfile = createAsyncThunk('profile/updateProfile', async (profile, { getState }) => {
  const { uid } = getState().login.user;
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, { profile });
  return profile;
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