import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  fetchCart,
  removeItem,
  removeItemFromCart,
  updateQuantity,
  updateItemQuantity,
  setCartItems,
  syncCartToFirestore
} from './cartSlice';
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
  const cartItems = useSelector((state) => state.cart.items || []);  // 保證 cartItems 至少是一個空陣列
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 合併本地和遠端購物車數據
  const mergeLocalAndRemoteCart = useCallback(async () => {
    const localItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (isAuthenticated) {
      try {
        const remoteItems = await dispatch(fetchCart()).unwrap(); // 獲取 Firestore 購物車數據
        const mergedItems = [...remoteItems]; // 遠端購物車數據

        // 合併本地購物車數據
        localItems.forEach((localItem) => {
          const existingItem = mergedItems.find(
            (item) => item.id === localItem.id && item.color === localItem.color && item.size === localItem.size
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
        dispatch(syncCartToFirestore());
      } catch (error) {
        console.error('合併本地和遠端購物車數據時出錯', error);
      }
    }
  }, [isAuthenticated, dispatch]);

  // 首次加載時執行合併購物車
  useEffect(() => {
    if (isAuthenticated) {
      mergeLocalAndRemoteCart();
    }
  }, [isAuthenticated, mergeLocalAndRemoteCart]);

  // 處理購物車商品刪除
  const handleRemove = (id, color, size) => {
    // 1. 先更新前端 Redux 狀態，立即刪除商品
    dispatch(removeItem({ id, color, size }));
    
    // 2. 同步刪除後端 Firestore 購物車數據
    dispatch(removeItemFromCart({ id, color, size }))
      .unwrap()
      .then((updatedItems) => {
        // 3. 後端刪除成功後，更新 Redux 狀態中的購物車數據
        dispatch(setCartItems(updatedItems));
      })
      .catch((error) => {
        console.error('刪除商品時出錯：', error);
        // 如果需要，您可以在錯誤情況下進行恢復處理
      });
  };

  // 處理購物車商品數量變化
  const handleQuantityChange = (id, color, size, quantity) => {
    // 1. 先更新前端 Redux 狀態 (即時反映在 UI 上)
    dispatch(updateQuantity({ id, color, size, quantity }));
  
    // 2. 同步後端 Firestore 購物車數據
    dispatch(updateItemQuantity({ id, color, size, quantity }))
      .unwrap()
      .then((updatedItems) => {
        // 3. 如果後端更新成功，可以選擇性地檢查或同步
        dispatch(setCartItems(updatedItems));  // 選擇同步後端返回的最新購物車數據
      })
      .catch((error) => {
        console.error('更新後端購物車時出錯：', error);
        // 如果需要，可以在錯誤時進行恢復處理
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
        <tbody>
          {(cartItems || []).map((item) => (  // 防禦性檢查，確保 cartItems 存在
            <TableRow key={`${item.id}-${item.color}-${item.size}`}>
              <TableCell>
                <ProductImage src={item.imageUrl} alt={item.name} />
              </TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {item.color} - {item.size}
              </TableCell>
              <TableCell>
                <Input
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