import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  emailValid: false,
  emailError: '',
  error: '',
  success: ''
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
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
      state.error = '';
      state.success = '';
    }
  },
});

export const { 
  setEmail, 
  setEmailValid, 
  setEmailError, 
  setError, 
  setSuccess, 
  resetForm 
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
