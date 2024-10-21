import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchProductsApi } from '../../../api/productApi';
import { ERROR_MESSAGES } from '../../../config/constants';

export const fetchSearchResults = createAsyncThunk(
  'productSearch/fetchSearchResults',
  async (query, { rejectWithValue }) => {
    try {
      const data = await searchProductsApi(query);
      return data;
    } catch (error) {
      const message = error.response?.data?.error || ERROR_MESSAGES.FETCH_PRODUCTS_ERROR;
      return rejectWithValue(message);
    }
  }
);

const productSearchSlice = createSlice({
  name: 'productSearch',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSearchSlice.reducer;