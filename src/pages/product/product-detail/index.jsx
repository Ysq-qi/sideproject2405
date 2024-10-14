import React, { useEffect } from 'react';
import { ProductDetailContainer } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetail } from './productDetailSlice';
import Breadcrumb from './components/breadcrumb';
import ProductDetailImage from './components/product-image';
import ProductDetailInfo from './components/product-info';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product, isLoading, isError, error } = useSelector((state) => state.productDetail);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetail(productId));
    }
  }, [dispatch, productId]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <ProductDetailContainer>
      <Breadcrumb breadcrumb={product.breadcrumb} />
      <ProductDetailImage images={product.images} />
      <ProductDetailInfo product={product} />
    </ProductDetailContainer>
  );
};

export default ProductDetail;