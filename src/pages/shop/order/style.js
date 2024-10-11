import styled from 'styled-components';

export const Container = styled.div`
  width: 1200px;
  margin: auto;
  border: 1px solid #eaeaea;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 36px;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const TableHeader = styled.th`
  background-color: #000;
  color: #fff;
  padding: 15px;
  text-align: center;
`;

export const TableRow = styled.tr`
  cursor: pointer;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  text-align: center;
  border: 1px solid #ddd;
  padding: 15px;
`;

export const ProductTable = styled.table`
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
`;

export const ExpandableRow = styled.tr`
  background-color: #fafafa;
`;

export const NoOrderData = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
`;