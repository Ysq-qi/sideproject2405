import styled from 'styled-components';

export const InfoContainer = styled.div`
  flex: 1;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const Price = styled.div`
  font-size: 28px;
  color: red;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  background-color: red;
  color: #fff;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  cursor: pointer;
`;

export const Section = styled.div`
  margin: 10px 0;
`;

export const Select = styled.select`
  padding: 5px;
  margin-left: 10px;
`;

export const Option = styled.option``;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

export const QuantityButton = styled.button`
  background-color: #ddd;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

export const SizeTable = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
`;

export const SizeHeader = styled.div`
  display: flex;
  background-color: #f8f8f8;
  padding: 10px;
`;

export const SizeRow = styled.div`
  display: flex;
  padding: 10px;
`;

export const SizeCell = styled.div`
  flex: 1;
  text-align: center;
`;
