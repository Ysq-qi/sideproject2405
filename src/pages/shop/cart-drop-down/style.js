import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  width: 300px;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  z-index: 100;
`;

export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;
