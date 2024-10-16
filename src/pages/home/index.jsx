// home/index.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeContainer } from './style';
import Banner from './components/banner';
import Featured from './components/featured';
import NewProduct from './components/new-products';
import FocusProduct from './components/focus-products';
import { fetchBanner, fetchFeatured, fetchNewProducts, fetchFocusProducts, fetchProductsByIds } from './homeSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { 
    banners,
    featured,
    newProducts,
    focusProducts,
    newProductDetails,
    focusProductDetails,
    error,
  } = useSelector((state) => state.home);

  useEffect(() => {
    // 發送所有的資料請求
    dispatch(fetchBanner());
    dispatch(fetchFeatured());
    dispatch(fetchNewProducts());
    dispatch(fetchFocusProducts());
  }, [dispatch]);

  // 當 newProducts 資料加載後，獲取其詳細資料
  useEffect(() => {
    if (newProducts?.productIds?.length > 0) {
      dispatch(fetchProductsByIds({ productIds: newProducts.productIds, type: 'new' }));
    }
  }, [dispatch, newProducts]);

  // 當 focusProducts 資料加載後，獲取其詳細資料
  useEffect(() => {
    if (focusProducts?.productIds?.length > 0) {
      dispatch(fetchProductsByIds({ productIds: focusProducts.productIds, type: 'focus' }));
    }
  }, [dispatch, focusProducts]);

  // 檢查是否所有資料都已加載
  const isLoading = !banners || !featured || !newProductDetails || !focusProductDetails;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>加載數據時出錯：{error}</div>;
  }

  return (
    <HomeContainer>
      <Banner banners={banners} />
      <Featured featured={featured} />
      <NewProduct products={newProductDetails} />
      <FocusProduct products={focusProductDetails} />
    </HomeContainer>
  );
}

export default Home;