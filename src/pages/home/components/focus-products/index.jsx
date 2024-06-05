import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import HomeProductsSection from '../products-section';
import labelImage from '../../../../assets/images/home/focus-products/focus.png';
import { useNavigate } from 'react-router-dom';

// 定義一個異步函數來獲取商品數據
const fetchFocusProductData = async () => {
  // 獲取 focusproduct.json
  const { data: focusProductData } = await axios.get('http://localhost:3001/api/home/focusproduct');
  const productIds = focusProductData[0].productIds;

  // 獲取所有產品數據
  const { data: allProductsData } = await axios.get('http://localhost:3001/api/products/all');

  // 過濾出 focus products
  const focusProducts = allProductsData.filter(product => productIds.includes(product.id));
  return focusProducts;
};

const FocusProduct = () => {
  const navigate = useNavigate();

  // 使用 TanStack Query 獲取數據 並且針對加載中與加載錯誤進行判別
  const { data: focusProducts, error, isLoading } = useQuery({
    queryKey: ['focusProductData'],
    queryFn: fetchFocusProductData,
  });

  if (isLoading) {
    console.log('Loading...');
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error fetching focus product data:', error);
    return <div>Error loading focus product data</div>;
  }

  // 當點擊產品時，動態獲取產品詳細數據並跳轉至產品展示頁面
  const handleProductClick = (productId) => {
    if (productId && productId.length > 0) {
      navigate(`/product/${productId}`);
    } else {
      console.error('商品ID獲取失敗了');
    }
  };

  return (
    <HomeProductsSection
      labelImage={labelImage}
      products={focusProducts}
      handleProductClick={handleProductClick}
    />
  );
};

export default FocusProduct;