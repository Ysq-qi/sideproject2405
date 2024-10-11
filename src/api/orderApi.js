import axiosInstance from './axiosInstance';

// 提交訂單 API
export const submitOrderApi = async (orderData) => {
  const response = await axiosInstance.post('/orders/submitorder', orderData);
  return response.data;
};

// 獲取訂單 API
export const getOrdersApi = async () => {
  const response = await axiosInstance.get('/orders');
  return response.data;
};