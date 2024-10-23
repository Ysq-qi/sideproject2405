import React from 'react';
import ProductPage from '../product/product-page';
import useCategoryPage from './hooks/useCategoryPage';

const categories = {
  '帽子': 'hats',
  '眼鏡': 'glasses',
};

const Accessories = () => {
  const {
    filteredProducts,
    currentPage,
    handleCategoryChange,
    handlePageChange,
    categories: categoryList,
  } = useCategoryPage('accessories', categories);

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

export default Accessories;