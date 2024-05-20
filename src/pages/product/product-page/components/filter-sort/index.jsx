import React from 'react';
import { 
  FilterSortContainer,
  FilterButtons,
  FilterButton,
  SortSelect
 } from './style';

const FilterSort = ({ setSortOrder }) => {
  return (
  <FilterSortContainer>
    <FilterButtons>
      <FilterButton>推薦排行</FilterButton>
      <FilterButton>新上架</FilterButton>
    </FilterButtons>
    <SortSelect name="price-sort" id="price-sort" onChange={(e) => setSortOrder(e.target.value)}>
      <option value="high-to-low">價格由高至低</option>
      <option value="low-to-high">價格由低至高</option>
    </SortSelect>
  </FilterSortContainer>
  );
};

export default FilterSort;
