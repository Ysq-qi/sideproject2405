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
  const searchWrapperRef = useRef(null);

  const { user, isAuthenticated } = useSelector((state) => state.login);

  const handleLogout = async () => {
    try {
      await auth.signOut();  // Firebase登出
      dispatch(clearUser()); // 清除 Redux 中的用戶狀態
      navigate('/');
    } catch (error) {
      handleError('auth', error); // 使用錯誤處理器處理錯誤
    }
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleWrapperMouseEnter = () => setIsSearchOpen(true);
  const handleWrapperMouseLeave = () => {
    if (searchTerm.trim() === '') setIsSearchOpen(false);
  };

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