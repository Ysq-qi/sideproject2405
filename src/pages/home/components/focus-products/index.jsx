import React from 'react';
import HomeProductsSection from '../products-section';
import labelImage from '../../../../assets/images/home/focus-products/focus.png';
import { useNavigate } from 'react-router-dom';

const FocusProduct = ({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <HomeProductsSection
      labelImage={labelImage}
      products={products}
      handleProductClick={handleProductClick}
    />
  );
};

export default FocusProduct;