import React from 'react';
import { ProductPageContainer } from './style';
import CategoryList from './components/category-list';
import FilterSort from './components/filter-sort';
import ProductList from './components/product-list';

const ProductPage = ({ categories, productData, handleCategoryChange, handleProductClick, handlePageChange, currentPage }) => {
  return (
    <ProductPageContainer>
      <CategoryList categories={categories} handleCategoryChange={handleCategoryChange} />
      <FilterSort />
      <ProductList productData={productData} handleProductClick={handleProductClick} handlePageChange={handlePageChange} currentPage={currentPage} />
    </ProductPageContainer>
  );
};

export default ProductPage;