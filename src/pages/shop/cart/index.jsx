import React from 'react';
import { CartContainer, CartItemContainer, SummaryContainer } from './style';

const Cart = () => {
  // 替換為你的購物車項目
  const cartItems = [
    { id: 1, name: 'Military 古著羅馬尼亞軍事帆布斜跨包', color: '綠', size: 'F', price: 780, quantity: 1 },
    { id: 2, name: '美式復古 Chcuh 刺繡軟頂棒球帽', color: '橘', size: 'F', price: 480, quantity: 1 },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContainer>
      <h2>購物車</h2>
      {cartItems.map(item => (
        <CartItemContainer key={item.id}>
          <span>{item.name}</span>
          <span>{item.color} / {item.size} / {item.price} / {item.quantity}</span>
        </CartItemContainer>
      ))}
      <SummaryContainer>
        <span>總金額</span>
        <span>{total} 元</span>
      </SummaryContainer>
      <button>立即結帳</button>
    </CartContainer>
  );
};

export default Cart;
