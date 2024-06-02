import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductPage from '../../product/product-page';

// 定義一個異步函數來獲取商品數據
const fetchProductData = async () => {
  const { data } = await axios.get('/data/product/jackets.json');
  const categories = ['全部商品', ...new Set(data.jackets.map(product => product.category))]; 
  return { products: data.jackets, categories };
};

const Type1 = () => {
  const { data: productData, error, isLoading } = useQuery({
    queryKey: ['productData', 'type1'],
    queryFn: fetchProductData,
  });

  if (isLoading) return <div>Loading...</div>; // 顯示加載狀態
  if (error) return <div>資料加載失敗: {error.message}</div>; // 顯示錯誤信息

  return <ProductPage productData={productData} />;
};

export default Type1;