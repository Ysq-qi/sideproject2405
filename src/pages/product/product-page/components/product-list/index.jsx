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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ productData, handlePageChange, currentPage }) => {
  const itemsPerPage = useSelector((state) => state.product.itemsPerPage);
  const navigate = useNavigate(); // 在這裡使用 navigate

  if (!Array.isArray(productData) || productData.length === 0) {
    return <div> 加載中 </div>;
  }

  const totalPages = Math.ceil(productData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = productData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <ProductListContainer>
      <ProductGrid>
        {currentProducts.map((product, index) => (
          <ProductItem key={index} onClick={() => navigate(`/product/${product.id}`)}>
            <ProductImage src={product.images[0].url} alt={product.name} />
            <ProductInfo>{product.name}</ProductInfo>
            <ProductPrice>{product.price}</ProductPrice>
          </ProductItem>
        ))}
      </ProductGrid>
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
    </ProductListContainer>
  );
};

export default ProductList;