import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsCategoryApi } from '../../../api/productApi';
import { ERROR_MESSAGES } from '../../../config/constants';

// 獲取商品的Category於product-page顯示
export const fetchProductsByCategory = createAsyncThunk(
  'product/fetchProductsByCategory',
  async ({ mainCategory, subCategory }) => {
    try {
      const params = { mainCategory };
      if (subCategory && subCategory !== '全部商品') {
        params.subCategory = subCategory;
      }
      const products = await fetchProductsCategoryApi(params);
      return { products };
    } catch (error) {
      throw Error(ERROR_MESSAGES.FETCH_PRODUCTS_ERROR + ': ' + error.message);
    }
  }
);

const filterAndSort = (state) => {
  let data = [...state.products];

  if (state.selectedCategory !== '全部商品') {
    data = data.filter(product => product.subCategory === state.selectedCategory);
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
      data.sort((a, b) => a.id.localeCompare(b.id));
  }

  state.filteredProducts = data;
};

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    filteredProducts: [],
    selectedCategory: '全部商品',
    sortOrder: 'default',
    categories: ['全部商品'],
    currentPage: 1,
    itemsPerPage: 15,
  },
  reducers: {
    updateCategory(state, action) {
      state.selectedCategory = action.payload;
      state.sortOrder = 'default';
      filterAndSort(state);
    },
    updateSortOrder(state, action) {
      state.sortOrder = action.payload;
      filterAndSort(state);
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.products = action.payload.products;
      filterAndSort(state); 
    });
  },
});

export const { updateCategory, updateSortOrder, setPage } = productSlice.actions;
export default productSlice.reducer;