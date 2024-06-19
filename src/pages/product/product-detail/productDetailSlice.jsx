import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: null,
  selectedColor: null,
  selectedSize: null,
  quantity: 1,
  error: null,
};

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
      state.selectedColor = action.payload.colors[0];
      state.selectedSize = Object.keys(action.payload.sizes.values)[0];
      state.quantity = 1;
      state.error = null;
    },
    //處理顏色部分
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
    //處理尺寸部分
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
    //處理數量部分
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
    //處理點擊後重置部分
    resetSelections: (state) => {
      state.selectedColor = state.product.colors[0];
      state.selectedSize = Object.keys(state.product.sizes.values)[0];
      state.quantity = 1;
      state.error = null;
    },
  },
});

export const { setProduct, setColor, setSize, setQuantity, resetSelections } = productDetailSlice.actions;
export default productDetailSlice.reducer;