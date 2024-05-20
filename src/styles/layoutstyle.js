import styled from 'styled-components';

//讓網頁能夠滿版 
export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

//讓page頁面能夠自動擴充 使footer組件能夠隨時都最底部
export const Content = styled.div`
  flex: 1;
`;