import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductsByCategory, setPage } from '../../product/product-page/productSlice';
import { handleError } from '../../../utils/error/errorHandler';

const useCategoryPage = (mainCategory, categories = {}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subCategory, page } = useParams();

  const [currentCategory, setCurrentCategory] = useState(subCategory || '全部商品');
  const { filteredProducts, currentPage } = useSelector((state) => state.product || {});

  // 初始化：根據分類請求資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryParams = { mainCategory };
        if (subCategory && subCategory !== '全部商品') {
          categoryParams.subCategory = subCategory;
        }
        await dispatch(fetchProductsByCategory(categoryParams));
        dispatch(setPage(Number(page) || 1));
      } catch (error) {
        handleError('api', error); // 錯誤處理
      }
    };

    fetchData();
  }, [dispatch, subCategory, page, mainCategory]);

  // 類別變更的處理
  const handleCategoryChange = (category) => {
    try {
      setCurrentCategory(category);
      const newSubCategory = categories[category];

      if (category === '全部商品') {
        navigate(`/${mainCategory}`);
      } else if (newSubCategory) {
        navigate(`/${mainCategory}/${newSubCategory}`);
      } else {
        throw new Error('無效的分類'); // 當分類無效時丟出錯誤
      }
    } catch (error) {
      handleError('navigation', error); // 導航錯誤處理
    }
  };

  // 分頁變更的處理
  const handlePageChange = (newPage) => {
    try {
      const subPath = currentCategory === '全部商品' ? '' : categories[currentCategory];
      const path = subPath ? `/${mainCategory}/${subPath}` : `/${mainCategory}`;
      navigate(`${path}/page/${newPage}`);
    } catch (error) {
      handleError('navigation', error); // 導航錯誤處理
    }
  };

  // 確保 categories 不為 undefined，並且是對象
  const categoryKeys = categories ? Object.keys(categories) : [];

  return {
    currentCategory,
    filteredProducts: filteredProducts || [],
    currentPage: currentPage || 1,
    handleCategoryChange,
    handlePageChange,
    categories: ['全部商品', ...categoryKeys],
  };
};

export default useCategoryPage;