import styled from 'styled-components';

export const CartContainer = styled.div`
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
  font-weight: bold;
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
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  text-align: center;
  border: 1px solid #ddd;
  padding: 15px;
`;

export const SummaryContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
`;

export const Section = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`;

export const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export const Input = styled.input`
  width: 50px;
  text-align: center;
`;

export const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;