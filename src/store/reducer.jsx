import { combineReducers  } from '@reduxjs/toolkit';
import headerReducer from '../components/header/headerSlice';
import footerReducer from '../components/footer/footerSlice';
import productReducer from '../pages/product/product-page/productSlice';


//將多個reducer組合
const rootReducer = combineReducers({
    header: headerReducer,
    footer: footerReducer,
    product: productReducer
  });
  
  export default rootReducer;