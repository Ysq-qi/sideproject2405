import React from 'react';
import { CarouselContainer } from './style';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';

const Banner = ({ banners }) => {
  const navigate = useNavigate();

  const handleBannerClick = (bannerId) => {
    navigate(`/products/${bannerId}`);
  };

  return (
    <CarouselContainer>
      <Carousel>
        {banners.map((banner) => (
          <Carousel.Item key={banner.id} onClick={() => handleBannerClick(banner.id)}>
            {banner.images.map((image, idx) => (
              <img 
                key={idx} 
                src={image.url} 
                className="d-block w-100" 
                alt={`Slide ${banner.id} - ${idx + 1}`} 
              />
            ))}
          </Carousel.Item>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default Banner;