import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductsByCategory, setPage } from '../../product/product-page/productSlice';
import { handleError } from '../../../../utils/error/errorHandler';

const useCategoryPage = (mainCategory, categories = {}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subCategory, page } = useParams();

  const [currentCategory, setCurrentCategory] = useState(subCategory || '全部商品');
  const { filteredProducts, currentPage, error } = useSelector((state) => state.product || {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!subCategory || subCategory === '全部商品') {
          await dispatch(fetchProductsByCategory({ mainCategory })).unwrap();
        } else {
          await dispatch(fetchProductsByCategory({ mainCategory, subCategory })).unwrap();
        }
        dispatch(setPage(Number(page) || 1));
      } catch (err) {
        handleError('api', err); // 使用 utils 的錯誤處理器
      }
    };

    fetchData();
  }, [dispatch, subCategory, page, mainCategory]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    dispatch(resetSortOrder()); // 當分類更改時重置排序狀態
    try {
      if (category === '全部商品') {
        navigate(`/${mainCategory}`);
      } else {
        const newSubCategory = categories[category];
        navigate(`/${mainCategory}/${newSubCategory}`);
      }
    } catch (err) {
      handleError('navigation', err); // 處理導航錯誤
    }
  };
  

  const handlePageChange = (newPage) => {
    try {
      const subPath = currentCategory === '全部商品' ? '' : categories[currentCategory];
      const path = subPath ? `/${mainCategory}/${subPath}` : `/${mainCategory}`;
      navigate(`${path}/page/${newPage}`);
    } catch (err) {
      handleError('navigation', err); // 處理導航錯誤
    }
  };

  // 確保 categories 不為 undefined，並且是對象
  const categoryKeys = categories ? Object.keys(categories) : [];

  return {
    currentCategory,
    filteredProducts: filteredProducts || [],
    currentPage: currentPage || 1,
    error: localError || error,
    handleCategoryChange,
    handlePageChange,
    categories: ['全部商品', ...categoryKeys],
  };
};

export default useCategoryPage;