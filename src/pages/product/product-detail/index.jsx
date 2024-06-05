import React from 'react';
import { ProductDetailContainer } from './style';
import Breadcrumb from './components/breadcrumb';
import ProductDetailImage from './components/product-image';
import ProductDetailInfo from './components/product-info';

const ProductDetail = () => {
  return (
    <ProductDetailContainer>
      <Breadcrumb />
      <ProductDetailImage />
      <ProductDetailInfo />
    </ProductDetailContainer>
  );
}

export default ProductDetail;