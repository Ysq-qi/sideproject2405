import React from 'react';
import ProductPage from '../product/product-page';
import useCategoryPage from './hooks/useCategoryPage';

const categories = {
  '長袖上衣': 'long-sleeve',
  '短袖上衣': 'short-sleeve',
};

const Tops = () => {
  const {
    filteredProducts,
    currentPage,
    handleCategoryChange,
    handlePageChange,
    categories: categoryList,
  } = useCategoryPage('tops', categories);

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

export default Tops;