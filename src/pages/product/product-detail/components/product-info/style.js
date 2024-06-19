import styled from 'styled-components';

export const InfoContainer = styled.div`
  flex: 1;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 15px;
  color: #333;
`;

export const Price = styled.div`
  font-size: 32px;
  color: red;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  background-color: #ff5252;
  color: #fff;
  padding: 10px 25px;
  margin: 15px 0;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #ff0000;
  }
`;

export const ErrorText = styled.div`
  color: red;
  margin-left: 10px;
`;

export const Section = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
`;

export const Select = styled.select`
  padding: 8px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const Option = styled.option``;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const QuantityButton = styled.button`
  background-color: #ddd;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: #ccc;
  }
`;

export const SizeTable = styled.div`
  width: 400px;
  margin-top: 30px;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  overflow: hidden;
`;

export const SizeHeader = styled.div`
  display: flex;
  background-color: #f8f8f8;
  padding: 10px;
  font-weight: bold;
`;

export const SizeRow = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #eaeaea;

  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`;

export const SizeCell = styled.div`
  flex: 1;
  text-align: center;
`;