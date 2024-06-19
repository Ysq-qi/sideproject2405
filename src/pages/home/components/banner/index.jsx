import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { CarouselContainer } from './style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchBannerData = async () => {
  const { data } = await axios.get('http://localhost:3001/api/home/banner');
  return data;
};

const Banner = () => {
  const navigate = useNavigate();
  const { data: banners, error, isLoading } = useQuery({
    queryKey: ['bannerData'],
    queryFn: fetchBannerData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading banner data</div>;
  }

  const handleBannerClick = (productIds) => {
    if (productIds && productIds.length > 0) {
      navigate(`/products?ids=${productIds.join(',')}`);
    } else {
      console.error('商品ID獲取失敗了');
    }
  };

  return (
    <CarouselContainer>
      <Carousel>
        {banners.map((banner, index) => (
          <Carousel.Item key={index} onClick={() => handleBannerClick(banner.productIds)}>
            {banner.images.map((image, idx) => (
              <img key={idx} src={image} className="d-block w-100" alt={`Slide ${index + 1} - ${idx + 1}`} />
            ))}
          </Carousel.Item>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default Banner;