import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FeaturedContainer,
  FeaturedItem,
  FeaturedImage
} from './style';

const Featured = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/home/featured')
      .then(response => {
        setFeaturedItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching featured data:', error);
      });
  }, []);

  const handleFeaturedClick = (productIds) => {
    navigate(`/products?ids=${productIds.join(',')}`);
  };

  return (
    <FeaturedContainer>
      <FeaturedItem>
        {featuredItems.map((item, index) => (
          <FeaturedImage 
            key={index} 
            src={item.image} 
            alt={`Product ${index + 1}`} 
            onClick={() => handleFeaturedClick(item.productIds)} 
          />
        ))}
      </FeaturedItem>
    </FeaturedContainer>
  );
};

export default Featured;