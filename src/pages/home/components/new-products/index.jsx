import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeProductsSection from '../products-section';
import { fetchNewProducts, fetchProductsByIds } from '../../homeSlice';
import labelImage from '../../../../assets/images/home/new-products/new.png';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newProducts, newProductDetails, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchNewProducts());
  }, [dispatch]);

  // 根據 newProducts.productIds 獲取產品詳細資料
  useEffect(() => {
    if (newProducts?.productIds?.length > 0) {
      dispatch(fetchProductsByIds({ productIds: newProducts.productIds, type: 'new' }));
    }
  }, [dispatch, newProducts]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading new product data</div>;
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <HomeProductsSection
      labelImage={labelImage}
      products={newProductDetails}
      handleProductClick={handleProductClick}
    />
  );  
};

export default NewProduct;