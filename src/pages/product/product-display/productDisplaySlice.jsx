import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filteredProducts: [],
};

export const fetchProductsByIds = createAsyncThunk(
  'productDisplay/fetchProductsByIds',
  async (ids) => {
    const response = await fetch(`http://localhost:3001/api/products?ids=${ids.join(',')}`);
    const data = await response.json();
    return data;
  }
);

const productDisplaySlice = createSlice({
  name: 'productDisplay',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsByIds.fulfilled, (state, action) => {
      state.filteredProducts = action.payload;
    });
  },
});

export const { setProducts } = productDisplaySlice.actions;
export default productDisplaySlice.reducer;