import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../config/firebaseConfig';
import {
  fetchCartItems,
  syncCartToFirestoreApi,
  removeItemFromCartApi,
  updateItemQuantityApi,
  addItemToCartApi 
} from '../../../api/cartApi';
import { ERROR_MESSAGES } from '../../../config/constants';

// 獲取購物車商品
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    if (!auth.currentUser) {
      throw new Error('使用者未登入');
    }
    const items = await fetchCartItems();
    return items;
  } catch (error) {
    return rejectWithValue(error.message || ERROR_MESSAGES.FETCH_CART_ERROR);
  }
});

// 同步購物車到 Firestore
export const syncCartToFirestore = createAsyncThunk('cart/syncCartToFirestore',async (_, { getState, rejectWithValue }) => {
    try {
      if (!auth.currentUser) {
        throw new Error('使用者未登入');
      }
      const { items } = getState().cart;
      const updatedItems = await syncCartToFirestoreApi(items);
      return updatedItems;
    } catch (error) {
      return rejectWithValue(error.message || ERROR_MESSAGES.SYNC_CART_ERROR);
    }
  }
);

// 刪除購物車商品
export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart',async ({ id, color, size }, { rejectWithValue }) => {
    try {
      if (!auth.currentUser) {
        throw new Error('使用者未登入');
      }
      const updatedItems = await removeItemFromCartApi({ id, color, size });
      return updatedItems;
    } catch (error) {
      return rejectWithValue(error.message || ERROR_MESSAGES.REMOVE_ITEM_ERROR);
    }
  }
);

// 更新購物車商品數量
export const updateItemQuantity = createAsyncThunk('cart/updateItemQuantity',async ({ id, color, size, quantity }, { rejectWithValue }) => {
    try {
      if (!auth.currentUser) {
        throw new Error('使用者未登入');
      }
      const updatedItems = await updateItemQuantityApi({ id, color, size, quantity });
      return updatedItems;
    } catch (error) {
      return rejectWithValue(error.message || ERROR_MESSAGES.UPDATE_QUANTITY_ERROR);
    }
  }
);

// 異步請求：添加商品到購物車，根據是否登入，選擇存儲位置 (for ProductDetailInfo)
export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (item, { getState, rejectWithValue }) => {
  const { isAuthenticated } = getState().login;

  try {
    if (isAuthenticated) {
      // 登入狀態，將商品添加到 Firestore
      await addItemToCartApi(item); // 這裡會發送 API 請求到你的後端 '/cart/add'
    } else {
      // 未登入，將商品存儲到本地存儲
      saveCartToLocalStorage(item);
    }
  } catch (error) {
    return rejectWithValue('添加商品到購物車失敗');
  }
});

// 本地存儲邏輯 (for ProductDetailInfo)
const saveCartToLocalStorage = (item) => {
  const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const localExistingItemIndex = localCartItems.findIndex(
    (i) => i.id === item.id && i.color === item.color && i.size === item.size
  );

  if (localExistingItemIndex !== -1) {
    localCartItems[localExistingItemIndex].quantity += item.quantity;
  } else {
    localCartItems.push(item);
  }

  localStorage.setItem('cartItems', JSON.stringify(localCartItems));
};

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
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItems = action.payload;
        state.items = updatedItems;
      })

      // 更新商品數量的處理
      .addCase(updateItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItems = action.payload;
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