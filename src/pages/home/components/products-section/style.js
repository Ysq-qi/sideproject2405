import styled from 'styled-components';

export const HomeSectionContainer = styled.div`
  width: 1200px;
  height: 320px;
  position: relative;
  margin: 20px 100px;
`;

export const HomeSectionLabelContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const HomeSectionLabelImage = styled.img`
  width: 70px;
  height: 30px;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
`;

export const HomeProductGrid = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 50px;
`;

export const HomeProductItem = styled.div`
  width: 200px;
  margin: 10px;
  text-align: center;
  color: black;
`;

export const HomeProductImage = styled.img`
  width: 100%;
  height: 200px;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
`;

export const HomeProductInfo = styled.div`
  margin-top: 10px;
`;

export const HomeProductPrice = styled.div`
  margin-top: 5px;
  color: red;
`;