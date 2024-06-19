import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FeaturedContainer, FeaturedItem, FeaturedImage } from './style';

const fetchFeaturedData = async () => {
  const { data } = await axios.get('http://localhost:3001/api/home/featured');
  return data;
};

const Featured = () => {
  const navigate = useNavigate();
  const { data: featuredItems, error, isLoading } = useQuery({
    queryKey: ['featuredData'],
    queryFn: fetchFeaturedData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading featured data</div>;
  }

  const handleFeaturedClick = (productIds) => {
    if (productIds && productIds.length > 0) {
      navigate(`/products?ids=${productIds.join(',')}`);
    } else {
      console.error('商品ID獲取失敗了');
    }
  };

  return (
    <FeaturedContainer>
      {featuredItems.map((item, index) => (
        <FeaturedItem key={index}>
          {item.images.map((image, idx) => (
            <FeaturedImage 
              key={idx}
              src={image} 
              alt={`Product ${index + 1} - ${idx + 1}`} 
              onClick={() => handleFeaturedClick(item.productIds)} 
            />
          ))}
        </FeaturedItem>
      ))}
    </FeaturedContainer>
  );
};

export default Featured;