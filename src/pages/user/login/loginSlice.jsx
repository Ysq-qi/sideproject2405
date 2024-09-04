import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  loading: true,
  email: '',
  password: '',
  emailValid: false,
  passwordValid: false,
  emailError: '',
  passwordError: '',
  error: '',
  success: ''
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem('user');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setEmailValid: (state, action) => {
      state.emailValid = action.payload;
    },
    setPasswordValid: (state, action) => {
      state.passwordValid = action.payload;
    },
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    resetForm: (state) => {
      state.email = '';
      state.password = '';
      state.emailValid = false;
      state.passwordValid = false;
      state.emailError = '';
      state.passwordError = '';
      state.error = '';
      state.success = '';
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = '';
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem('user');
    }
  },
});

export const { 
  setUser, 
  clearUser,
  setLoading,
  setEmail, 
  setPassword, 
  setEmailValid, 
  setPasswordValid, 
  setEmailError, 
  setPasswordError, 
  setError, 
  setSuccess, 
  resetForm,
  loginSuccess,
  loginFailure 
} = loginSlice.actions;

export default loginSlice.reducer;