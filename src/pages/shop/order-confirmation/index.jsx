import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ConfirmationContainer,
  InfoBlock,
  InfoTitle,
  InfoContent,
  DataRow,
  DataLabel,
  DataValue,
  Button,
  ButtonGroup,
  SectionTitle,
  ProductTable,
  TableRow,
  TableHeader,
  TableCell,
  ProductImage
} from './style';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  // 模擬的訂單資料
  const orderDetails = {
    orderNumber: 'ORD123456',
    orderAmount: '3500 元',
    paymentMethod: '貨到付款',
    receiverName: '游先生',
    receiverAddress: '台灣台中'
  };

  // 模擬的購物車商品資料
  const cartItems = [
    {
      id: 'P001',
      name: '商品 1',
      color: '紅色',
      size: 'M',
      quantity: 2,
      price: 1000,
      imageUrl: 'https://via.placeholder.com/100',
    },
    {
      id: 'P002',
      name: '商品 2',
      color: '藍色',
      size: 'L',
      quantity: 1,
      price: 1500,
      imageUrl: 'https://via.placeholder.com/100',
    },
  ];

  const handleGoHome = () => {
    navigate('/');
  };

  const handleViewOrder = () => {
    // 假設已有訂單查看頁面的路徑
    navigate('/order');
  };

  return (
    <ConfirmationContainer>
      <InfoBlock>
        <InfoTitle>訂單資訊</InfoTitle>
        <DataRow>
          <DataLabel>訂單編號：</DataLabel>
          <DataValue>{orderDetails.orderNumber}</DataValue>
        </DataRow>
        <DataRow>
          <DataLabel>訂單金額：</DataLabel>
          <DataValue>{orderDetails.orderAmount}</DataValue>
        </DataRow>
      </InfoBlock>
      <InfoBlock>
        <InfoTitle>付款方式</InfoTitle>
        <DataRow>
          <InfoContent>{orderDetails.paymentMethod}</InfoContent>
        </DataRow>
      </InfoBlock>
      <InfoBlock>
        <InfoTitle>收件資訊</InfoTitle>
        <DataRow>
          <DataLabel>姓名：</DataLabel>
          <DataValue>{orderDetails.receiverName}</DataValue>
        </DataRow>
        <DataRow>
          <DataLabel>地址：</DataLabel>
          <DataValue>{orderDetails.receiverAddress}</DataValue>
        </DataRow>
      </InfoBlock>
      <InfoBlock>
        <SectionTitle>商品清單</SectionTitle>
        <ProductTable>
          <thead>
            <TableRow>
              <TableHeader>商品圖片</TableHeader>
              <TableHeader>商品名稱</TableHeader>
              <TableHeader>規格</TableHeader>
              <TableHeader>數量</TableHeader>
              <TableHeader>單價</TableHeader>
              <TableHeader>小計</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <TableRow key={`${item.id}-${item.color}-${item.size}`}>
                <TableCell><ProductImage src={item.imageUrl} alt={item.name} /></TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{`${item.color} / ${item.size}`}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{`${item.price} 元`}</TableCell>
                <TableCell>{item.price * item.quantity} 元</TableCell>
              </TableRow>
            ))}
          </tbody>
        </ProductTable>
      </InfoBlock>
      <ButtonGroup>
        <Button onClick={handleGoHome}>回首頁</Button>
        <Button onClick={handleViewOrder}>查看訂單</Button>
      </ButtonGroup>
    </ConfirmationContainer>
  );
};

export default OrderConfirmation;