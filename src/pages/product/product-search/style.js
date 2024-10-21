import styled from 'styled-components';

export const ProductSearchContainer = styled.div`
  width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;
  margin: 0 auto;
`;

export const ProductGrid = styled.div`
  width: 1100px;
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 欄 */
  flex-wrap: wrap; 
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
  margin-top: 30px; /* 與商品區域保持間距 */
  display: flex;
  justify-content: center;
  width: 100%; /* 讓分頁按鈕占滿寬度 */
  position: relative; /* 保持正常流佈局 */
`;

export const PageButton = styled.button`
  margin: 0 5px;
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? '#ddd' : '#f0f0f0')};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;