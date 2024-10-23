import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor, setSize, setQuantity, resetSelections } from '../../productDetailSlice';
import { addItemToCart } from '../../../../shop/cart/cartSlice';
import { handleError } from '../../../../../utils/error/errorHandler';
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
  const { selectedColor, selectedSize, quantity, error } = useSelector((state) => state.productDetail);

  useEffect(() => {
    dispatch(resetSelections());
  }, [dispatch]);

  const validateStock = useCallback(() => {
    const stockForSelectedColor = product.stock[selectedColor];
    const stockForSelectedSize = stockForSelectedColor[selectedSize];

    if (quantity > stockForSelectedSize) {
      handleError('stock', new Error('數量不足'));
      dispatch(resetSelections());
      return false;
    }
    return true;
  }, [product, selectedColor, selectedSize, quantity, dispatch]);

  const handleAddToCart = useCallback(() => {
    if (!validateStock()) return;

    const item = {
      imageUrl: product.images.find((image) => image.color === selectedColor)?.url || product.images[0].url,
      id: product.id,
      name: product.name,
      color: selectedColor,
      size: selectedSize,
      quantity,
      price: product.price,
    };

    dispatch(addItemToCart(item));
    alert('商品添加成功');
    dispatch(resetSelections());
  }, [validateStock, product, selectedColor, selectedSize, quantity, dispatch]);

  return (
    <InfoContainer>
      <Title>{product.name}</Title>
      <Price>NT$ {product.price}</Price>
      <Section>
        <label>商品顏色：</label>
        <Select value={selectedColor} onChange={(e) => dispatch(setColor(e.target.value))}>
          {product.colors.map((color) => (
            <Option key={color} value={color}>{color}</Option>
          ))}
        </Select>
      </Section>
      <Section>
        <label>尺寸：</label>
        <Select value={selectedSize} onChange={(e) => dispatch(setSize(e.target.value))}>
          {Object.keys(product.sizes.values).map((size) => (
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
            {product.sizes.dimensions.map((dimension) => (
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