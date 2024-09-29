import axios from 'axios';
import { auth } from '../config/firebaseConfig';
import { API_BASE_URL } from '../config/constants';

// 創建一個 axios 實例
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// 添加請求攔截器，為API請求附加授權 (Authorization)
axiosInstance.interceptors.request.use(
  async (config) => {
    const requiresAuth = config.requiresAuth !== false;
    if (requiresAuth) {
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        return Promise.reject(new Error('用戶未登入，請先登入'));
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 添加響應攔截器以處理 HTTP 響應
axiosInstance.interceptors.response.use(
  // 成功響應處理
  (response) => {
    return response;
  },
  (error) => {
    // 錯誤響應的處理
    if (error.response) {
      // 根據 HTTP 狀態碼處理不同類型的錯誤
      switch (error.response.status) {
        case 401:
          // 未授權錯誤：提示用戶重新登入
          alert('未授權，請重新登入');
          break;
        case 500:
          // 服務器內部錯誤：通知用戶稍後重試
          alert('服務器發生錯誤，請稍後再試');
          break;
        default:
          // 其他錯誤：顯示錯誤訊息
          alert(`發生錯誤：${error.response.data.error || '未知錯誤'}`);
          break;
      }
    } else {
      // 無響應錯誤：可能是網路問題
      alert('網路錯誤，請檢查您的網路連接');
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;