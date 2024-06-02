import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSortOrder } from '../../productSlice';
import {
  FilterSortContainer,
  FilterButtons,
  FilterButton,
  SortSelect
} from './style';

const FilterSort = () => {
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState('default');

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    dispatch(updateSortOrder(order));
  };

  return (
    <FilterSortContainer>
      <FilterButtons>
        <FilterButton onClick={() => dispatch(updateSortOrder('bestseller'))}>暢銷排行</FilterButton>
        <FilterButton onClick={() => dispatch(updateSortOrder('new'))}>新上架</FilterButton>
      </FilterButtons>
      <SortSelect name="price-sort" id="price-sort" value={sortOrder} onChange={handleSortChange}>
        <option value="default">預設</option>
        <option value="high-to-low">價格由高至低</option>
        <option value="low-to-high">價格由低至高</option>
      </SortSelect>
    </FilterSortContainer>
  );
};

export default FilterSort;
