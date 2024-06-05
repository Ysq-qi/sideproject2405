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

const HomeProductsSection = ({ labelImage, products, handleProductClick }) => {
  return (
    <HomeSectionContainer>
      <HomeSectionLabelContainer>
        <HomeSectionLabelImage src={labelImage} alt="商品分類" />
      </HomeSectionLabelContainer>
      <HomeProductGrid>
        {products.map((product) => (
          <HomeProductItem key={product.id}>
            <HomeProductImage
              src={product.image}
              alt={product.name}
              onClick={() => handleProductClick(product.id)}
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
