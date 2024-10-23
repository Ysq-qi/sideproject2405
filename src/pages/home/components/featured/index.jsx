import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FeaturedContainer, FeaturedItem, FeaturedImage } from './style';

const Featured = ({ featured }) => {
  const navigate = useNavigate();

  const handleFeaturedClick = (featuredId) => {
    navigate(`/products/${featuredId}`);
  };

  return (
    <FeaturedContainer>
      {featured.map((item) => (
        <FeaturedItem key={item.id}>
          {item.images.map((image, idx) => (
            <FeaturedImage 
              key={idx} 
              src={image.url} 
              alt={`Featured ${item.id} - ${idx + 1}`} 
              onClick={() => handleFeaturedClick(item.id)}
            />
          ))}
        </FeaturedItem>
      ))}
    </FeaturedContainer>
  );
};

export default Featured;