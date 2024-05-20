import styled from 'styled-components';

export const CarouselContainer = styled.div`
  width: 1200px;
  height: 520px;
  margin: 0 auto;
  cursor: pointer;

  .carousel-indicators button {
    background-color: #000;
  }
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }
`;
