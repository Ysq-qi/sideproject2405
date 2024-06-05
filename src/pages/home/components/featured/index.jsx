import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { 
  FeaturedContainer,
  FeaturedItem,
  FeaturedImage
} from './style';

// 定義一個異步函數來獲取精選商品數據
const fetchFeaturedData = async () => {
  const { data } = await axios.get('http://localhost:3001/api/home/featured');
  return data;
};

const Featured = () => {
  const navigate = useNavigate();
  
  // 使用 TanStack Query 獲取數據 並且針對加載中與加載錯誤進行判別
  const { data: featuredItems, error, isLoading } = useQuery({
    queryKey: ['featuredData'],
    queryFn: fetchFeaturedData,
  });

  if (isLoading) {
    console.log('Loading...');
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error fetching featured data:', error);
    return <div>Error loading featured data</div>;
  }

  // 當點擊精選商品時，跳轉至 ProductDisplay 組件，並且傳遞商品資訊 ID
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
          <FeaturedImage 
            src={item.image} 
            alt={`Product ${index + 1}`} 
            onClick={() => handleFeaturedClick(item.productIds)} 
          />
        </FeaturedItem>
      ))}
    </FeaturedContainer>
  );
};

export default Featured;