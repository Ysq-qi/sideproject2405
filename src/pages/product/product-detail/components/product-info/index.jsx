import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor, setSize, setQuantity, resetSelections, setProduct } from '../../productDetailSlice';
import { addItem, updateQuantity } from '../../../../shop/cart/cartSlice';
import { auth } from '../../../../../config/firebaseConfig';
import axios from 'axios';
import {
  InfoContainer,
  Title,
  Section,
  Price,
  Button,
  ErrorText,
  Select,
  Option,
  QuantityControl,
  QuantityButton,
  SizeTable,
  SizeRow,
  SizeCell,
  SizeHeader,
} from './style';

const ProductDetailInfo = ({ product }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.login.isAuthenticated);
  const { selectedColor, selectedSize, quantity, error } = useSelector(state => state.productDetail);
  const cartItems = useSelector(state => state.cart.items);  // 從 Redux 獲取購物車項目

  useEffect(() => {
    dispatch(setProduct(product));
  }, [dispatch, product]);

  const handleAddToCart = async () => {
    const stockForSelectedColor = product.stock[selectedColor];
    const stockForSelectedSize = stockForSelectedColor[selectedSize];
  
    // 庫存檢查
    if (quantity > stockForSelectedSize) {
      alert('數量不足');
      dispatch(resetSelections());
      return;
    }
  
    // 根據選擇的顏色來確定對應的圖片 URL
    const imageUrl = product.images.find(image => image.color === selectedColor)?.url || product.images[0].url;
  
    const item = {
      imageUrl,
      id: product.id,
      name: product.name,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: product.price,
    };
  
    // 檢查商品是否已存在於購物車
    const existingItem = cartItems.find(
      i => i.id === item.id && i.color === item.color && i.size === item.size
    );
  
    // 更新商品數量或添加新商品
    if (existingItem) {
      dispatch(updateQuantity({
        id: item.id,
        color: item.color,
        size: item.size,
        quantity: existingItem.quantity + item.quantity
      }));
    } else {
      dispatch(addItem(item));
    }
  
    alert('商品添加成功');
    dispatch(resetSelections());
  
    // 保存當前的 item 到 Firestore 或本地存儲
    isAuthenticated ? await addCartItemToFirestore(item) : saveCartToLocalStorage(item);
  };
  
  // (登入時處理)添加單個 item 到 Firestore
  const addCartItemToFirestore = async (item) => {
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.post(
        'http://localhost:5001/sideproject2405-b8a66/us-central1/api/cart/add',
        { item },  // 傳遞單個商品
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('商品已成功添加到 Firestore');
    } catch (error) {
      console.error('添加商品到 Firestore 時出錯', error);
      alert('保存購物車時出錯，請稍後再試');
    }
  };
  
  // (未登入時處理)保存本地購物車數據
  const saveCartToLocalStorage = (item) => {
    const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const localExistingItemIndex = localCartItems.findIndex(
      i => i.id === item.id && i.color === item.color && i.size === item.size
    );
  
    if (localExistingItemIndex !== -1) {
      localCartItems[localExistingItemIndex].quantity += item.quantity;
    } else {
      localCartItems.push(item);
    }
  
    localStorage.setItem('cartItems', JSON.stringify(localCartItems));
  };

  return (
    <InfoContainer>
      <Title>{product.name}</Title>
      <Price>NT$ {product.price}</Price>
      <Section>
        <label>商品顏色：</label>
        <Select value={selectedColor} onChange={(e) => dispatch(setColor(e.target.value))}>
          {product.colors.map(color => (
            <Option key={color} value={color}>{color}</Option>
          ))}
        </Select>
      </Section>
      <Section>
        <label>尺寸：</label>
        <Select value={selectedSize} onChange={(e) => dispatch(setSize(e.target.value))}>
          {Object.keys(product.sizes.values).map(size => (
            <Option key={size} value={size}>{size}</Option>
          ))}
        </Select>
      </Section>
      <Section>
        <label>數量：</label>
        <QuantityControl>
          <QuantityButton onClick={() => dispatch(setQuantity(Math.max(1, quantity - 1)))}>-</QuantityButton>
          <span>{quantity}</span>
          <QuantityButton onClick={() => dispatch(setQuantity(quantity + 1))}>+</QuantityButton>
        </QuantityControl>
      </Section>
      <Section>
        <Button onClick={handleAddToCart}>加入購物車</Button>
        {error && <ErrorText>{error}</ErrorText>}
      </Section>
      <Section>
        <SizeTable>
          <SizeHeader>
            <SizeCell>尺碼(cm)</SizeCell>
            {product.sizes.dimensions.map(dimension => (
              <SizeCell key={dimension}>{dimension}</SizeCell>
            ))}
          </SizeHeader>
          {Object.entries(product.sizes.values).map(([size, details]) => (
            <SizeRow key={size}>
              <SizeCell>{size}</SizeCell>
              {details.map((detail, index) => (
                <SizeCell key={index}>{detail}</SizeCell>
              ))}
            </SizeRow>
          ))}
        </SizeTable>
      </Section>
    </InfoContainer>
  );
};

export default ProductDetailInfo;
