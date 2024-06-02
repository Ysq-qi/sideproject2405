import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';  //不能加括號 否則會導致SSRProvider.mjs.map該檔案缺失錯誤 
import { CarouselContainer } from './style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/home/banner')
      .then(response => {
        setBanners(response.data);
      })
      .catch(error => {
        console.error('Error fetching banner data:', error);
      });
  }, []);

  const handleBannerClick = (productIds) => {
    navigate(`/products?ids=${productIds.join(',')}`);
  };

  return (
    <CarouselContainer>
      { /* 利用Bootstrap的輪播(Carousel)功能 與 react-bootstrap套件的Carousel與Carousel.Item標籤 */ }
      <Carousel>
        {banners.map((banner, index) => (
          <Carousel.Item key={index} onClick={() => handleBannerClick(banner.productIds)}>
            <img src={banner.image} className="d-block w-100" alt={`Slide ${index + 1}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default Banner;