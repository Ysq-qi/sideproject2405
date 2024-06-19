import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import HomeProductsSection from '../products-section';
import labelImage from '../../../../assets/images/home/new-products/new.png';
import { useNavigate } from 'react-router-dom';

const fetchNewProductData = async () => {
  const { data: newProductData } = await axios.get('http://localhost:3001/api/home/newproduct');
  
  if (!newProductData.length) {
    throw new Error('No new product data found');
  }
  
  const productIds = newProductData[0].productIds;
  const { data: allProductsData } = await axios.get('http://localhost:3001/api/products/all');
  const newProducts = allProductsData.filter(product => productIds.includes(product.id));
  return newProducts;
};

const NewProduct = () => {
  const navigate = useNavigate();
  const { data: newProducts, error, isLoading } = useQuery({
    queryKey: ['newProductData'],
    queryFn: fetchNewProductData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading new product data</div>;
  }

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