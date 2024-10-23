import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBanner,
  fetchFeatured,
  fetchNewProducts,
  fetchFocusProducts,
  fetchProductsByIds,
} from '../homeSlice';
import { handleError } from '../../../utils/error/errorHandler'

const useHome = () => {
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
    // 加載所有首頁資料
    try {
      dispatch(fetchBanner());
      dispatch(fetchFeatured());
      dispatch(fetchNewProducts());
      dispatch(fetchFocusProducts());
    } catch (error) {
      handleError('api', error); // 使用錯誤處理器
    }
  }, [dispatch]);

  // 當 newProducts 資料加載後，獲取詳細資料
  useEffect(() => {
    if (newProducts?.productIds?.length > 0) {
      try {
        dispatch(fetchProductsByIds({ productIds: newProducts.productIds, type: 'new' }));
      } catch (error) {
        handleError('api', error);
      }
    }
  }, [dispatch, newProducts]);

  // 當 focusProducts 資料加載後，獲取詳細資料
  useEffect(() => {
    if (focusProducts?.productIds?.length > 0) {
      try {
        dispatch(fetchProductsByIds({ productIds: focusProducts.productIds, type: 'focus' }));
      } catch (error) {
        handleError('api', error);
      }
    }
  }, [dispatch, focusProducts]);

  const isLoading = !banners || !featured || !newProductDetails || !focusProductDetails;

  return {
    banners,
    featured,
    newProductDetails,
    focusProductDetails,
    isLoading,
    error,
  };
};

export default useHome;