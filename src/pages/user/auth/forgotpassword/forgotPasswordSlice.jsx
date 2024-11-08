import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../../config/firebaseConfig';
import { sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth';

// 發送密碼重設郵件的異步操作
export const sendResetEmail = createAsyncThunk('forgotPassword/sendResetEmail', async (email, { rejectWithValue }) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return '重設密碼郵件已發送';
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// 重設用戶密碼的異步操作
export const resetPassword = createAsyncThunk('forgotPassword/resetPassword', async ({ oobCode, password }, { rejectWithValue }) => {
  try {
    await confirmPasswordReset(auth, oobCode, password);
    return '密碼已重設';
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    email: '',
    emailValid: false,
    emailError: '',
    passwordValid: false,
    passwordError: '',
    confirmPasswordValid: false,
    confirmPasswordError: '',
    error: '',
    success: '',
    loading: false,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setEmailValid: (state, action) => {
      state.emailValid = action.payload;
    },
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    setPasswordValid: (state, action) => {
      state.passwordValid = action.payload;
    },
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
    setConfirmPasswordValid: (state, action) => {
      state.confirmPasswordValid = action.payload;
    },
    setConfirmPasswordError: (state, action) => {
      state.confirmPasswordError = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    resetForm: (state) => {
      state.email = '';
      state.emailValid = false;
      state.emailError = '';
      state.passwordValid = false;
      state.passwordError = '';
      state.confirmPasswordValid = false;
      state.confirmPasswordError = '';
      state.error = '';
      state.success = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // 發送重置郵件
      .addCase(sendResetEmail.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(sendResetEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '發送郵件失敗';
      })
      // 重設密碼
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '重設密碼失敗';
      });
  }
});

export const { 
  setEmail, 
  setEmailValid, 
  setEmailError, 
  setPasswordValid, 
  setPasswordError, 
  setConfirmPasswordValid, 
  setConfirmPasswordError, 
  setError, 
  setSuccess, 
  resetForm 
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;