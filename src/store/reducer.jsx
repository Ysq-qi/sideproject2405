import { combineReducers } from '@reduxjs/toolkit';
import headerReducer from '../components/header/headerSlice';
import footerReducer from '../components/footer/footerSlice';
import homeReducer from '../pages/home/homeSlice.jsx';
import productReducer from '../pages/product/product-page/productSlice';
import productDetailReducer from '../pages/product/product-detail/productDetailSlice';
import productDisplayReducer from '../pages/product/product-display/productDisplaySlice';
import productSearchReducer from '../pages/product/product-search/productSearchSlice';
import cartReducer from '../pages/shop/cart/cartSlice'
import checkoutReducer from '../pages/shop/checkout/checkoutSlice.jsx';
import orderconfirmationReducer from '../pages/shop/order-confirmation/orderconfirmationSlice';
import orderReducer from '../pages/shop/order/orderSlice.jsx';
import registerReducer from '../pages/user/register/registerSlice'
import loginReducer from '../pages/user/login/loginSlice'
import profileReducer from '../pages/user/profile/profileSlice'
import forgotPasswordReducer from '../pages/user/auth/forgotpassword/forgotPasswordSlice'
import deleteAccountReducer from '../pages/user/auth/deleteAccount/deleteAccountSlice'


//將多個reducer組合
const rootReducer = combineReducers({
  header: headerReducer,
  footer: footerReducer,
  home: homeReducer,
  product: productReducer,
  productDetail: productDetailReducer,
  productDisplay: productDisplayReducer,
  productSearch: productSearchReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orderconfirmation: orderconfirmationReducer,
  order: orderReducer,
  register: registerReducer,
  login: loginReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  deleteAccount: deleteAccountReducer,
});

export default rootReducer;