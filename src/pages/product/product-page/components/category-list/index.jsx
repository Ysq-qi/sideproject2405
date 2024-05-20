import React from 'react';
import {
  CategoryContainer,
  CategoryHeader,
  CategoryListUl,
  CategoryListItem
} from './style';

const CategoryList = () => {
  const categories = [
    '週更外套/夾克',
    '浪子/工裝襯衫',
    '工裝/西裝/九分寬褲',
    '寬褲/錐形褲/軍褲',
    '日系開襟道袍',
    '機能工裝背心'
  ];

  return (
    <CategoryContainer>
      <CategoryHeader>2024更新穿搭</CategoryHeader>
      <CategoryListUl>
        {categories.map((category, index) => (
          <CategoryListItem key={index}>{category}</CategoryListItem>
        ))}
      </CategoryListUl>
    </CategoryContainer>
  );
};

export default CategoryList;
