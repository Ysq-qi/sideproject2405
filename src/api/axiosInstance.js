import axios from 'axios';
import { auth } from '../config/firebaseConfig';
import { API_BASE_URL } from '../config/constants';

// 創建一個 axios 實例
const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // API 基礎 URL，統一管理請求地址
});

// 添加請求攔截器，為API請求附加授權 (Authorization)
axiosInstance.interceptors.request.use(
  async (config) => {
    // 檢查請求是否需要授權
    const requiresAuth = config.requiresAuth !== false;
    if (requiresAuth) {
      // 若需要授權且使用者已登入，附加授權標頭
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // 若未登入，直接拒絕請求並拋出錯誤
        return Promise.reject(new Error('用戶未登入，請先登入'));
      }
    }
    return config;
  },
  (error) => Promise.reject(error) // 若請求攔截器發生錯誤，直接拒絕
);

// 錯誤攔截器：僅針對異步 HTTP 請求的錯誤進行攔截處理
axiosInstance.interceptors.response.use(
  // 成功響應處理
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // 將根據不同的 HTTP 狀態碼（如 401、403、500 等）來顯示相應的錯誤訊息
      switch (error.response.status) {
        case 401:
          alert('未授權，請重新登入');
          break;
        case 403:
          alert(error.response.data.error || '此操作被禁止');
          break;
        case 500:
          alert('服務器發生錯誤，請稍後再試');
          break;
        default:
          alert(`發生錯誤：${error.response.data.error || '未知錯誤'}`);
          break;
      }
    } else {
      // 無響應錯誤：可能是網路問題
      alert('可能是網路錯誤，請檢查您的網路連接');
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;