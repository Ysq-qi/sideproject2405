import axiosInstance from './axiosInstance';

// 獲取所有首頁數據
export const fetchHomeData = async () => {
  const response = await axiosInstance.get('/home/all', {
    requiresAuth: false,
  });
  return response.data;
};

// 獲取橫幅數據
export const fetchBannerData = async () => {
  const response = await axiosInstance.get('/home/banner', {
    requiresAuth: false,
  });
  return response.data;
};

// 獲取特色商品數據
export const fetchFeaturedData = async () => {
  const response = await axiosInstance.get('/home/featured', {
    requiresAuth: false,
  });
  return response.data;
};

// 獲取新品數據
export const fetchNewProductData = async () => {
  const response = await axiosInstance.get('/home/newproduct', {
    requiresAuth: false,
  });
  return response.data;
};

// 獲取注目商品數據
export const fetchFocusProductData = async () => {
  const response = await axiosInstance.get('/home/focusproduct', {
    requiresAuth: false,
  });
  return response.data;
};
