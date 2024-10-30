import React from 'react';
import useHeaderNavigation from './hooks/useheader';
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
  const {
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
  } = useHeaderNavigation();

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
          </>
        ) : (
          <>
            <TopbarItem className="right" onClick={() => handleNavItemClick('/register')}>
              會員註冊
            </TopbarItem>
            <TopbarItem className="right" onClick={() => handleNavItemClick('/login')}>
              會員登入
            </TopbarItem>
          </>
        )}
        <TopbarItem className="right" onClick={() => handleNavItemClick('/order')}>
          訂單查詢
        </TopbarItem>
      </Topbar>
      <LogoImage onClick={() => handleNavItemClick('/')} />
      <ButtonGroup>
        <SearchWrapper
          ref={searchWrapperRef}
          $isOpen={isSearchOpen}
          onMouseEnter={handleWrapperMouseEnter}
          onMouseLeave={handleWrapperMouseLeave}
        >
          <SearchInput
            id="search-input"
            name="search"
            type="text"
            placeholder="搜尋商品..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
            $isOpen={isSearchOpen}
            autoComplete="off"
            maxLength={15}
          />
          <ActionButton className="bi bi-search" onClick={handleSearchClick} />
        </SearchWrapper>
        <ActionButton className="bi bi-person" onClick={() => handleNavItemClick('/profile')} />
        <ActionButton className="bi bi-cart" onClick={() => handleNavItemClick('/cart')} />
        <ActionButton className="bi bi-filter-right" onClick={() => handleNavItemClick('/filter')} />
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