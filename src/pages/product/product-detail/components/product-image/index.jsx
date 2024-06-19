import React, { useState } from 'react';
import { ImageContainer, ThumbnailContainer, Thumbnail, MainImage } from './style';

const ProductDetailImage = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div>Error loading images or no images available.</div>;
  }

  const handleImageError = (e) => {
    e.target.src = '/path/to/placeholder/image.png';
    console.error("Image load error", e.target.src);
  };

  return (
    <ImageContainer>
      <MainImage>
        <img
          src={`http://localhost:3000/${images[activeIndex].url}`}
          alt={`Product ${activeIndex + 1}`}
          onError={handleImageError}
        />
      </MainImage>
      <ThumbnailContainer>
        {images.map((image, index) => (
          <Thumbnail key={index} onMouseEnter={() => setActiveIndex(index)}>
            <img src={`http://localhost:3000/${image.url}`} alt={`Thumbnail ${index + 1}`} onError={handleImageError} />
          </Thumbnail>
        ))}
      </ThumbnailContainer>
    </ImageContainer>
  );
};

export default ProductDetailImage;