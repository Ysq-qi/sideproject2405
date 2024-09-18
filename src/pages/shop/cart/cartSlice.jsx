import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../config/firebaseConfig.js';
import axios from 'axios';

// 從 Firestore 獲取購物車數據
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const token = await auth.currentUser.getIdToken();
    const response = await axios.get('http://localhost:5001/sideproject2405-b8a66/us-central1/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.items;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.error : error.message);
  }
});

// 將mergeLocalAndRemoteCart合併的購物車清單同步至Firestore
export const syncCartToFirestore = createAsyncThunk('cart/syncCartToFirestore', async (_, { getState, rejectWithValue }) => {
  try {
    const token = await auth.currentUser.getIdToken();
    const { items } = getState().cart;
    const response = await axios.post('http://localhost:5001/sideproject2405-b8a66/us-central1/api/cart/sync', 
      { items }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.items;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.error : error.message);
  }
});

// 刪除單個商品(Firestore)
export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async ({ id, color, size }, { rejectWithValue }) => {
  try {
    const token = await auth.currentUser.getIdToken();
    const response = await axios.post('http://localhost:5001/sideproject2405-b8a66/us-central1/api/cart/remove', 
      { id, color, size }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.items;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.error : error.message);
  }
});

// 更新商品數量(Firestore)
export const updateItemQuantity = createAsyncThunk('cart/updateItemQuantity', async ({ id, color, size, quantity }, { rejectWithValue }) => {
  try {
    const token = await auth.currentUser.getIdToken();
    const response = await axios.post('http://localhost:5001/sideproject2405-b8a66/us-central1/api/cart/updatequantity', 
      { id, color, size, quantity }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.items;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data.error : error.message);
  }
});

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
      // fetchCart 還是直接覆蓋狀態，因為它加載初始購物車狀態
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

      // 刪除商品的處理
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;

        // 從後端返回的購物車數據
        const updatedItems = action.payload;

        // 僅刪除對應的商品，保證本地狀態不會被完全覆蓋
        updatedItems.forEach((updatedItem) => {
          const existingItemIndex = state.items.findIndex(
            item => item.id === updatedItem.id &&
                    item.color === updatedItem.color &&
                    item.size === updatedItem.size
          );
          if (existingItemIndex !== -1) {
            state.items.splice(existingItemIndex, 1);  // 刪除商品
          }
        });
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 更新商品數量的處理
      .addCase(updateItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.loading = false;

        // 從後端返回的購物車數據
        const updatedItems = action.payload;

        // 僅更新對應的商品數量，保證本地狀態不會被覆蓋
        updatedItems.forEach((updatedItem) => {
          const existingItem = state.items.find(
            item => item.id === updatedItem.id &&
                    item.color === updatedItem.color &&
                    item.size === updatedItem.size
          );
          if (existingItem) {
            existingItem.quantity = updatedItem.quantity;
          }
        });
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 同步購物車到 Firestore
      .addCase(syncCartToFirestore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncCartToFirestore.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(syncCartToFirestore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addItem, removeItem, clearCart, updateQuantity, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;