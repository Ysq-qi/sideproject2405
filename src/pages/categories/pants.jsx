import React from 'react';
import ProductPage from '../product/product-page';
import useCategoryPage from './hooks/useCategoryPage';

const categories = {
  '長褲': 'long-pants',
  '短褲': 'short-pants',
};

const Pants = () => {
  const {
    filteredProducts,
    currentPage,
    handleCategoryChange,
    handlePageChange,
    categories: categoryList,
  } = useCategoryPage('pants', categories);

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

export default Pants;