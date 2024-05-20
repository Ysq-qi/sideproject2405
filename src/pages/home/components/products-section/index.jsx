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

const HomeProductsSection = ({ labelImage, products }) => {
  return (
    <HomeSectionContainer>
      <HomeSectionLabelContainer>
        <HomeSectionLabelImage src={labelImage} alt="商品分類" />
      </HomeSectionLabelContainer>
      <HomeProductGrid>
        {products.map((product, index) => (
          <HomeProductItem key={index}>
            <HomeProductImage src={product.image} alt={product.name} />
            <HomeProductInfo>{product.name}</HomeProductInfo>
            <HomeProductPrice>{product.price}</HomeProductPrice>
          </HomeProductItem>
        ))}
      </HomeProductGrid>
    </HomeSectionContainer>
  );
};

export default HomeProductsSection;
