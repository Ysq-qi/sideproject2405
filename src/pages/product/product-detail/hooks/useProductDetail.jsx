import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetail } from '../productDetailSlice';
import { handleError } from '../../../../utils/error/errorHandler';

const useProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product, isLoading, isError, error } = useSelector((state) => state.productDetail);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetail(productId)).catch((error) =>
        handleError('api', error)
      );
    }
  }, [dispatch, productId]);

  return {
    product,
    isLoading,
    isError,
    error,
  };
};

export default useProductDetail;