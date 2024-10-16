import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsForDisplayApi } from '../../../api/productApi';
import { ERROR_MESSAGES } from '../../../config/constants';


// 根據 bannerId 或 featuredId 查找商品
export const fetchProductsForDisplay = createAsyncThunk(
  'productDisplay/fetchProductsForDisplay',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getProductsForDisplayApi(id);
      if (data.length === 0) {
        throw new Error('No products found for the given ID');
      }
      return data;
    } catch (error) {
      throw Error(ERROR_MESSAGES.FETCH_PRODUCTS_ERROR + ': ' + error.message);
    }
  }
);

const productDisplaySlice = createSlice({
  name: 'productDisplay',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsForDisplay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsForDisplay.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsForDisplay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productDisplaySlice.reducer;