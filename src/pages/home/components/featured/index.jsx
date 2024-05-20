import React from 'react';
import { 
  FeaturedContainer,
  FeaturedItem,
  FeaturedImage
 } from './style';
 import image1 from '../../../../assets/images/pages/featured/001.jpg';
 import image2 from '../../../../assets/images/pages/featured/002.jpg';
 import image3 from '../../../../assets/images/pages/featured/003.jpg';

const Featured = () => {
  return (
  <FeaturedContainer>
    <FeaturedItem>
      <FeaturedImage src={image1} alt="Product 1" />
      <FeaturedImage src={image2} alt="Product 2" />
      <FeaturedImage src={image3} alt="Product 3" />
    </FeaturedItem>
  </FeaturedContainer>
  );
};

export default Featured;