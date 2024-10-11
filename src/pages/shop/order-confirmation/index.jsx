import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ConfirmationContainer,
  Title,
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
  ProductImage,
} from './style';
import { clearOrderStatus } from '../checkout/checkoutSlice';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.checkout.orderDetails);

  useEffect(() => {
    if (!orderDetails) {
      navigate('/');
    }
  }, [orderDetails, navigate]);

  if (!orderDetails) {
    return null;
  }

  const handleGoHome = () => {
    dispatch(clearOrderStatus());
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
        <DataRow>
          <DataLabel>付款方式：</DataLabel>
          <DataValue>{orderDetails.paymentMethod}</DataValue>
        </DataRow>
        <DataRow>
          <DataLabel>付款狀態：</DataLabel>
          <DataValue>{orderDetails.paymentStatus}</DataValue>
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
        <DataRow>
          <DataLabel>連絡電話：</DataLabel>
          <DataValue>{orderDetails.userInfo.phone}</DataValue>
        </DataRow>
        <DataRow>
          <DataLabel>Email：</DataLabel>
          <DataValue>{orderDetails.userInfo.email}</DataValue>
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
                <TableCell>
                  <ProductImage src={item.imageUrl} alt={item.name} />
                </TableCell>
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