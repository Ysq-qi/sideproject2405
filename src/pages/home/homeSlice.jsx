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

const initialState = {
  banners: null,
  featured: null,
  newProducts: null,
  focusProducts: null,
  newProductDetails: null,
  focusProductDetails: null,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.banners = action.payload;
      })
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.featured = action.payload;
      })
      .addCase(fetchNewProducts.fulfilled, (state, action) => {
        state.newProducts = action.payload;
      })
      .addCase(fetchFocusProducts.fulfilled, (state, action) => {
        state.focusProducts = action.payload;
      })
      .addCase(fetchProductsByIds.fulfilled, (state, action) => {
        const { type, products } = action.payload;
        if (type === 'new') {
          state.newProductDetails = products;
        } else if (type === 'focus') {
          state.focusProductDetails = products;
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export default homeSlice.reducer;