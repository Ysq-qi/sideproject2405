import React, { useState } from 'react';
import { ImageWrapper, ThumbnailContainer, Thumbnail, MainImage,  } from './style';

const ProductDetailImage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testImages = [
    { background: 'red' },
    { background: 'green' },
    { background: 'blue' },
  ];

  return (
    <ImageWrapper>
      <MainImage style={{ backgroundColor: testImages[activeIndex].background }} />
      <ThumbnailContainer>
        {testImages.map((image, index) => (
          <Thumbnail
            key={index}
            style={{ backgroundColor: image.background }}
            onMouseEnter={() => setActiveIndex(index)}
          />
        ))}
      </ThumbnailContainer>
    </ImageWrapper>
  );
};

export default ProductDetailImage;