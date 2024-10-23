import React from 'react';
import ProductPage from '../product/product-page';
import useCategoryPage from './hooks/useCategoryPage';

const categories = {
  '四季外套': 'four-season',
  '工裝外套': 'work-jackets',
};

const Jackets = () => {
  const {
    filteredProducts,
    currentPage,
    handleCategoryChange,
    handlePageChange,
    categories: categoryList,
  } = useCategoryPage('jackets', categories);

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

export default Jackets;