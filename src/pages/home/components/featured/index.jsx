import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeatured } from '../../homeSlice';
import { useNavigate } from 'react-router-dom';
import { FeaturedContainer, FeaturedItem, FeaturedImage } from './style';

const Featured = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { featured, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchFeatured());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading featured data</div>;
  }

  const handleFeaturedClick = (productIds) => {
    if (productIds) {
      navigate(`/products?ids=${productIds.join(',')}`);
    } else {
      console.error('No product IDs available');
    }
  };

  return (
    <FeaturedContainer>
      {featured.map((item) => (
        <FeaturedItem key={item.id}>
          {item.images.map((image, idx) => (
            <FeaturedImage key={idx} src={image.url} onClick={() => handleFeaturedClick(item.productIds)} />
          ))}
        </FeaturedItem>
      ))}
    </FeaturedContainer>
  );
};

export default Featured;