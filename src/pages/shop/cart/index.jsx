import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity, fetchCart, saveCart, setCartItems } from './cartSlice';
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
  const isAuthenticated = useSelector(state => state.login.isAuthenticated);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 用於從遠端和本地合併購物車的函數
  const fetchAndMergeCart = useCallback(async () => {
    const localItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (isAuthenticated) {
      try {
        const remoteItems = await dispatch(fetchCart()).unwrap();

        // 合併本地購物車和遠端購物車
        const mergedItems = [...remoteItems];
        localItems.forEach(localItem => {
          const existingItem = mergedItems.find(
            item => item.id === localItem.id &&
                    item.color === localItem.color &&
                    item.size === localItem.size
          );
          if (existingItem) {
            existingItem.quantity += localItem.quantity;
          } else {
            mergedItems.push(localItem);
          }
        });

        // 更新 Redux 狀態
        dispatch(setCartItems(mergedItems));

        // 清除本地儲存的購物車資料
        localStorage.removeItem('cartItems');
      } catch (error) {
        console.error('獲取或合併購物車資料時出錯', error);
      }
    }
  }, [isAuthenticated, dispatch]);

  // 只在 isAuthenticated 變化時運行一次
  useEffect(() => {
    if (isAuthenticated) {
      fetchAndMergeCart();
    }
  }, [isAuthenticated, fetchAndMergeCart]);

  // 處理購物車商品刪除
  const handleRemove = (id, color, size) => {
    dispatch(removeItem({ id, color, size }));
    dispatch(saveCart()); // 僅在商品刪除後保存購物車
  };

  // 處理購物車商品數量變化
  const handleQuantityChange = (id, color, size, quantity) => {
    dispatch(updateQuantity({ id, color, size, quantity }));
    dispatch(saveCart()); // 僅在商品數量變化後保存購物車
  };

  // 處理結帳按鈕點擊
  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('請先登入');
      return;
    }
    navigate('/checkout');
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
              <TableCell>
                <ProductImage src={item.imageUrl} alt={item.name} />
              </TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.color} - {item.size}</TableCell>
              <TableCell>
                <label htmlFor={`quantity-${item.id}-${item.color}-${item.size}`} className="visually-hidden">數量</label>
                <Input
                  id={`quantity-${item.id}-${item.color}-${item.size}`}
                  name={`quantity-${item.id}-${item.color}-${item.size}`}
                  type="number"
                  value={item.quantity}
                  min="1"
                  max="20"
                  autoComplete="off"
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
        <Button onClick={handleCheckout}>立即結帳</Button>
        <Button onClick={() => navigate('/')}>繼續購物</Button>
      </Section>
    </CartContainer>
  );  
};

export default Cart;