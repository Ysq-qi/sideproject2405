import React from 'react';
import { DropdownContainer, CartItem } from './style';

const CartDropdown = () => {
  // 替換為你的購物車項目
  const cartItems = [
    { id: 1, name: 'Military 古著羅馬尼亞軍事帆布斜跨包', color: '綠', size: 'F', price: 780, quantity: 1 },
    { id: 2, name: '美式復古 Chcuh 刺繡軟頂棒球帽', color: '橘', size: 'F', price: 480, quantity: 1 },
  ];

  return (
    <DropdownContainer>
      {cartItems.length ? (
        cartItems.map(item => (
          <CartItem key={item.id}>
            <span>{item.name}</span>
            <span>{item.color} / {item.size} / {item.price} / {item.quantity}</span>
          </CartItem>
        ))
      ) : (
        <span>沒有商品</span>
      )}
      <button>立即結帳</button>
    </DropdownContainer>
  );
};

export default CartDropdown;
