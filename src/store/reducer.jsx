import { combineReducers } from '@reduxjs/toolkit';
import headerReducer from '../components/header/headerSlice';
import footerReducer from '../components/footer/footerSlice';
import productReducer from '../pages/product/product-page/productSlice';
import productDisplayReducer from '../pages/product/product-display/productDisplaySlice';

//將多個reducer組合
const rootReducer = combineReducers({
  header: headerReducer,
  footer: footerReducer,
  product: productReducer,
  productDisplay: productDisplayReducer
});

export default rootReducer;