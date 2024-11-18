import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductsForDisplay } from '../productDisplaySlice';
import { handleError } from '../../../../utils/error/errorHandler';

const useProductDisplay = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.productDisplay);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    if (id) {
      dispatch(fetchProductsForDisplay(id)).catch((err) => {
        handleError('api', err);
      });
    }
  }, [id, dispatch]);

  const handlePageChange = (page) => {
    if (page < 1 || page > Math.ceil(products.length / itemsPerPage)) {
      handleError('navigation', new Error('Invalid page number'));
      return;
    }
    setCurrentPage(page);
  };

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return {
    products: currentProducts,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    navigate,
  };
};

export default useProductDisplay;