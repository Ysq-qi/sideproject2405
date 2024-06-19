import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor, setSize, setQuantity, resetSelections, setProduct } from '../../productDetailSlice';
import { addToCart } from '../../../../shop/cart/cartSlice';
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
  //使用hooks useDispatch,useSelector
  const dispatch = useDispatch();
  const { selectedColor, selectedSize, quantity, error } = useSelector(state => state.productDetail);

  useEffect(() => {
    dispatch(setProduct(product));
  }, [dispatch, product]);



  const handleAddToCart = () => {
    // 根據選擇的顏色來確定對應的庫存
    const stockForSelectedColor = product.stock[selectedColor];
    const stockForSelectedSize = stockForSelectedColor[selectedSize];
  
    // 點擊以後 如果庫存不足 則顯示數量不足並且返回 且重置狀態 然後終止運行
    if (quantity > stockForSelectedSize) {
      alert('數量不足');
      dispatch(resetSelections());
      return;
    }
  
    // 根據選擇的顏色來確定對應的圖片 URL
    const imageUrl = product.images.find(image => image.color === selectedColor)?.url || product.images[0].url;
  
    // 點擊以後 如果庫存足夠 則顯示商品添加成功 並且將item數組傳遞給addToCart 並且重置狀態
    const item = {
      imageUrl,
      id: product.id,
      name: product.name,
      color: selectedColor,
      size: selectedSize,
      quantity,
      price: product.price,
    };
    alert('商品添加成功');
    dispatch(addToCart(item));
    dispatch(resetSelections());
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