import { combineReducers } from '@reduxjs/toolkit';
import headerReducer from '../components/header/headerSlice';
import footerReducer from '../components/footer/footerSlice';


//將多個reducer組合
const rootReducer = combineReducers({
    header: headerReducer,
    footer: footerReducer,
  });
  
  export default rootReducer;