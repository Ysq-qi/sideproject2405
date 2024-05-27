import React from 'react';
import { 
  ProductListContainer,
  ProductGrid,
  ProductItem,
  ProductImage,
  ProductInfo, 
  ProductPrice,
  Pagination, 
  PageButton 
} from './style';

import image1 from '../../../../../assets/images/pages/home/new-products/001.jpg';
import image2 from '../../../../../assets/images/pages/home/new-products/002.jpg';
import image3 from '../../../../../assets/images/pages/home/new-products/003.jpg';
import image4 from '../../../../../assets/images/pages/home/new-products/004.jpg';
import image5 from '../../../../../assets/images/pages/home/new-products/005.jpg';

const products = [
  { image: image1, name: '城市戶外四季衝鋒外套', price: 'TWD 1180' },
  { image: image2, name: '城市輕型五分褲短褲', price: 'TWD 680' },
  { image: image3, name: 'Street火焰刺繡拼接短T', price: 'TWD 680' },
  { image: image4, name: '水洗刷舊牛仔五分短褲', price: 'TWD 780' },
  { image: image5, name: '機能反光條紋針織T', price: 'TWD 680' },
];

const ProductList = () => {
  return (
    <ProductListContainer>
      <ProductGrid>
        {products.map((product, index) => (
          <ProductItem key={index}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>{product.name}</ProductInfo>
            <ProductPrice>{product.price}</ProductPrice>
          </ProductItem>
        ))}
      </ProductGrid>
      <Pagination>
        {/* 這裡將會顯示頁碼 */}
        <PageButton>1</PageButton>
        <PageButton>2</PageButton>
        {/* 可以添加更多 PageButton 來模擬不同頁碼 */}
      </Pagination>
    </ProductListContainer>
  );
};

export default ProductList;
