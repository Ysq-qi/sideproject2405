import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSortOrder, resetSortOrder } from '../../productSlice';
import {
  FilterSortContainer,
  FilterButtons,
  FilterButton,
  SortSelect,
} from './style';

const FilterSort = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector((state) => state.product.sortOrder);

  const handleSortChange = useCallback(
    (e) => {
      const order = e.target.value;
      dispatch(updateSortOrder(order));
    },
    [dispatch]
  );

  useEffect(() => {
    // 當元件卸載時重置排序狀態
    return () => {
      dispatch(resetSortOrder());
    };
  }, [dispatch]);

  return (
    <FilterSortContainer>
      <FilterButtons>
        <FilterButton onClick={() => dispatch(updateSortOrder('bestseller'))}>
          暢銷排行
        </FilterButton>
        <FilterButton onClick={() => dispatch(updateSortOrder('new'))}>
          新上架
        </FilterButton>
      </FilterButtons>
      <SortSelect value={sortOrder} onChange={handleSortChange}>
        <option value="default">預設</option>
        <option value="high-to-low">價格由高至低</option>
        <option value="low-to-high">價格由低至高</option>
      </SortSelect>
    </FilterSortContainer>
  );
};

export default FilterSort;