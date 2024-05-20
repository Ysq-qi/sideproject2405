import styled from 'styled-components';

export const FilterSortContainer = styled.div`
  width: 1100px;
  height: 50px;
  position: absolute;
  top: 0; 
  right: 0;
  display: flex;
  justify-content: space-between;
  margin: 50px 50px 100px 250px; 
  z-index: 3; // 設置層級3確保它在最上層
`;

export const FilterButtons = styled.div`
  display: flex;
`;

export const FilterButton = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
`;

export const SortSelect = styled.select`
  padding: 10px;
`;
