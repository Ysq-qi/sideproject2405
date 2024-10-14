import React, { useState } from 'react';
import { ImageContainer, ThumbnailContainer, Thumbnail, MainImage } from './style';

const ProductDetailImage = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageError, setImageError] = useState(false); 

  if (!images || images.length === 0) {
    return <div>Error loading images or no images available.</div>;
  }

  const handleImageError = () => {
    setImageError(true); 
  };

  return (
    <ImageContainer>
      {!imageError ? (
        <>
          <MainImage>
            <img
              src={images[activeIndex].url}
              alt={`Product ${activeIndex + 1}`}
              onError={handleImageError}
            />
          </MainImage>
          <ThumbnailContainer>
            {images.map((image, index) => (
              <Thumbnail key={index} onMouseEnter={() => setActiveIndex(index)}>
                <img src={image.url} alt={`Thumbnail ${index + 1}`} onError={handleImageError} />
              </Thumbnail>
            ))}
          </ThumbnailContainer>
        </>
      ) : (
        <div> 圖片加載失敗 </div> 
      )}
    </ImageContainer>
  );
};

export default ProductDetailImage;
