// API請求網址
export const API_BASE_URL = 'http://localhost:5001/sideproject2405-b8a66/us-central1/api';

// 錯誤訊息常量
export const ERROR_MESSAGES = {
  // 用戶相關
  REGISTER_ERROR: '註冊失敗，請稍後再試',
  LOGIN_ERROR: '登入失敗，請稍後再試',
  FETCH_PROFILE_ERROR: '獲取個人資料失敗',
  UPDATE_PROFILE_ERROR: '更新個人資料失敗',
  CHANGE_PASSWORD_ERROR: '變更密碼失敗',
  DELETE_ACCOUNT_ERROR: '刪除帳號失敗',

  // 購物車相關
  FETCH_CART_ERROR: '獲取購物車數據時發生錯誤',
  REMOVE_ITEM_ERROR: '刪除商品時發生錯誤',
  UPDATE_QUANTITY_ERROR: '更新商品數量時發生錯誤',
  
  // 結帳相關
  SUBMIT_ORDER_ERROR: '提交訂單時發生錯誤',
};