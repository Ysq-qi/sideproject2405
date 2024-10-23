import React from 'react';
import {
  CategoryContainer,
  CategoryListUl,
  CategoryListItem,
} from './style';
import { useSelector } from 'react-redux';

const CategoryList = ({ categories, handleCategoryChange }) => {
  const { selectedCategory } = useSelector((state) => state.product);

  return (
    <CategoryContainer>
      <CategoryListUl>
        {categories.map((category, index) => (
          <CategoryListItem
            key={index}
            $active={category === selectedCategory}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </CategoryListItem>
        ))}
      </CategoryListUl>
    </CategoryContainer>
  );
};

export default CategoryList;