import React, { useEffect, useState } from 'react';
import ProductPage from '../product/product-page';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, setPage } from '../product/product-page/productSlice';
import { useParams, useNavigate } from 'react-router-dom';

const Pants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subCategory, page } = useParams();
  const [currentCategory, setCurrentCategory] = useState(subCategory || '全部商品');
  const { filteredProducts, currentPage } = useSelector((state) => state.product);

  const categories = ['全部商品', '長褲', '短褲'];

  useEffect(() => {
    const mainCategory = 'pants';
    if (!subCategory || subCategory === '全部商品') {
      dispatch(fetchProductsByCategory({ mainCategory }));
    } else {
      dispatch(fetchProductsByCategory({ mainCategory, subCategory }));
    }
    dispatch(setPage(Number(page) || 1));
  }, [dispatch, subCategory, page]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    if (category === '全部商品') {
      navigate('/pants');
    } else {
      const newSubCategory = category === '長褲' ? 'long-pants' : 'short-pants';
      navigate(`/pants/${newSubCategory}`);
    }
  };

  const handlePageChange = (newPage) => {
    if (currentCategory === '全部商品') {
      navigate(`/pants/page/${newPage}`);
    } else {
      const subPath = currentCategory === '長褲' ? 'long-pants' : 'short-pants';
      navigate(`/pants/${subPath}/page/${newPage}`);
    }
  };

  return (
    <ProductPage
      categories={categories}
      productData={filteredProducts}
      handleCategoryChange={handleCategoryChange}
      handlePageChange={handlePageChange}
      currentPage={currentPage}
    />
  );
};

export default Pants;