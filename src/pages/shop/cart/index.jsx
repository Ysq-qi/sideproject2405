import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config/firebaseConfig';
import CartItem from './CartItem';

import {
  CartContainer,
  Title,
  Table,
  TableHeader,
  TableRow,
  SummaryContainer,
  Button,
  Section,
} from './style';

import {
  fetchCart,
  removeItem,
  removeItemFromCart,
  updateQuantity,
  updateItemQuantity,
  setCartItems,
  syncCartToFirestore,
} from './cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  // 使用 useMemo 計算總金額
  const total = React.useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  // 合併本地和遠端購物車數據
  const mergeLocalAndRemoteCart = useCallback(async () => {
    const localItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (isAuthenticated && auth.currentUser) {
      try {
        const remoteItems = await dispatch(fetchCart()).unwrap();
        const mergedItems = [...remoteItems];

        localItems.forEach((localItem) => {
          const existingItem = mergedItems.find(
            (item) =>
              item.id === localItem.id &&
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

        // 同步合併後的購物車數據到 Firestore
        await dispatch(syncCartToFirestore()).unwrap();
      } catch (error) {
        console.error('合併購物車時出錯', error);
      }
    } else {
      // 未登入，僅使用本地購物車數據
      dispatch(setCartItems(localItems));
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (auth.currentUser && isAuthenticated) {
        mergeLocalAndRemoteCart();
        clearInterval(interval); // 一旦認證完成，清除輪詢
      }
    }, 100); // 每100毫秒檢查一次
    
    return () => clearInterval(interval); // 組件卸載時清除
  }, [isAuthenticated, mergeLocalAndRemoteCart]);
  
  // 處理刪除商品
  const handleRemove = (id, color, size) => {
    dispatch(removeItem({ id, color, size }));
    dispatch(removeItemFromCart({ id, color, size }))
      .unwrap()
      .catch((error) => {
        console.error('刪除商品時出錯：', error);
        alert('刪除商品時發生錯誤，請稍後再試');
      });
  };

  // 處理更新商品數量
  const handleQuantityChange = (id, color, size, quantity) => {
    if (quantity < 1 || quantity > 20 || isNaN(quantity)) {
      alert('數量必須在 1 到 20 之間');
      return;
    }
    dispatch(updateQuantity({ id, color, size, quantity }));
    dispatch(updateItemQuantity({ id, color, size, quantity }))
      .unwrap()
      .catch((error) => {
        console.error('更新商品數量時出錯：', error);
        alert('更新商品數量時發生錯誤，請稍後再試');
      });
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
            <TableHeader>操作</TableHeader>
          </TableRow>
        </thead>
        { /* 拆分成CartItem組件 */}
        <tbody>
          {cartItems.map((item) => (
            <CartItem
            key={`${item.id}-${item.color}-${item.size}`}
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
            />
          ))}
        </tbody>
      </Table>
      <SummaryContainer>
        <span>小計：</span>
        <span>{total} 元</span>
      </SummaryContainer>
      <Section>
        <Button onClick={() => navigate('/')}>繼續購物</Button>
        <Button onClick={handleCheckout}>立即結帳</Button>
      </Section>
    </CartContainer>
  );
};

export default Cart;