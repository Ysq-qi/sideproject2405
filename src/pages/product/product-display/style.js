import styled from 'styled-components';

export const ProductDisplayContainer = styled.div`
  width: 1400px; 
  display: flex;
  flex-direction: column; 
  align-items: center; 
  min-height: 100vh; 
  position: relative;
  margin: 0 auto ;
`;

export const ProductGrid = styled.div`
  width: 1100px;
  position: absolute;
  top: 110px;
  right: 50px;
  height: 1000px;
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-around;
  padding-top: 50px;
  margin-left: 250px;
  z-index: 1;
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