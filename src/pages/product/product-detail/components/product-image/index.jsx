import React, { useState, useCallback } from 'react';
import { ImageContainer, ThumbnailContainer, Thumbnail, MainImage } from './style';
import { handleError } from '../../../../../utils/error/errorHandler';

const ProductDetailImage = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageError = useCallback(() => {
    handleError('image', new Error('圖片載入失敗'));
  }, []);

  if (!images || images.length === 0) {
    return <div> 載入圖片時發生錯誤。</div>;
  }

  return (
    <ImageContainer>
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
    </ImageContainer>
  );
};

export default ProductDetailImage;