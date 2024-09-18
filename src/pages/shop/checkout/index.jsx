import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  CheckoutContainer,
  Section,
  Title,
  ReadOnlyInput,
  Input,
  SectionTitle,
  FormField,
  Label,
  StaticInfo,
  Button,
  ButtonGroup,
  ProductTable,
  TableHeader,
  TableRow,
  TableCell,
  ProductImage,
  OptionContainer,
  RadioInput
} from './style';
import { submitOrder } from './checkoutSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 模擬的用戶資料
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '1234 Street, City',
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

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleBack = () => {
    navigate('/cart');
  };

  const handleOrderSubmit = () => {
    dispatch(submitOrder());
    navigate('/order-confirmation');
  };

  return (
    <CheckoutContainer>
      <Title>結帳</Title>

      {/* 訂購人資訊 */}
      <Section>
        <SectionTitle>訂購人資訊</SectionTitle>
        <FormField>
          <Label>姓名：</Label>
          <ReadOnlyInput type="text" defaultValue="John Doe" readOnly />
        </FormField>
        <FormField>
          <Label>Email：</Label>
          <ReadOnlyInput type="email" defaultValue="john@example.com" readOnly />
        </FormField>
        <FormField>
          <Label>連絡電話：</Label>
          <Input type="text" defaultValue="1234567890" />
        </FormField>
        <FormField>
          <Label>住址：</Label>
          <Input type="text" defaultValue="1234 Street, City" />
        </FormField>
      </Section>


      {/* 商品清單 */}
      <Section>
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
        <StaticInfo style={{ textAlign: 'right', marginTop: '10px' }}>
          <strong>總金額：{totalAmount} 元</strong>
        </StaticInfo>
      </Section>

      {/* 貨運方式 */}
      <Section>
        <SectionTitle>貨運方式</SectionTitle>
        <OptionContainer>
          <RadioInput type="radio" name="shipping" value="郵寄 / 宅配" defaultChecked />
          <Label>郵寄 / 宅配</Label>
        </OptionContainer>
      </Section>

      {/* 付款方式 */}
      <Section>
        <SectionTitle>付款方式</SectionTitle>
        <OptionContainer>
          <RadioInput type="radio" name="payment" value="貨到付款" defaultChecked />
          <Label>貨到付款</Label>
        </OptionContainer>
      </Section>

      {/* 發票資訊 */}
      <Section>
        <SectionTitle>發票資訊</SectionTitle>
        <OptionContainer>
          <RadioInput type="radio" name="invoice" value="個人電子發票" checked />
          <Label>個人電子發票</Label>
        </OptionContainer>
        <OptionContainer>
          <RadioInput type="radio" name="invoice" value="捐贈發票" />
          <Label>捐贈發票</Label>
        </OptionContainer>
      </Section>


      <ButtonGroup>
        <Button onClick={handleBack}>上一步</Button>
        <Button onClick={handleOrderSubmit}>完成訂單</Button>
      </ButtonGroup>
    </CheckoutContainer>
  );
};

export default Checkout;