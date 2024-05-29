import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../productSlice';
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

const ProductList = () => {
  const dispatch = useDispatch();
  const filteredProducts = useSelector((state) => state.product.filteredProducts);
  const currentPage = useSelector((state) => state.product.currentPage);
  const itemsPerPage = useSelector((state) => state.product.itemsPerPage);

  if (!Array.isArray(filteredProducts) || filteredProducts.length === 0) {
    return <div> 加載失敗 </div>;
  }

  // 計算總頁數
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // 獲取當前頁面的產品
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <ProductListContainer>
      <ProductGrid>
        {currentProducts.map((product, index) => (
          <ProductItem key={index}>
            <ProductImage src={product.image_path} alt={product.name} />
            <ProductInfo>{product.name}</ProductInfo>
            <ProductPrice>{product.price}</ProductPrice>
          </ProductItem>
        ))}
      </ProductGrid>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton 
            key={index} 
            onClick={() => dispatch(setPage(index + 1))}
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