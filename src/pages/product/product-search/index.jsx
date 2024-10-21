import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearchResults } from './productSearchSlice';
import {
  ProductSearchContainer,
  ProductGrid,
  ProductItem,
  ProductImage,
  ProductInfo,
  ProductPrice,
  Pagination,
  PageButton,
} from './style';

const ProductSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);

  const searchQuery = queryParams.get('query'); // 取得 query 參數
  const pageParam = queryParams.get('page') || 1; // 取得 page 參數，預設為 1
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam, 10));

  const { products, loading, error } = useSelector((state) => state.productSearch);
  const itemsPerPage = 15;

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSearchResults(searchQuery));
    }
  }, [searchQuery, dispatch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    navigate(`/search?query=${encodeURIComponent(searchQuery)}&page=${newPage}`);
  };

  if (loading) return <div>正在搜尋商品...</div>;
  if (error) return <div>發生錯誤：{error}</div>;
  if (!products || products.length === 0) return <div>未找到相關商品。</div>;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <ProductSearchContainer>
      <ProductGrid>
        {currentProducts.map((product) => (
          <ProductItem key={product.id}>
            <ProductImage
              src={product.images[0]?.url || ''}
              alt={product.name || 'No name available'}
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <ProductInfo>{product.name}</ProductInfo>
            <ProductPrice>{product.price ? `$${product.price}` : '價格未提供'}</ProductPrice>
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
    </ProductSearchContainer>
  );
};

export default ProductSearch;