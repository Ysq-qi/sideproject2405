import React from 'react';
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
  return (
    <> {/* React.Fragment可省略 */}
      <HeaderContainer>
        <Topbar>
          <TopbarItem className='left'>您好 這裡是一個測試網站</TopbarItem>
          <TopbarItem className='right'>會員登入</TopbarItem>
          <TopbarItem className='right'>訂單查詢</TopbarItem>
        </Topbar>
        <LogoImage />
        <ButtonGroup>
          <ActionButton className='bi bi-search'></ActionButton>
          <ActionButton className='bi bi-person'></ActionButton>
          <ActionButton className='bi bi-cart'></ActionButton>
          <ActionButton className='bi bi-filter-right'></ActionButton>
        </ButtonGroup>
        <Nav>
          <NavItem>種類1</NavItem>
          <NavItem>種類2</NavItem>
          <NavItem>種類3</NavItem>
          <NavItem>種類4</NavItem>
          <NavItem>種類5</NavItem>
        </Nav>
      </HeaderContainer>
    </>
  );
}

export default Header;
