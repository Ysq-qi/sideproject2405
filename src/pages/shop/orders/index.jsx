import React from 'react';
import { 
  Container, 
  Table, 
  TableHeader, 
  TableRow, 
  TableCell, 
  NoOrderData 
} from './style';

const Orders = () => {
  return (
    <Container>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>訂單編號</TableHeader>
            <TableHeader>訂單日期</TableHeader>
            <TableHeader>狀態</TableHeader>
            <TableHeader>寄送方式</TableHeader>
            <TableHeader>寄送日期</TableHeader>
            <TableHeader>寄送編號</TableHeader>
            <TableHeader>付款狀態</TableHeader>
            <TableHeader>備註</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          <TableRow>
            <TableCell colSpan="8">
              <NoOrderData>[無訂單資料]</NoOrderData>
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    </Container>
  );
};

export default Orders;
