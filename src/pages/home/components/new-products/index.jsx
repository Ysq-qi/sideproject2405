import React from 'react';
import HomeProductsSection from '../products-section'

import labelImage from '../../../../assets/images/pages/home/new-products/new.png';
import image1 from '../../../../assets/images/pages/home/new-products/001.jpg';
import image2 from '../../../../assets/images/pages/home/new-products/002.jpg';
import image3 from '../../../../assets/images/pages/home/new-products/003.jpg';
import image4 from '../../../../assets/images/pages/home/new-products/004.jpg';
import image5 from '../../../../assets/images/pages/home/new-products/005.jpg';

const products = [
  { image: image1, name: '城市戶外四季衝鋒外套', price: 'TWD 1180' },
  { image: image2, name: '城市輕型五分褲短褲', price: 'TWD 680' },
  { image: image3, name: 'Street火焰刺繡拼接短T', price: 'TWD 680' },
  { image: image4, name: '水洗刷舊牛仔五分短褲', price: 'TWD 780' },
  { image: image5, name: '機能反光條紋針織T', price: 'TWD 680' },
];

const NewProduct = () => (
  <HomeProductsSection labelImage={labelImage} products={products} />
);

export default NewProduct;
