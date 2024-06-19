import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import HomeProductsSection from '../products-section';
import labelImage from '../../../../assets/images/home/focus-products/focus.png';
import { useNavigate } from 'react-router-dom';

const fetchFocusProductData = async () => {
  const { data: focusProductData } = await axios.get('http://localhost:3001/api/home/focusproduct');
  const productIds = focusProductData[0].productIds;

  const { data: allProductsData } = await axios.get('http://localhost:3001/api/products/all');
  const focusProducts = allProductsData.filter(product => productIds.includes(product.id));
  return focusProducts;
};

const FocusProduct = () => {
  const navigate = useNavigate();
  const { data: focusProducts, error, isLoading } = useQuery({
    queryKey: ['focusProductData'],
    queryFn: fetchFocusProductData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading focus product data</div>;
  }

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