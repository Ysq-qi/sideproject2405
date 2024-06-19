import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],  // 初始狀態，包含購物車中的商品項目
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 接收商品信息頁面的購物訂單
    addToCart: (state, action) => {
      const item = action.payload;
      // 檢查是否已有相同的商品、顏色、尺寸存在於購物車中
      const existingItem = state.items.find(i => i.id === item.id && i.color === item.color && i.size === item.size);
      if (existingItem) {
        // 如果存在，則更新該商品的數量
        existingItem.quantity += item.quantity;
      } else {
        // 如果不存在，則新增此商品到購物車中
        state.items.push(item);
      }
    },
    // 刪除此筆訂單
    removeFromCart: (state, action) => {
      const { id, color, size } = action.payload;
      // 過濾掉與要刪除的商品匹配的項目
      state.items = state.items.filter(item => !(item.id === id && item.color === color && item.size === size));
    },
    // 更新訂單數量
    updateQuantity: (state, action) => {
      const { id, color, size, quantity } = action.payload;
      // 查找對應的商品項目
      const item = state.items.find(item => item.id === id && item.color === color && item.size === size);
      if (item) {
        // 更新該商品的數量
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;