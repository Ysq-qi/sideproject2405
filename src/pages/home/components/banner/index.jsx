import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { CarouselContainer } from './style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// 定義一個異步函數來獲取商品數據
const fetchBannerData = async () => {
  const { data } = await axios.get('http://localhost:3001/api/home/banner');
  return data;
};

const Banner = () => {
  const navigate = useNavigate();
  
  //使用Tanstack query獲取數據 並且針對加載中與加載錯誤進行判別
  const { data: banners, error, isLoading } = useQuery({
    queryKey: ['bannerData'],
    queryFn: fetchBannerData,
  });

  if (isLoading) {
    console.log('Loading...');
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error fetching banner data:', error);
    return <div>Error loading banner data</div>;
  }

  //當滑鼠點擊banner圖片時 跳轉至ProductDisplay組件 並且是banner圖片上標記的商品資訊ID
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
            <img src={banner.image} className="d-block w-100" alt={`Slide ${index + 1}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default Banner;