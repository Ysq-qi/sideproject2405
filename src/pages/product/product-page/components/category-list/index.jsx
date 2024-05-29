import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../productSlice';
import {
  CategoryContainer,
  CategoryListUl,
  CategoryListItem
} from './style';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);

  return (
    <CategoryContainer>
      <CategoryListUl>
        {categories.map((category, index) => (
          <CategoryListItem key={index} onClick={() => dispatch(updateCategory(category))}>
            {category}
          </CategoryListItem>
        ))}
      </CategoryListUl>
    </CategoryContainer>
  );
};

export default CategoryList;