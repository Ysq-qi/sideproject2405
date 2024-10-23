import styled from 'styled-components';

export const ProductListContainer = styled.div`
  width: 1100px;
  position: absolute;
  top: 110px;
  right: 50px;
  height: 1000px;
  flex-grow: 1;
  z-index: 1;
  margin-left: 250px;
`;

export const ProductGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 20px;
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
  background-color: ${(props) => (props.$active ? '#ddd' : '#f0f0f0')};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;