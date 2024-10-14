import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBannerData, fetchFeaturedData, fetchNewProductData, fetchFocusProductData } from '../../api/homeApi';
import { fetchProductsByIdsApi } from '../../api/productApi';
import { ERROR_MESSAGES } from '../../config/constants';

// 獲取橫幅數據的異步操作
export const fetchBanner = createAsyncThunk('home/fetchBanner', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchBannerData();
    return data;
  } catch (error) {
    const message = error.response?.data?.error || ERROR_MESSAGES.FETCH_BANNER_ERROR;
    return rejectWithValue(message);
  }
});

// 獲取特色商品數據的異步操作
export const fetchFeatured = createAsyncThunk('home/fetchFeatured', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchFeaturedData();
    return data;
  } catch (error) {
    const message = error.response?.data?.error || ERROR_MESSAGES.FETCH_FEATURED_ERROR;
    return rejectWithValue(message);
  }
});

// 獲取新品數據的異步操作
export const fetchNewProducts = createAsyncThunk('home/fetchNewProducts', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchNewProductData();
    return data;
  } catch (error) {
    const message = error.response?.data?.error || ERROR_MESSAGES.FETCH_NEW_PRODUCT_ERROR;
    return rejectWithValue(message);
  }
});

// 獲取注目商品數據的異步操作
export const fetchFocusProducts = createAsyncThunk('home/fetchFocusProducts', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchFocusProductData();
    return data;
  } catch (error) {
    const message = error.response?.data?.error || ERROR_MESSAGES.FETCH_FOCUS_PRODUCT_ERROR;
    return rejectWithValue(message);
  }
});

// 獲取多個產品數據的異步操作
export const fetchProductsByIds = createAsyncThunk('home/fetchProductsByIds', async ({ productIds, type }, { rejectWithValue }) => {
  try {
    const data = await fetchProductsByIdsApi(productIds);
    return { type, products: data };
  } catch (error) {
    const message = error.response?.data?.error || ERROR_MESSAGES.FETCH_PRODUCTS_ERROR;
    return rejectWithValue(message);
  }
});

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    banners: [],              // 存放橫幅數據
    featured: [],             // 存放特色商品數據
    newProducts: [],          // 存放新品數據
    focusProducts: [],        // 存放注目商品數據
    newProductDetails: [],    // 存放新品的詳細數據
    focusProductDetails: [],  // 存放注目商品的詳細數據
    loading: false,           // 加載狀態
    error: null,              // 錯誤訊息
  },
  reducers: {},
  extraReducers: (builder) => {
    // 處理 fetchBanner 異步操作
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.loading = true;  // 開始加載，將 loading 設置為 true
        state.error = null;    // 確保錯誤狀態被重置
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.banners = action.payload; // 成功獲取橫幅數據，並更新到狀態中
        state.loading = false;          // 停止加載
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.loading = false;          // 停止加載
        state.error = action.payload;   // 將錯誤消息保存到狀態中
      });

    // 處理 fetchFeatured 異步操作
    builder
      .addCase(fetchFeatured.pending, (state) => {
        state.loading = true;  // 開始加載
        state.error = null;    // 重置錯誤狀態
      })
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.featured = action.payload; // 成功獲取特色商品數據
        state.loading = false;           // 停止加載
      })
      .addCase(fetchFeatured.rejected, (state, action) => {
        state.loading = false;           // 停止加載
        state.error = action.payload;    // 保存錯誤信息
      });

    // 處理 fetchNewProducts 異步操作
    builder
      .addCase(fetchNewProducts.pending, (state) => {
        state.loading = true;  // 開始加載
        state.error = null;    // 重置錯誤狀態
      })
      .addCase(fetchNewProducts.fulfilled, (state, action) => {
        state.newProducts = action.payload; // 成功獲取新品數據
        state.loading = false;              // 停止加載
      })
      .addCase(fetchNewProducts.rejected, (state, action) => {
        state.loading = false;              // 停止加載
        state.error = action.payload;       // 保存錯誤信息
      });

    // 處理 fetchFocusProducts 異步操作
    builder
      .addCase(fetchFocusProducts.pending, (state) => {
        state.loading = true;  // 開始加載
        state.error = null;    // 重置錯誤狀態
      })
      .addCase(fetchFocusProducts.fulfilled, (state, action) => {
        state.focusProducts = action.payload; // 成功獲取注目商品數據
        state.loading = false;                // 停止加載
      })
      .addCase(fetchFocusProducts.rejected, (state, action) => {
        state.loading = false;                // 停止加載
        state.error = action.payload;         // 保存錯誤信息
      });

    // 處理 fetchProductsByIds 異步操作（適用於多個商品類別）
    builder
      .addCase(fetchProductsByIds.pending, (state) => {
        state.loading = true;  // 開始加載
        state.error = null;    // 重置錯誤狀態
      })
      .addCase(fetchProductsByIds.fulfilled, (state, action) => {
        const { type, products } = action.payload;
        if (type === 'new') {
          state.newProductDetails = products; // 為新品設置詳細數據
        } else if (type === 'focus') {
          state.focusProductDetails = products; // 為注目商品設置詳細數據
        }
        state.loading = false;  // 停止加載
      })
      .addCase(fetchProductsByIds.rejected, (state, action) => {
        state.loading = false;  // 停止加載
        state.error = action.payload;  // 保存錯誤信息
      });
  },
});

export default homeSlice.reducer;