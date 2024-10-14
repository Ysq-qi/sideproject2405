import React, { useEffect } from 'react';
import { CarouselContainer } from './style';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanner } from '../../homeSlice';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { banners, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading banner data</div>;
  }

  const handleBannerClick = (productIds) => {
    if (productIds) {
      navigate(`/products?ids=${productIds.join(',')}`);
    } else {
      console.error('No product IDs available');
    }
  };

  return (
    <CarouselContainer>
      <Carousel>
        {banners.map((banner) => (
          <Carousel.Item key={banner.id} onClick={() => handleBannerClick(banner.productIds)}>
            {banner.images.map((image, idx) => (
              <img key={idx} src={image.url} className="d-block w-100" alt={`Slide ${banner.id} - ${idx + 1}`} />
            ))}
          </Carousel.Item>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default Banner;