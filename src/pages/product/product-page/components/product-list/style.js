import styled from 'styled-components';

export const ProductListContainer = styled.div`
  width: 1100px;
  position: absolute;
  top: 110px; // 確保不與 FilterSortContainer 重疊
  right: 50px; 
  height: 1000px;
  flex-grow: 1; // 讓產品列表容器佔據剩餘的垂直空間
  z-index: 1; // 設置層級，確保它在 CategoryContainer 之下
  margin-left: 250px; // 設置左側的 margin 確保不與 CategoryContainer 重疊
`;

export const ProductGrid = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 50px;
`;

export const ProductItem = styled.div`
  width: 200px;
  margin: 10px;
  text-align: center;
  color: black;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
`;

export const ProductInfo = styled.div`
  margin-top: 10px;
`;

export const ProductPrice = styled.div`
  margin-top: 5px;
  color: red;
`;

export const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
`;
