import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from '../../../api/userApi';
import { ERROR_MESSAGES } from '../../../config/constants';

// 創建註冊異步操作
export const register = createAsyncThunk(
  'register/registerUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await registerUser(email, password);
      return result;
    } catch (error) {
      return rejectWithValue(error.message || ERROR_MESSAGES.REGISTER_ERROR);
    }
  }
);

const initialState = {
  uid: null,
  email: '',
  password: '',
  confirmPassword: '',
  emailValid: false,
  passwordValid: false,
  confirmPasswordValid: false,
  emailError: '',
  passwordError: '',
  confirmPasswordError: '',
  error: '',
  success: ''
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setEmailValid: (state, action) => {
      state.emailValid = action.payload;
    },
    setPasswordValid: (state, action) => {
      state.passwordValid = action.payload;
    },
    setConfirmPasswordValid: (state, action) => {
      state.confirmPasswordValid = action.payload;
    },
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
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
    clearUser: (state) => {
      state.uid = null;
      state.email = '';
      state.password = '';
      state.confirmPassword = '';
      state.emailValid = false;
      state.passwordValid = false;
      state.confirmPasswordValid = false;
      state.emailError = ''; 
      state.passwordError = '';
      state.confirmPasswordError = ''; 
      state.error = '';
      state.success = '';
    },
    resetForm: (state) => {
      state.email = '';
      state.password = '';
      state.confirmPassword = '';
      state.emailValid = false;
      state.passwordValid = false;
      state.confirmPasswordValid = false;
      state.emailError = '';
      state.passwordError = '';
      state.confirmPasswordError = '';
      state.error = '';
      state.success = '';
    }
  },
});

export const { 
  setEmail, 
  setPassword, 
  setConfirmPassword, 
  setEmailValid, 
  setPasswordValid, 
  setConfirmPasswordValid, 
  setEmailError,
  setPasswordError,
  setConfirmPasswordError,
  setError, 
  setSuccess, 
  clearUser, 
  resetForm 
} = registerSlice.actions;

export default registerSlice.reducer;