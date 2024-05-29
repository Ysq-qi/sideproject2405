import React from 'react';
import { useDispatch } from 'react-redux';
import { updateSortOrder } from '../../productSlice';
import { 
  FilterSortContainer,
  FilterButtons,
  FilterButton,
  SortSelect
} from './style';

// FilterSort 組件：提供篩選和排序功能
const FilterSort = () => {
  const dispatch = useDispatch();

  const handleSort = (order) => {
    dispatch(updateSortOrder(order)); // 更新排序方式
  };

  return (
    <FilterSortContainer>
      <FilterButtons>
        <FilterButton onClick={() => handleSort('default')}>預設排序</FilterButton>
        <FilterButton onClick={() => handleSort('bestseller')}>暢銷排行</FilterButton>
        <FilterButton onClick={() => handleSort('new')}>新上架</FilterButton>
      </FilterButtons>
      <SortSelect name="price-sort" id="price-sort" onChange={(e) => handleSort(e.target.value)}>
        <option value="high-to-low">價格由高至低</option>
        <option value="low-to-high">價格由低至高</option>
      </SortSelect>
    </FilterSortContainer>
  );
};

export default FilterSort;
