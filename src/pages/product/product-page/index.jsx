import React from "react";
import { ProductPageContainer } from './style';
import CategoryList from './components/category-list';
import FilterSort from './components/filter-sort';
import ProductList from './components/product-list';

const ProductPage = () => {
  return (
    <ProductPageContainer>
      <CategoryList />
      <FilterSort />
      <ProductList />
    </ProductPageContainer>
  );
};

export default ProductPage;