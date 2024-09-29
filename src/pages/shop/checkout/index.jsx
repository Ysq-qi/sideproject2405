import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { submitOrder, clearCart } from './checkoutSlice';
import { getProfile } from '../../user/profile/profileSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 從 Redux Store 中獲取相關狀態
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);

  // 本地狀態用來處理表單數據
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // 使用 useMemo 計算總金額，僅在 cartItems 變化時計算
  const totalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  // 當組件掛載時，直接獲取用戶資料
  useEffect(() => {
    dispatch(getProfile())
      .unwrap()
      .then((profileData) => {
        setFormData({
          name: profileData.name || '',
          email: profileData.email || '',
          phone: profileData.phone || '',
          address: profileData.address || ''
        });
      })
      .catch((error) => {
        console.error('獲取用戶資料時出錯：', error);
        alert('獲取用戶資料時出錯，請稍後再試');
      });
  }, [isAuthenticated, navigate, dispatch]);

  // 處理輸入變化
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

// 提交訂單
const handleOrderSubmit = async () => {
  const { name, email, phone, address } = formData;

  // 檢查購物車是否有商品
  if (cartItems.length === 0) {
    alert('購物車沒有商品，請先添加商品');
    navigate('/'); 
    return;
  }

  // 檢查必填項是否為空
  if (!name) {
    alert('姓名不可為空');
    return;
  }
  if (!email) {
    alert('Email 不可為空');
    return;
  }
  if (!phone) {
    alert('連絡電話不可為空');
    return;
  }
  if (!address) {
    alert('住址不可為空');
    return;
  }

  try {
    await dispatch(submitOrder({ cartItems, user: formData })).unwrap();
    alert('訂單提交成功');
    dispatch(clearCart());
    navigate('/order-confirmation');
  } catch (error) {
    console.error('提交訂單時出錯：', error);
    alert('提交訂單時出錯，請稍後再試');
  }
};


  // 上一步導航到購物車頁面
  const handleBack = () => {
    navigate('/cart');
  };

  return (
    <CheckoutContainer>
      <Title>結帳</Title>

      {/* 訂購人資訊 */}
      <Section>
        <SectionTitle>訂購人資訊</SectionTitle>
        <FormField>
          <Label>姓名：</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label>Email：</Label>
          <ReadOnlyInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!formData.email}
          />
        </FormField>
        <FormField>
          <Label>連絡電話：</Label>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label>住址：</Label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
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
          <RadioInput type="radio" name="invoice" value="個人電子發票" defaultChecked />
          <Label>個人電子發票</Label>
        </OptionContainer>
        <OptionContainer>
          <RadioInput type="radio" name="invoice" value="捐贈發票" />
          <Label>捐贈發票</Label>
        </OptionContainer>
      </Section>

      {/* 按鈕 */}
      <ButtonGroup>
        <Button onClick={handleBack}>上一步</Button>
        <Button onClick={handleOrderSubmit}>完成訂單</Button>
      </ButtonGroup>
    </CheckoutContainer>
  );
};

export default Checkout;