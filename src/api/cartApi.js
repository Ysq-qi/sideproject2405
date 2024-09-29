import axiosInstance from './axiosInstance';

// 獲取購物車商品列表
export const fetchCartItems = async () => {
  const response = await axiosInstance.get('/cart');
  return response.data.items;
};

// 同步購物車到 Firestore
export const syncCartToFirestoreApi = async (items) => {
  const response = await axiosInstance.post('/cart/sync', { items });
  return response.data.items;
};

// 添加單個商品到購物車
export const addItemToCartApi = async (item) => {
  const response = await axiosInstance.post('/cart/add', { item });
  return response.data.items;
};

// 刪除購物車中的商品
export const removeItemFromCartApi = async ({ id, color, size }) => {
  const response = await axiosInstance.post('/cart/remove', { id, color, size });
  return response.data.items;
};

// 更新購物車中商品的數量
export const updateItemQuantityApi = async ({ id, color, size, quantity }) => {
  const response = await axiosInstance.post('/cart/updatequantity', { id, color, size, quantity });
  return response.data.items;
};

// 提交訂單 API
export const submitOrderApi = async ({ cartItems, user }) => {
  const response = await axiosInstance.post('/cart/submitorder', { cartItems, user });
  return response.data;
};