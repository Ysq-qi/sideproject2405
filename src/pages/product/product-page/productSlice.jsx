import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filteredProducts: [],
  selectedCategory: '全部商品',
  sortOrder: 'default',
  categories: ['全部商品'],
  currentPage: 1,
  itemsPerPage: 15, // 每頁顯示的商品數量（5*3）
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload.products;
      state.filteredProducts = action.payload.products;
      state.categories = action.payload.categories;
      state.currentPage = 1; // 當設置新的產品時重置頁碼
    },
    updateCategory(state, action) {
      state.selectedCategory = action.payload;
      state.sortOrder = 'default';
      state.currentPage = 1; // 當更新類別時重置頁碼
      filterAndSort(state);
    },
    updateSortOrder(state, action) {
      state.sortOrder = action.payload;
      state.currentPage = 1; // 當更新排序時重置頁碼
      filterAndSort(state);
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    }
  },
});

const filterAndSort = (state) => {
  let data = [...state.products];

  if (state.selectedCategory !== '全部商品') {
    data = data.filter(product => product.category === state.selectedCategory);
  }

  switch (state.sortOrder) {
    case 'high-to-low':
      data.sort((a, b) => b.price - a.price);
      break;
    case 'low-to-high':
      data.sort((a, b) => a.price - b.price);
      break;
    case 'bestseller':
      data.sort((a, b) => b.sales - a.sales);
      break;
    case 'new':
      data.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
      break;
    default:
      data.sort((a, b) => a.id - b.id);
  }

  state.filteredProducts = data;
};

export const { setProducts, updateCategory, updateSortOrder, setPage } = productSlice.actions;

export default productSlice.reducer;
