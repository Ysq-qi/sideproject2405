import React from 'react';
import {
  CategoryContainer,
  CategoryListUl,
  CategoryListItem
} from './style';

const CategoryList = ({ categories, handleCategoryChange }) => {
  return (
    <CategoryContainer>
      <CategoryListUl>
        {categories.map((category, index) => (
          <CategoryListItem
            key={index}
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