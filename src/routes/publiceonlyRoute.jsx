import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.login);
  const hasAlerted = useRef(false);

  // 當 isAuthenticated 變化時重置 hasAlerted
  useEffect(() => {
    if (!isAuthenticated) {
      hasAlerted.current = false;
    }
  }, [isAuthenticated]);

  if (isAuthenticated && !hasAlerted.current) {
    hasAlerted.current = true; // 設定已顯示
    window.alert('請先登出');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicOnlyRoute;