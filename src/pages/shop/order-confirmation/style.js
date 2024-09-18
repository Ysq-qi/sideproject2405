import styled from 'styled-components';

export const ConfirmationContainer = styled.div`
  width: 1200px;
  margin: auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const InfoBlock = styled.section`
  background-color: #fff;
  color: #333;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const InfoTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  background-color: #f0f0f0;
  padding: 20px;
  margin: 20px;
  margin-bottom: 15px;
`;

export const InfoContent = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 50px;
  margin-bottom: 15px;
`;

export const DataLabel = styled.label`
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
`;

export const DataValue = styled.span`
  font-size: 18px;
`;

export const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; // 可根據需要調整上邊距
`;

export const ProductTable = styled.table`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  text-align: center;
`;

export const TableHeader = styled.th`
  background-color: #000;
  color: #fff;
  padding: 15px;
  text-align: center;
`;

export const TableCell = styled.td`
  padding: 20px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;
