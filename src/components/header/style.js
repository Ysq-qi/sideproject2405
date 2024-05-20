import styled from 'styled-components';
import headerlogo from '../../assets/images/header/headerlogo.png';

export const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  padding: 0px;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: #666666;
`;

export const TopbarItem = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 16px;
  color: #ffffff;

  &.left {
    padding: 0 15px;
    margin-right: auto;
  }

  &.right {
    padding: 0 50px;
    margin-left: 0;
    cursor: pointer;
  }
`;

export const LogoImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  width: 110px;
  height: 110px;
  background-image: url(${headerlogo});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  position: absolute;
  top: 50%;
  right: 2%;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-end;
  width: 600px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ActionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 50px;
  font-size: 35px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Nav = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  margin: 0 auto;
`;

export const NavItem = styled.div`
  padding: 15px 100px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;