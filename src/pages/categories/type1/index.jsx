import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ProductPage from '../../product/product-page';
import { setProducts } from '../../product/product-page/productSlice';

// 定義一個異步函數來獲取商品數據
const fetchProductData = async () => {
  const { data } = await axios.get('/data/product/jackets.json');
  const categories = ['全部商品', ...new Set(data.jackets.map(product => product.category))]; 
  //處理使用Set方法確保product.category只會被獲取一次
  return { products: data.jackets, categories };
};

const Type1 = () => {
  const dispatch = useDispatch();
  const { data: productData, error, isLoading } = useQuery({
    queryKey: ['productData', 'type1'],
    queryFn: fetchProductData,
    onSuccess: (data) => {
      dispatch(setProducts(data));
    },
  });

  if (isLoading) return <div>Loading...</div>; // 顯示加載狀態
  if (error) return <div>資料加載失敗: {error.message}</div>; // 顯示錯誤信息

  return <ProductPage productData={productData} />;
};

export default Type1;
