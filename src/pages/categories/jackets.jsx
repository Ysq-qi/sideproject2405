import React, { useEffect, useState } from 'react';
import ProductPage from '../product/product-page';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, setPage } from '../product/product-page/productSlice';
import { useParams, useNavigate } from 'react-router-dom';

const Jackets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subCategory, page } = useParams();
  const [currentCategory, setCurrentCategory] = useState(subCategory || '全部商品');
  const { filteredProducts, currentPage } = useSelector((state) => state.product);

  const categories = ['全部商品', '四季外套', '工裝外套'];

  useEffect(() => {
    const mainCategory = 'jackets';
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
      navigate('/jackets');
    } else {
      const newSubCategory = category === '四季外套' ? 'four-season' : 'work-jackets';
      navigate(`/jackets/${newSubCategory}`);
    }
  };

  const handlePageChange = (newPage) => {
    if (currentCategory === '全部商品') {
      navigate(`/jackets/page/${newPage}`);
    } else {
      const subPath = currentCategory === '四季外套' ? 'four-season' : 'work-jackets';
      navigate(`/jackets/${subPath}/page/${newPage}`);
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

export default Jackets;