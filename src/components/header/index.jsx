import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../pages/user/login/loginSlice';
import { auth } from '../../config/firebaseConfig'; // 從 firebaseConfig 導入 auth
import useHeaderNavigation from './hooks';
import {
  HeaderContainer,
  Topbar,
  TopbarItem,
  LogoImage,
  ButtonGroup,
  ActionButton,
  Nav,
  NavItem
} from './style';

const Header = () => {
  const { handleNavItemClick, navItems } = useHeaderNavigation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.login);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // 確保 Firebase 執行登出操作
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      console.error("登出失敗：", error);
    }
  };

  //處理組件需要先登入後再進行跳轉的功能
  const handleNavigation = (destination) => {
    if (isAuthenticated) {
      navigate(destination);
    } else {
      const shouldNavigate = window.confirm('請先登入');
      if (shouldNavigate) {
        navigate('/login', { state: { from: destination } });
      }
    }
  };
  
  
  return (
    <>
      <HeaderContainer>
        <Topbar>
          <TopbarItem className='left'>您好 這裡是一個測試網站</TopbarItem>
          {isAuthenticated ? (
            <>
              <TopbarItem className='right'>{user.email}</TopbarItem>
              <TopbarItem className='right' onClick={handleLogout}>會員登出</TopbarItem>
              <TopbarItem className='right' onClick={() => navigate('/order')}>訂單查詢</TopbarItem>
            </>
          ) : (
            <>
              <TopbarItem className='right' onClick={() => navigate('/register')}>會員註冊</TopbarItem>
              <TopbarItem className='right' onClick={() => navigate('/login')}>會員登入</TopbarItem>
              <TopbarItem className='right' onClick={() => handleNavigation('/order')}>訂單查詢</TopbarItem>
            </>
          )}
        </Topbar>
        <LogoImage onClick={() => navigate('/')} />
        <ButtonGroup>
          <ActionButton className='bi bi-search' onClick={() => navigate('/search')} />
          <ActionButton className='bi bi-person' onClick={() => handleNavigation('/profile')} />
          <ActionButton className='bi bi-cart' onClick={() => handleNavigation('/cart')} />
          <ActionButton className='bi bi-filter-right' onClick={() => navigate('/filter')} />
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
    </>
  );
};

export default Header;