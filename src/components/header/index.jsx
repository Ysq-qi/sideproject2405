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
          <TopbarItem className='right'>會員登入</TopbarItem>
          <TopbarItem className='right'>訂單查詢</TopbarItem>
        </Topbar>
        <LogoImage onClick={ () => navigate('/') }/>
        <ButtonGroup>
          <ActionButton className='bi bi-search'></ActionButton>
          <ActionButton className='bi bi-person'></ActionButton>
          <ActionButton className='bi bi-cart'></ActionButton>
          <ActionButton className='bi bi-filter-right'
            //onMouseEnter={handleMouseEnter} 
            //onMouseLeave={handleMouseLeave} 
            //onClick={handleClick}
            >
          </ActionButton>
        </ButtonGroup>
        <Nav>
        {navItems.length > 0 ? (
          navItems.map((item) => (
            <NavItem key={item.link} onClick={() => handleNavItemClick(item.link)}> {item.label} </NavItem>))) : (<div> 當數組為空這裡是錯誤!!! </div>)}
        </Nav>
      </HeaderContainer>
    </>
  );
}

export default Header;
