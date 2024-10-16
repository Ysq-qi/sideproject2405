import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsForDisplay } from './productDisplaySlice';
import {
  ProductDisplayContainer,
  ProductGrid,
  ProductItem,
  ProductImage,
  ProductInfo,
  ProductPrice,
} from './style';

const ProductDisplay = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.productDisplay);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductsForDisplay(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found...</div>;
  }

  return (
    <ProductDisplayContainer>
      <ProductGrid>
        {products.map((product) => (
          <ProductItem key={product.id}>
            <ProductImage
              src={product.images[0]?.url || ''}
              alt={product.name || 'No name available'}
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <ProductInfo>{product.name}</ProductInfo>
            <ProductPrice>{product.price ? `$${product.price}` : 'Price unavailable'}</ProductPrice>
          </ProductItem>
        ))}
      </ProductGrid>
    </ProductDisplayContainer>
  );
};

export default ProductDisplay;