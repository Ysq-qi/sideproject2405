import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from './cartSlice';
import {
  CartContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  SummaryContainer,
  Button,
  Input,
  Section,
  Title,
  ProductImage
} from './style';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (id, color, size) => {
    dispatch(removeFromCart({ id, color, size }));
  };

  const handleQuantityChange = (id, color, size, quantity) => {
    dispatch(updateQuantity({ id, color, size, quantity }));
  };

  return (
    <CartContainer>
      <Title>購物車</Title>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>商品圖片</TableHeader>
            <TableHeader>商品編號</TableHeader>
            <TableHeader>商品名稱</TableHeader>
            <TableHeader>規格</TableHeader>
            <TableHeader>數量</TableHeader>
            <TableHeader>單價</TableHeader>
            <TableHeader>小計</TableHeader>
            <TableHeader> - </TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <TableRow key={`${item.id}-${item.color}-${item.size}`}>
              <TableCell><ProductImage src={item.imageUrl} alt={item.name} /></TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.color} - {item.size}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.quantity}
                  min="1"
                  max="20"
                  onChange={(e) => handleQuantityChange(item.id, item.color, item.size, Number(e.target.value))}
                />
              </TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.price * item.quantity}</TableCell>
              <TableCell>
                <Button onClick={() => handleRemove(item.id, item.color, item.size)}>刪除</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <SummaryContainer>
        <span>小計</span>
        <span>{total} 元</span>
      </SummaryContainer>
      <Section>
        <Button>立即結帳</Button>
        <Button onClick={() => navigate('/')}>繼續購物</Button>
      </Section>
    </CartContainer>
  );
};

export default Cart;