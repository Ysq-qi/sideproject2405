import { combineReducers } from '@reduxjs/toolkit';
import headerReducer from '../components/header/headerSlice';
import footerReducer from '../components/footer/footerSlice';
import productReducer from '../pages/product/product-page/productSlice';
import productDetailReducer from '../pages/product/product-detail/productDetailSlice';
import productDisplayReducer from '../pages/product/product-display/productDisplaySlice';
import cartReducer from '../pages/shop/cart/cartSlice'

//將多個reducer組合
const rootReducer = combineReducers({
  header: headerReducer,
  footer: footerReducer,
  product: productReducer,
  productDetail: productDetailReducer,
  productDisplay: productDisplayReducer,
  cart: cartReducer
});

export default rootReducer;