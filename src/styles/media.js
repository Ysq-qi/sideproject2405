import { css } from 'styled-components';

const sizes = {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  };
  
  // media助手函數 桌面優先max-width
  const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label]}) {
        ${css(...args)}
      }
    `;
    return acc;
  }, {});