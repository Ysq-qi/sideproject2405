import React from 'react';
// import { Carousel } from 'react-bootstrap'; 這種寫法會導致SSRProvider.mjs.map該檔案缺失錯誤 必須改成import Carousel from 'react-bootstrap/Carousel react-bootstrap套件問題 2024/5/17
import Carousel from 'react-bootstrap/Carousel';
import { CarouselContainer } from './style';
import image1 from '../../../../assets/images/pages/home/banner/001.jpg';
import image2 from '../../../../assets/images/pages/home/banner/002.jpg';
import image3 from '../../../../assets/images/pages/home/banner/003.jpg';
import image4 from '../../../../assets/images/pages/home/banner/004.jpg';
import image5 from '../../../../assets/images/pages/home/banner/005.jpg';

const Banner = () => {
  return (
    <CarouselContainer>
      { /* 利用Bootstrap的輪播(Carousel)功能 與 react-bootstrap套件的Carousel與Carousel.Item標籤 */ }
      <Carousel>
        <Carousel.Item>
          <img src={image1} className="d-block w-100" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image2} className="d-block w-100" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image3} className="d-block w-100" alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image4} className="d-block w-100" alt="Fourth slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image5} className="d-block w-100" alt="Fifth slide" />
        </Carousel.Item>
      </Carousel>
    </CarouselContainer>
  );
};

export default Banner;
