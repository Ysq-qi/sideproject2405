import React, { useEffect, useState } from 'react';
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
  Pagination,
  PageButton,
} from './style';

const ProductDisplay = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { products, loading, error } = useSelector((state) => state.productDisplay);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 每頁最多顯示 15 個商品

  useEffect(() => {
    if (id) {
      dispatch(fetchProductsForDisplay(id));
    }
  }, [id, dispatch]);

  const handlePageChange = (page) => setCurrentPage(page);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!products || products.length === 0) return <div>No products found...</div>;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <ProductDisplayContainer>
      <ProductGrid>
        {currentProducts.map((product) => (
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
      {products.length > itemsPerPage && (
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index}
              onClick={() => handlePageChange(index + 1)}
              active={index + 1 === currentPage}
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