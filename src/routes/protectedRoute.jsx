import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.login);
  const hasAlerted = useRef(false);

  // 當 isAuthenticated 變化時重置 hasAlerted
  useEffect(() => {
    if (isAuthenticated) {
      hasAlerted.current = false;
    }
  }, [isAuthenticated]);

  if (!isAuthenticated && !hasAlerted.current) {
    hasAlerted.current = true;
    window.alert(
      `親愛的使用者您好\n這個功能需要登入才可使用!!\n\n提供測試帳號或自行建立帳號(帳號可刪除)\n測試帳號:\n帳號 (Email): chaochi905@gmail.com\n密碼 (Password): ABCD1234\n\n可以用於進行實際功能操作\n感謝您的拜訪`
    );
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;