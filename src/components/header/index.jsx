import React from 'react';
import useHeaderNavigation from './hooks';
import { useNavigate } from 'react-router-dom';
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
  const { handleNavItemClick , navItems} = useHeaderNavigation();
  const navigate = useNavigate();

  return (
    <> {/* React.Fragment可省略 */}
      <HeaderContainer>
        <Topbar>
          <TopbarItem className='left'>您好 這裡是一個測試網站</TopbarItem>
          <TopbarItem className='right' onClick={() => navigate('/login')}>會員登入</TopbarItem>
          <TopbarItem className='right' onClick={() => navigate('/orders')}>訂單查詢</TopbarItem>
        </Topbar>
        <LogoImage onClick={ () => navigate('/') }/>
        <ButtonGroup>
          <ActionButton className='bi bi-search' onClick={() => navigate('/search')} />
          <ActionButton className='bi bi-person' onClick={() => navigate('/profile')} />
          <ActionButton className='bi bi-cart' onClick={() => navigate('/cart')} />
          <ActionButton className='bi bi-filter-right' onClick={() => navigate('/filter')} />
        </ButtonGroup>
        <Nav> {/* 三元運算符 先判斷數組是否大於0 若符合執行前者 若不符合執行後者 */}
          {navItems.length > 0 ? (navItems.map((item) => (<NavItem key={item.link} onClick={() => handleNavItemClick(item.link)}> {item.label} </NavItem>))) : (<div> 當數組為空這裡是錯誤!!! </div>)}
        </Nav>
      </HeaderContainer>
    </>
  );
}

export default Header;