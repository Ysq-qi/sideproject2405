import React from 'react';
import {
  HomeSectionContainer,
  HomeSectionLabelContainer,
  HomeSectionLabelImage,
  HomeProductGrid,
  HomeProductItem,
  HomeProductImage,
  HomeProductInfo,
  HomeProductPrice
} from './style';
import { useNavigate } from 'react-router-dom';

const HomeProductsSection = ({ labelImage, products }) => {
  const navigate = useNavigate();

  const handleProductClick = (productIds) => {
    navigate(`/products?ids=${productIds.join(',')}`);
  };

  return (
    <HomeSectionContainer>
      <HomeSectionLabelContainer>
        <HomeSectionLabelImage src={labelImage} alt="商品分類" />
      </HomeSectionLabelContainer>
      <HomeProductGrid>
        {products.map((product, index) => (
          <HomeProductItem key={index}>
            <HomeProductImage
              src={product.image}
              alt={product.name}
              onClick={() => handleProductClick(product.productIds)}
            />
            <HomeProductInfo>{product.name}</HomeProductInfo>
            <HomeProductPrice>{product.price}</HomeProductPrice>
          </HomeProductItem>
        ))}
      </HomeProductGrid>
    </HomeSectionContainer>
  );
};

export default HomeProductsSection;