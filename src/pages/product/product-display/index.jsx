import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByIds } from './productDisplaySlice';
import { 
  ProductDisplayContainer,
  ProductGrid,
  ProductItem,
  ProductImage,
  ProductInfo, 
  ProductPrice,
} from './style';

const ProductDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productDisplay.filteredProducts);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const ids = query.get('ids');
    console.log('Parsed IDs:', ids); // 添加調試信息
    if (ids) {
      dispatch(fetchProductsByIds(ids.split(',')));
    }
  }, [location.search, dispatch]);

  return (
    <ProductDisplayContainer>
      <ProductGrid>
        {products.map((product) => (
          <ProductItem key={product.id}>
            <ProductImage 
              src={product.image} 
              alt={product.name} 
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <ProductInfo>{product.name}</ProductInfo>
            <ProductPrice>{product.price}</ProductPrice>
          </ProductItem>
        ))}
      </ProductGrid>
    </ProductDisplayContainer>
  );
};

export default ProductDisplay;