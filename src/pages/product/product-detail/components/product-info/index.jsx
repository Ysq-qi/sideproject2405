import React from 'react';
import {
  InfoContainer,
  Title,
  Price,
  Button,
  Section,
  Select,
  Option,
  QuantityControl,
  QuantityButton,
  SizeTable,
  SizeRow,
  SizeCell,
  SizeHeader
} from './style';

const ProductDetailInfo = () => (
  <InfoContainer>
    <Title>Outdoor機能速乾網眼拼接短Tee</Title>
    <Price>NT$ 680</Price>
    <Button>Outdoor必入</Button>
    <Section>
      <label>商品顏色：</label>
      <Select>
        <Option value="brown">棕色</Option>
        <Option value="black">黑色</Option>
      </Select>
    </Section>
    <Section>
      <label>尺寸：</label>
      <Select>
        <Option value="L">L</Option>
        <Option value="XL">XL</Option>
        <Option value="XXL">XXL</Option>
      </Select>
    </Section>
    <Section>
      <label>數量：</label>
      <QuantityControl>
        <QuantityButton>-</QuantityButton>
        <span>1</span>
        <QuantityButton>+</QuantityButton>
      </QuantityControl>
    </Section>
    <Button>加入購物車</Button>
    <SizeTable>
      <SizeHeader>
        <SizeCell>尺碼(cm)</SizeCell>
        <SizeCell>衣長</SizeCell>
        <SizeCell>胸圍</SizeCell>
        <SizeCell>肩寬</SizeCell>
        <SizeCell>袖口</SizeCell>
      </SizeHeader>
      <SizeRow>
        <SizeCell>L</SizeCell>
        <SizeCell>72</SizeCell>
        <SizeCell>138</SizeCell>
        <SizeCell>-</SizeCell>
        <SizeCell>27</SizeCell>
      </SizeRow>
      <SizeRow>
        <SizeCell>XL</SizeCell>
        <SizeCell>74</SizeCell>
        <SizeCell>142</SizeCell>
        <SizeCell>-</SizeCell>
        <SizeCell>28</SizeCell>
      </SizeRow>
      <SizeRow>
        <SizeCell>XXL</SizeCell>
        <SizeCell>76</SizeCell>
        <SizeCell>146</SizeCell>
        <SizeCell>-</SizeCell>
        <SizeCell>29</SizeCell>
      </SizeRow>
    </SizeTable>
  </InfoContainer>
);

export default ProductDetailInfo;
