import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from './productSlice';
import { ProductPageContainer } from './style';
import CategoryList from './components/category-list';
import FilterSort from './components/filter-sort';
import ProductList from './components/product-list';

const ProductPage = ({ productData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (productData) {
      dispatch(setProducts(productData));
    }
  }, [productData, dispatch]);

  return (
    <ProductPageContainer>
      <CategoryList />
      <FilterSort />
      <ProductList />
    </ProductPageContainer>
  );
};

export default ProductPage;