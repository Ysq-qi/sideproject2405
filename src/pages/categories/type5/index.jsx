import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductPage from '../../product/product-page';

// 定義一個異步函數來獲取商品數據
const fetchProductData = async () => {
  const { data } = await axios.get('http://localhost:3001/api/products/accessories');
  const categories = ['全部商品', ...new Set(data.map(product => product.category))]; 
  return { products: data, categories };
};

const Type5 = () => {
  const navigate = useNavigate();

  // 使用 Tanstack query 獲取數據 並且針對加載中與加載錯誤進行判別
  const { data: productData, error, isLoading } = useQuery({
    queryKey: ['productData', 'type5'],
    queryFn: fetchProductData,
  });

  if (isLoading) {
    console.log('Loading...');
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error fetching banner data:', error);
    return <div>Error loading banner data</div>;
  }

  // 當點擊產品時，動態獲取產品詳細數據並跳轉至產品展示頁面
  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    } else {
      console.error('商品ID獲取失敗了');
    }
  };
  
  return <ProductPage productData={productData} handleProductClick={handleProductClick} />;
};

export default Type5;