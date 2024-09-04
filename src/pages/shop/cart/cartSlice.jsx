import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { auth } from '../../../config/firebaseConfig.js';

// 從 Firestore 獲取購物車數據
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      // 獲取最新的 token
      const token = await auth.currentUser.getIdToken(); 

      // 使用最新的 token 發送請求
      const response = await axios.get('http://localhost:5001/sideproject2405-b8a66/us-central1/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`, // 使用從 auth 獲取的最新 token
        }
      });
      return response.data.items;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.error : error.message);
    }
  }
);

// 將購物車數據保存到 Firestore
export const saveCart = createAsyncThunk(
  'cart/saveCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      // 獲取最新的 token
      const token = await auth.currentUser.getIdToken(); 
      
      const { items } = getState().cart;

      // 使用最新的 token 發送請求
      const response = await axios.post('http://localhost:5001/sideproject2405-b8a66/us-central1/api/cart/save', 
      { items }, {
        headers: {
          Authorization: `Bearer ${token}`, // 使用從 auth 獲取的最新 token
        }
      });
      return response.data.items;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.error : error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
    loading: false, 
    error: null, 
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); 
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload.id ||
                item.color !== action.payload.color ||
                item.size !== action.payload.size
      );
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(
        item => item.id === action.payload.id &&
                item.color === action.payload.color &&
                item.size === action.payload.size
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = []; 
    },
    setCartItems: (state, action) => {
      state.items = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true; 
        state.error = null; 
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; 
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      .addCase(saveCart.pending, (state) => {
        state.loading = true; 
        state.error = null; 
      })
      .addCase(saveCart.fulfilled, (state, action) => {
        state.loading = false; 
        state.items = action.payload;
      })
      .addCase(saveCart.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload; 
      });
  },
});

export const { addItem, removeItem, clearCart, updateQuantity, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;