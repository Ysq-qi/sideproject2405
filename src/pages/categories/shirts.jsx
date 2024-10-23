import React from 'react';
import ProductPage from '../product/product-page';
import useCategoryPage from './hooks/useCategoryPage';

const categories = {
  '長袖襯衫': 'long-sleeve',
  '短袖襯衫': 'short-sleeve',
};

const Shirts = () => {
  const {
    filteredProducts,
    currentPage,
    handleCategoryChange,
    handlePageChange,
    categories: categoryList,
  } = useCategoryPage('shirts', categories);

  return (
    <ProductPage
      categories={categoryList}
      productData={filteredProducts}
      handleCategoryChange={handleCategoryChange}
      handlePageChange={handlePageChange}
      currentPage={currentPage}
    />
  );
};

export default Shirts;