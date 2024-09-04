import { combineReducers } from '@reduxjs/toolkit';
import headerReducer from '../components/header/headerSlice';
import footerReducer from '../components/footer/footerSlice';
import productReducer from '../pages/product/product-page/productSlice';
import productDetailReducer from '../pages/product/product-detail/productDetailSlice';
import productDisplayReducer from '../pages/product/product-display/productDisplaySlice';
import cartReducer from '../pages/shop/cart/cartSlice'
import registerReducer from '../pages/user/register/registerSlice'
import loginReducer from '../pages/user/login/loginSlice'
import forgotPasswordReducer from '../pages/user/auth/forgotpassword/forgotPasswordSlice'
import profileReducer from '../pages/user/profile/profileSlice'


//將多個reducer組合
const rootReducer = combineReducers({
  header: headerReducer,
  footer: footerReducer,
  product: productReducer,
  productDetail: productDetailReducer,
  productDisplay: productDisplayReducer,
  cart: cartReducer,
  register: registerReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  profile: profileReducer
});

export default rootReducer;