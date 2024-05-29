import styled from 'styled-components';

export const CategoryContainer = styled.div`
  width: 200px;
  height: 1000px;
  position: absolute;
  top: 50px;
  left: 0px;
  z-index: 2; // 設置層級2
`;

export const CategoryListUl = styled.ul`
  list-style: none;
  padding: 0;
`;

export const CategoryListItem = styled.li`
  width: 150px;
  height: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
