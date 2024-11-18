import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../../pages/user/login/loginSlice';
import { auth } from '../../../config/firebaseConfig';
import { handleError } from '../../../utils/error/errorHandler';

const useHeaderNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, isAuthenticated } = useSelector((state) => state.login);
  const searchWrapperRef = useRef(null); // 防止重新渲染

  // 執行登出
  const handleLogout = async () => {
    try {
      await auth.signOut();  // Firebase登出
      dispatch(clearUser()); // 清除 Redux 中的用戶狀態
      navigate('/');
    } catch (error) {
      handleError('auth', error); // 使用錯誤處理器處理錯誤
    }
  };

  // 執行搜尋點擊
  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  // 即時取得搜尋框框的輸入文字變化
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // 當滑鼠進來時 搜尋框打開
  const handleWrapperMouseEnter = () => setIsSearchOpen(true);

  // 當滑鼠離開時 搜尋框關閉
  const handleWrapperMouseLeave = () => {
    if (searchTerm.trim() === '') setIsSearchOpen(false);
  };

  // 導航按鈕
  const navItems = [
    { link: '/jackets', label: '夾克' },
    { link: '/shirts', label: '襯衫' },
    { link: '/pants', label: '褲款' },
    { link: '/tops', label: '衣款' },
    { link: '/accessories', label: '配件' },
  ].filter((item) => item.link && item.label) || [];

  const handleNavItemClick = (link) => {
    if (typeof link === 'string' && link.trim() !== '') {
      navigate(link);
    } else {
      handleError('navigation', new Error('Invalid link'));
    }
  };

  return {
    user,
    isAuthenticated,
    isSearchOpen,
    searchTerm,
    searchWrapperRef,
    navItems,
    handleLogout,
    handleSearchClick,
    handleSearchChange,
    handleWrapperMouseEnter,
    handleWrapperMouseLeave,
    handleNavItemClick,
  };
};

export default useHeaderNavigation;