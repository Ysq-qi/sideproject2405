import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../pages/user/login/loginSlice';
import { auth } from '../../config/firebaseConfig';
import useHeaderNavigation from './hooks';
import {
  HeaderContainer,
  Topbar,
  TopbarItem,
  LogoImage,
  ButtonGroup,
  ActionButton,
  Nav,
  NavItem,
  SearchWrapper,
  SearchInput,
} from './style';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { handleNavItemClick, navItems } = useHeaderNavigation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchWrapperRef = useRef(null);
  const { user, isAuthenticated } = useSelector((state) => state.login);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      console.error('登出失敗:', error);
    }
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleWrapperMouseEnter = () => {
    setIsSearchOpen(true);
  };

  const handleWrapperMouseLeave = () => {
    if (searchTerm.trim() === '') {
      setIsSearchOpen(false);
    }
  };

  return (
    <HeaderContainer>
      <Topbar>
        <TopbarItem className="left">您好 這裡是一個測試網站</TopbarItem>
        {isAuthenticated ? (
          <>
            <TopbarItem className="right">{user.email}</TopbarItem>
            <TopbarItem className="right" onClick={handleLogout}>
              會員登出
            </TopbarItem>
            <TopbarItem className="right" onClick={() => navigate('/order')}>
              訂單查詢
            </TopbarItem>
          </>
        ) : (
          <>
            <TopbarItem className="right" onClick={() => navigate('/register')}>
              會員註冊
            </TopbarItem>
            <TopbarItem className="right" onClick={() => navigate('/login')}>
              會員登入
            </TopbarItem>
            <TopbarItem className="right" onClick={() => navigate('/order')}>
              訂單查詢
            </TopbarItem>
          </>
        )}
      </Topbar>
      <LogoImage onClick={() => navigate('/')} />
      <ButtonGroup>
        <SearchWrapper
          ref={searchWrapperRef}
          isOpen={isSearchOpen}
          onMouseEnter={handleWrapperMouseEnter}
          onMouseLeave={handleWrapperMouseLeave}
        >
          <SearchInput
            type="text"
            placeholder="搜尋商品..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
            isOpen={isSearchOpen}
          />
          <ActionButton className="bi bi-search" onClick={handleSearchClick} />
        </SearchWrapper>
        <ActionButton className="bi bi-person" onClick={() => navigate('/profile')} />
        <ActionButton className="bi bi-cart" onClick={() => navigate('/cart')} />
        <ActionButton className="bi bi-filter-right" onClick={() => navigate('/filter')} />
      </ButtonGroup>
      <Nav>
        {navItems.length > 0 ? (
          navItems.map((item) => (
            <NavItem key={item.link} onClick={() => handleNavItemClick(item.link)}>
              {item.label}
            </NavItem>
          ))
        ) : (
          <div>當數組為空這裡是錯誤!!!</div>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;