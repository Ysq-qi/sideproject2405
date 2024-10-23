import { notifyUser } from './notification';

export const handleError = (type, error) => {
  // 僅在開發環境中記錄詳細錯誤
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${type} Error]:`, error);
  }

  switch (type) {
    case 'auth':
      // 用於處理身份驗證相關錯誤，例如登入或登出失敗
      notifyUser('登出失敗，請稍後再試');
      break;

    case 'api':
      // 用於處理 API 請求失敗，例如伺服器錯誤、網路中斷
      if (error.response && error.response.status === 404) {
        notifyUser('未找到資源，請檢查網址');
      } else if (error.response && error.response.status === 500) {
        notifyUser('伺服器錯誤，請稍後再試');
      } else {
        notifyUser('網路連線異常，請檢查您的網路');
      }
      break;

    case 'form':
      // 用於處理表單驗證錯誤
      notifyUser('表單驗證失敗，請檢查輸入內容');
      break;

    case 'validation':
      // 用於處理一般性驗證錯誤
      notifyUser('輸入內容格式錯誤，請重新檢查');
      break;

    case 'navigation':
      // 用於處理路由導航錯誤，如無法跳轉至目標頁面
      notifyUser('無法跳轉頁面，請檢查路徑是否正確');
      break;

    case 'stock':
      // 用於處理庫存不足的錯誤
      notifyUser('庫存不足，請減少數量或稍後再試');
      break;

    case 'image':
      // 用於處理圖片加載失敗的錯誤
      notifyUser('圖片載入失敗，請稍後再試');
      break;

    default:
      // 處理未知的錯誤
      notifyUser('發生未知錯誤，請稍後再試');
  }
};