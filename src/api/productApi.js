import axiosInstance from './axiosInstance';

// 獲取產品列表（根據分類）
export const fetchProductsCategoryApi = async (params) => {
  const response = await axiosInstance.get('/products', {
    params,
    requiresAuth: false,
  });
  return response.data;
};

// 獲取單個產品詳情 (根據單一ID)
export const fetchProductDetailApi = async (productId) => {
  const response = await axiosInstance.get('/products', {
    params: { id: productId },
    requiresAuth: false,
  });
  return response.data[0];
};

// 獲取多個產品資料（根據多個IDs）
export const fetchProductsByIdsApi = async (productIds) => {
  const response = await axiosInstance.get('/products/ids', {
    params: { ids: productIds.join(',') },
    requiresAuth: false,
  });
  return response.data;
};

// 獲取展示頁面的產品（根據 banner 或 featured ID）
export const getProductsForDisplayApi = async (id) => {
  const response = await axiosInstance.get('/products/display', {
    params: { id },
    requiresAuth: false,
  });
  return response.data;
};

export const searchProductsApi = async (query) => {
  const response = await axiosInstance.get('/products/search', {
    params: { q: query },
    requiresAuth: false,
  });
  return response.data;
};