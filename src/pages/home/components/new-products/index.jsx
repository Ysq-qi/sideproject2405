import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import HomeProductsSection from '../products-section';
import labelImage from '../../../../assets/images/home/new-products/new.png';
import { useNavigate } from 'react-router-dom';

// 定義一個異步函數來獲取商品數據
const fetchNewProductData = async () => {
  // 獲取 newproduct.json
  const { data: newProductData } = await axios.get('http://localhost:3001/api/home/newproduct');
  
  if (!newProductData.length) {
    throw new Error('No new product data found');
  }
  
  const productIds = newProductData[0].productIds;

  // 獲取所有產品數據
  const { data: allProductsData } = await axios.get('http://localhost:3001/api/products/all');

  // 過濾出 new products
  const newProducts = allProductsData.filter(product => productIds.includes(product.id));
  return newProducts;
};

const NewProduct = () => {
  const navigate = useNavigate();

  // 使用 TanStack Query 獲取數據 並且針對加載中與加載錯誤進行判別
  const { data: newProducts, error, isLoading } = useQuery({
    queryKey: ['newProductData'],
    queryFn: fetchNewProductData,
  });

  if (isLoading) {
    console.log('Loading...');
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error fetching new product data:', error);
    return <div>Error loading new product data</div>;
  }

  // 當點擊產品時，動態獲取產品詳細數據並跳轉至產品展示頁面
  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    } else {
      console.error('商品ID獲取失敗了');
    }
  };

  return (
    <HomeProductsSection
      labelImage={labelImage}
      products={newProducts}
      handleProductClick={handleProductClick}
    />
  );
};

export default NewProduct;