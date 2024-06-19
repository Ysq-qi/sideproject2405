import React from 'react';
import { ProductDetailContainer } from './style';
import { useLocation, matchPath } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Breadcrumb from './components/breadcrumb';
import ProductDetailImage from './components/product-image';
import ProductDetailInfo from './components/product-info';
import axios from 'axios';

const fetchProductDetails = async ({ queryKey }) => {
  const [ , id] = queryKey;
  const response = await axios.get('http://localhost:3001/api/products', {
    params: { ids: id },
  });
  return response.data[0];
};

const ProductDetail = () => {
  const location = useLocation();
  const match = matchPath('/product/:productId', location.pathname);
  const productId = match ? match.params.productId : null;

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['productDetail', productId],
    queryFn: fetchProductDetails,
    enabled: !!productId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
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