import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductDetailApi } from '../../../api/productApi';
import { ERROR_MESSAGES } from '../../../config/constants';

// 異步請求獲取產品詳情
export const fetchProductDetail = createAsyncThunk(
  'productDetail/fetchProductDetail',
  async (productId) => {
    try {
      const product = await fetchProductDetailApi(productId);
      return product;
    } catch (error) {
      throw Error(ERROR_MESSAGES.FETCH_PRODUCTS_ERROR + ': ' + error.message);
    }
  }
);


const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    product: null,
    selectedColor: null,
    selectedSize: null,
    quantity: 1,
    error: null,
  },
  reducers: {
    setColor: (state, action) => {
      state.selectedColor = action.payload;
      state.quantity = 1;
      const stockForSelectedColor = state.product.stock[state.selectedColor];
      const stockForSelectedSize = stockForSelectedColor[state.selectedSize];
      if (state.quantity > stockForSelectedSize) {
        state.error = '數量不足';
      } else {
        state.error = null;
      }
    },
    setSize: (state, action) => {
      state.selectedSize = action.payload;
      state.quantity = 1;
      const stockForSelectedColor = state.product.stock[state.selectedColor];
      const stockForSelectedSize = stockForSelectedColor[state.selectedSize];
      if (state.quantity > stockForSelectedSize) {
        state.error = '數量不足';
      } else {
        state.error = null;
      }
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
      const stockForSelectedColor = state.product.stock[state.selectedColor];
      const stockForSelectedSize = stockForSelectedColor[state.selectedSize];
      if (state.quantity > stockForSelectedSize) {
        state.error = '數量不足';
      } else {
        state.error = null;
      }
    },
    resetSelections: (state) => {
      state.selectedColor = state.product.colors[0];
      state.selectedSize = Object.keys(state.product.sizes.values)[0];
      state.quantity = 1;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      state.product = action.payload;
      state.selectedColor = action.payload.colors[0];
      state.selectedSize = Object.keys(action.payload.sizes.values)[0];
      state.quantity = 1;
      state.error = null;
    });
  },
});

export const { setProduct, setColor, setSize, setQuantity, resetSelections } = productDetailSlice.actions;
export default productDetailSlice.reducer;