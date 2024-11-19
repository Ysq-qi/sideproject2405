import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetail, resetProductDetail } from '../productDetailSlice';
import { handleError } from '../../../../utils/error/errorHandler';

const useProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product, isLoading, isError, error } = useSelector((state) => state.productDetail);

  useEffect(() => {
    // 調用 fetchProductDetail 以加載商品詳情
    if (productId) {
      dispatch(fetchProductDetail(productId)).catch((error) =>
        handleError('api', error)
      );
    }

    // 清理階段：當組件卸載時重置商品數據
    return () => {
      dispatch(resetProductDetail());
    };
  }, [dispatch, productId]);

  return {
    product,
    isLoading,
    isError,
    error,
  };
};

export default useProductDetail;