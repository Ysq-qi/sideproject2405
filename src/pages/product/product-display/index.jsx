import React from 'react';
import {
  ProductDisplayContainer,
  ProductGrid,
  ProductItem,
  ProductImage,
  ProductInfo,
  ProductPrice,
  Pagination,
  PageButton,
} from './style';
import useProductDisplay from './hooks/useProductDisplay';

const ProductDisplay = () => {
  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    navigate,
  } = useProductDisplay();

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!products || products.length === 0) return <div>No products found...</div>;

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
      {totalPages > 1 && (
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index}
              onClick={() => handlePageChange(index + 1)}
              $active={index + 1 === currentPage}
            >
              {index + 1}
            </PageButton>
          ))}
        </Pagination>
      )}
    </ProductDisplayContainer>
  );
};

export default ProductDisplay;