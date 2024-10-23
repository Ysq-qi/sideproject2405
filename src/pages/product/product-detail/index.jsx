import React from 'react';
import { ProductDetailContainer } from './style';
import Breadcrumb from './components/breadcrumb';
import ProductDetailImage from './components/product-image';
import ProductDetailInfo from './components/product-info';
import useProductDetail from './hooks/useProductDetail';

const ProductDetail = () => {
  const { product, isLoading, isError, error } = useProductDetail();

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