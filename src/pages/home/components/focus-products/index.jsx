import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeProductsSection from '../products-section';
import { fetchFocusProducts, fetchProductsByIds } from '../../homeSlice';
import labelImage from '../../../../assets/images/home/focus-products/focus.png';
import { useNavigate } from 'react-router-dom';

const FocusProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { focusProducts, focusProductDetails, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchFocusProducts());
  }, [dispatch]);

  // 根據 focusProducts.productIds 獲取產品詳細資料
  useEffect(() => {
    if (focusProducts?.productIds?.length > 0) {
      dispatch(fetchProductsByIds({ productIds: focusProducts.productIds, type: 'focus' }));
    }
  }, [dispatch, focusProducts]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading focus product data</div>;
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <HomeProductsSection
      labelImage={labelImage}
      products={focusProductDetails}
      handleProductClick={handleProductClick}
    />
  );
};

export default FocusProduct;