import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../productSearchSlice';
import { handleError } from '../../../../utils/error/errorHandler';

const useProductSearch = () => {
  const location = useLocation();
  const navigate = useNavigate(); // 在 Hook 中初始化 navigate
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);

  const searchQuery = queryParams.get('query') || ''; // 預設為空字符串
  const pageParam = queryParams.get('page') || 1; // 預設頁數為 1
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam, 10));

  const { products, loading, error } = useSelector((state) => state.productSearch);
  const itemsPerPage = 15;

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSearchResults(searchQuery)).catch((err) => {
        handleError('api', err); // API 錯誤處理
      });
    }
  }, [searchQuery, dispatch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    navigate(`/search?query=${encodeURIComponent(searchQuery)}&page=${newPage}`);
  };

  return {
    products,
    loading,
    error,
    currentPage,
    itemsPerPage,
    handlePageChange,
    navigate,
  };
};

export default useProductSearch;