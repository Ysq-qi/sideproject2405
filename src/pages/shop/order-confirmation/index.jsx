import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Title,
  ConfirmationContainer,
  InfoBlock,
  InfoTitle,
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
  const orderDetails = useSelector((state) => state.checkout.orderDetails);

  // 檢查 orderDetails 是否為 null
  if (!orderDetails) {
    navigate('/');  // 若沒有訂單資料，重定向回首頁或其他頁面
    return null;  // 確保組件不會繼續渲染
  }
  
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <ConfirmationContainer>
      <Title>完成訂單</Title>
      <InfoBlock>
        <InfoTitle>訂單資訊</InfoTitle>
        <DataRow>
          <DataLabel>訂單編號：</DataLabel>
          <DataValue>{orderDetails.orderId}</DataValue>
        </DataRow>
        <DataRow>
          <DataLabel>訂單金額：</DataLabel>
          <DataValue>{orderDetails.totalAmount} 元</DataValue>
        </DataRow>
      </InfoBlock>
      <InfoBlock>
        <InfoTitle>收件資訊</InfoTitle>
        <DataRow>
          <DataLabel>姓名：</DataLabel>
          <DataValue>{orderDetails.userInfo.name}</DataValue>
        </DataRow>
        <DataRow>
          <DataLabel>地址：</DataLabel>
          <DataValue>{orderDetails.userInfo.address}</DataValue>
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
            {orderDetails.items.map((item) => (
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
      </ButtonGroup>
    </ConfirmationContainer>
  );
};

export default OrderConfirmation;