import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductsByCategory, setPage } from '../../product/product-page/productSlice';
import { handleError } from '../../../../utils/error/errorHandler';

const useCategoryPage = (mainCategory, categories = {}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 使用 URL 參數獲取 subCategory（子分類）和 page（當前頁碼）
  const { subCategory, page } = useParams();

  // 從 Redux 中獲取分類過濾的商品列表、當前頁碼和可能的錯誤
  const { filteredProducts, currentPage, error } = useSelector((state) => state.product || {});

  // 提取 categories 的 keys 作為分類選項
  const categoryKeys = categories ? Object.keys(categories) : [];

  // 初始化當前分類為 URL 中的 subCategory，若無則預設為 “全部商品”
  const [currentCategory, setCurrentCategory] = useState(subCategory || '全部商品');
  
  // 組件加載或分類切換時觸發
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 每次分類切換時，先清空數據，避免殘留
        dispatch(resetCategoryProducts());

        // 根據是否有子分類來決定加載的商品範圍
        if (!subCategory || subCategory === '全部商品') {
          await dispatch(fetchProductsByCategory({ mainCategory })).unwrap();
        } else {
          await dispatch(fetchProductsByCategory({ mainCategory, subCategory })).unwrap();
        }
        
        // 設定當前頁碼
        dispatch(setPage(Number(page) || 1));
      } catch (err) {
        handleError('api', err);
      }
    };

    fetchData();

    // 清理階段：當組件卸載時重置排序和分類
    return () => {
      dispatch(resetCategoryProducts());
      dispatch(resetSortOrder());
    };
  }, [dispatch, mainCategory, subCategory, page]);

  // 切換分類的處理函數
  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    dispatch(resetSortOrder()); // 當分類更改時重置排序狀態
    try {
      // 如果選擇了“全部商品”，導航到主分類路徑
      if (category === '全部商品') {
        navigate(`/${mainCategory}`);
      } else {
        // 否則導航到具體的子分類路徑
        const newSubCategory = categories[category];
        navigate(`/${mainCategory}/${newSubCategory}`);
      }
    } catch (err) {
      handleError('navigation', err);
    }
  };

  // 頁碼變更的處理函數
  const handlePageChange = (newPage) => {
    try {
      // 計算子路徑，如果當前分類是“全部商品”，則不加子路徑
      const subPath = currentCategory === '全部商品' ? '' : categories[currentCategory];
      const path = subPath ? `/${mainCategory}/${subPath}` : `/${mainCategory}`;
      navigate(`${path}/page/${newPage}`);
    } catch (err) {
      handleError('navigation', err);
    }
  };

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